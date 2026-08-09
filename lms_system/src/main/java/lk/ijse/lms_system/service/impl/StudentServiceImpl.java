package lk.ijse.lms_system.service.impl;

import lk.ijse.lms_system.dto.LoginStudentDTO;
import lk.ijse.lms_system.dto.StudentDTO;
import lk.ijse.lms_system.dto.StudentLoginDTO;
import lk.ijse.lms_system.dto.response.StudentDetailDTO;
import lk.ijse.lms_system.entity.Student;
import lk.ijse.lms_system.exception.LmsSystemException;
import lk.ijse.lms_system.repository.StudentRepository;
import lk.ijse.lms_system.service.StudentService;
import lk.ijse.lms_system.status.StudentStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void registerStudent(StudentDTO studentDTO) {
        try{
            Student student = new Student();
            student.setStudentName(studentDTO.getStudentName());
            student.setStudentUsername(studentDTO.getStudentUsername());
            student.setStudentPassword(passwordEncoder.encode(student.getStudentPassword()));
            student.setEmail(studentDTO.getEmail());
            student.setContact(studentDTO.getContact());
            student.setAddress(studentDTO.getAddress());
            student.setStudentStatus(StudentStatus.ACTIVE);
            studentRepository.save(student);
        }catch(Exception e){
            throw e;
        }
    }

    @Override
    public void updateStudent(StudentDTO studentDTO) {
        try{
            Optional<Student> byId = studentRepository.findById(studentDTO.getStudentId());
            if(byId.isPresent()){
                Student student = byId.get();
                student.setStudentName(studentDTO.getStudentName());
                student.setStudentUsername(studentDTO.getStudentUsername());
                student.setStudentPassword(passwordEncoder.encode(student.getStudentPassword()));
                student.setEmail(studentDTO.getEmail());
                student.setContact(studentDTO.getContact());
                student.setAddress(studentDTO.getAddress());
                student.setStudentStatus(StudentStatus.ACTIVE);
                studentRepository.save(student);

            }else {
                throw new LmsSystemException(404,"Student not found");
            }

        }catch(Exception e){
            throw e;
        }

    }

    @Override
    public void deleteStudent(Long studentId) {
        try{
            Optional<Student> studentById = studentRepository.findById(studentId);
            if(studentById.isPresent() && studentById.get().getStudentStatus().equals(StudentStatus.ACTIVE)){
                lk.ijse.lms_system.entity.Student student =studentById.get();
                student.setStudentStatus(StudentStatus.INACTIVE);
                studentRepository.save(student);
            }else {
                throw new LmsSystemException(404,"Student not found");
            }

        }catch (Exception e){
            throw e;
        }

    }

    @Override
    public List<StudentDetailDTO> getAllStudents() {
        try{
            List<Student> studentList = studentRepository.findAll();
            List<StudentDetailDTO> studentDetailDTOList = new ArrayList<>();
            for(Student student : studentList){
                studentDetailDTOList.add(new StudentDetailDTO(student.getStudentId(),student.getStudentName(),student.getStudentUsername(),student.getEmail(),student.getContact(),student.getAddress()));
            }
            return studentDetailDTOList;
        }catch (Exception e){
            throw e;
        }
    }

    @Override
    public LoginStudentDTO getLoginStudent(StudentLoginDTO studentLoginDTO) {
       try{
           Optional<Student> byStudentUsername = studentRepository.findByStudentUsername(studentLoginDTO.getStudentUsername());
           if(byStudentUsername.isPresent()){
                Student student = byStudentUsername.get();
                if(!passwordEncoder.matches(student.getStudentPassword(),student.getStudentPassword())){
                    throw new LmsSystemException(404,"password doesnt match");
                }
                return new LoginStudentDTO(student.getStudentId(),student.getStudentUsername(),"STUDENT");
           }else {
               throw new LmsSystemException(404,"studentUsername not found");
           }
       }catch(Exception e){
           throw e;
       }
    }
}

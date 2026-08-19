package lk.ijse.lms_system.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.lms_system.dto.*;
import lk.ijse.lms_system.dto.response.StudentByIdDTO;
import lk.ijse.lms_system.dto.response.StudentDetailDTO;
import lk.ijse.lms_system.dto.response.StudentEnrollmentDetails;
import lk.ijse.lms_system.entity.ClassBatch;
import lk.ijse.lms_system.entity.Student;
import lk.ijse.lms_system.entity.StudentEnrollment;
import lk.ijse.lms_system.entity.Subject;
import lk.ijse.lms_system.exception.LmsSystemException;
import lk.ijse.lms_system.repository.BatchRepository;
import lk.ijse.lms_system.repository.StudentEnrollmentRepository;
import lk.ijse.lms_system.repository.StudentRepository;
import lk.ijse.lms_system.repository.SubjectRepository;
import lk.ijse.lms_system.service.StudentService;
import lk.ijse.lms_system.status.ClassBatchStatus;
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
    private final SubjectRepository subjectRepository;
    private final BatchRepository batchRepository;
    private final StudentEnrollmentRepository studentEnrollmentRepository;

    @Transactional
    @Override
    public void registerStudent(StudentDTO studentDTO) {
        try{
            Student student = new Student();
            student.setStudentName(studentDTO.getStudentName());
            student.setStudentUsername(studentDTO.getStudentUsername());
            student.setStudentPassword(passwordEncoder.encode(studentDTO.getStudentPassword()));
            student.setEmail(studentDTO.getEmail());
            student.setContact(studentDTO.getContact());
            student.setAddress(studentDTO.getAddress());
            student.setStudentStatus(StudentStatus.ACTIVE);
            Optional<ClassBatch> classBatch = batchRepository.findById(studentDTO.getClassBatchId());
            if(classBatch.isPresent() && classBatch.get().getBatchStatus().equals(ClassBatchStatus.ACTIVE)){
                student.setClassBatch(classBatch.get());
            }else {
                throw new LmsSystemException(404,"batch not found");
            }

            Student savedStudent = studentRepository.save(student);
            for (Integer subjectId:studentDTO.getSubjectId()){
                StudentEnrollment studentEnrollment=new StudentEnrollment();
                studentEnrollment.setStudent(savedStudent);
                Optional<Subject> subjectById = subjectRepository.findById(subjectId);
                if(subjectById.isPresent()){
                    studentEnrollment.setSubject(subjectById.get());
                    studentEnrollmentRepository.save(studentEnrollment);
                }else {
                    throw new LmsSystemException(404,"subject not found");
                }

            }
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
                if(studentDTO.getStudentPassword() != null){
                    student.setStudentPassword(passwordEncoder.encode(studentDTO.getStudentPassword()));
                }
                student.setEmail(studentDTO.getEmail());
                student.setContact(studentDTO.getContact());
                student.setAddress(studentDTO.getAddress());
                student.setStudentStatus(StudentStatus.ACTIVE);
                Optional<ClassBatch> classBatch = batchRepository.findById(studentDTO.getClassBatchId());
                if(classBatch.isPresent()){
                    student.setClassBatch(classBatch.get());
                }else {
                    throw new LmsSystemException(404,"batch not found");
                }
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
                if(student.getStudentStatus().equals(StudentStatus.ACTIVE)){
                    List<String>subjectStudent=new ArrayList<>();
                    for(StudentEnrollment studentEnrollment:student.getStudentEnrollments()){
                        subjectStudent.add(studentEnrollment.getSubject().getSubjectName());
                    }
                    studentDetailDTOList.add(new StudentDetailDTO(student.getStudentId(),student.getStudentName(),student.getStudentUsername(),student.getEmail(),student.getContact(),student.getAddress(),subjectStudent,student.getClassBatch().getBatchName()));

                }
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
                if(!passwordEncoder.matches(studentLoginDTO.getStudentPassword(),student.getStudentPassword())){
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

    @Override
    public List<SubjectDTO> getLoggedStudentSubjects(Long studentId) {
        try{
            Optional<Student> studentById = studentRepository.findById(studentId);
            List<SubjectDTO> studentLoggedSubjectList = new ArrayList<>();
            if(studentById.isPresent() && studentById.get().getStudentStatus().equals(StudentStatus.ACTIVE)){
                lk.ijse.lms_system.entity.Student student =studentById.get();
                for(StudentEnrollment studentEnrollment:student.getStudentEnrollments()){
                    studentLoggedSubjectList.add(new SubjectDTO(studentEnrollment.getSubject().getSubjectId(),studentEnrollment.getSubject().getSubjectName()));
                }
                return studentLoggedSubjectList;

            }else {
                throw new LmsSystemException(404,"student not found");
            }
        }catch (Exception e){
            throw  e;
        }
    }

    @Override
    public StudentByIdDTO getStudentById(Long studentId) {
        try{
            Optional<Student> studentById = studentRepository.findById(studentId);
            if(studentById.isPresent() && studentById.get().getStudentStatus().equals(StudentStatus.ACTIVE)){
                Student student=studentById.get();
                List<SubjectDTO>subjectStudent=new ArrayList<>();
                for(StudentEnrollment studentEnrollment:student.getStudentEnrollments()){
                    subjectStudent.add(new SubjectDTO(studentEnrollment.getSubject().getSubjectId(),studentEnrollment.getSubject().getSubjectName()));
                }
               return new StudentByIdDTO(student.getStudentId(),student.getStudentName(),student.getStudentUsername(),student.getEmail(),student.getContact(),student.getAddress(),subjectStudent,new ClassBatchDTO(student.getClassBatch().getClassBatchId(),student.getClassBatch().getBatchName()));


            }else {
                throw new LmsSystemException(404,"student not found");
            }
        }catch(Exception e){
            throw e;
        }
    }

    @Override
    public Integer loadInActiveStudentCount() {
        try{
            java.util.List<Student> studentList =studentRepository.findAll();
            if(studentList.isEmpty()){
                throw new LmsSystemException(404,"saved students are not found");
            }
            int inActiveCount=0;
            for(Student student : studentList){
                if(student.getStudentStatus().equals(StudentStatus.INACTIVE)){
                    inActiveCount++;
                }
            }
            return inActiveCount;
        }catch (Exception e){
            throw e;
        }
    }

    @Override
    public List<StudentDetailDTO> filterStudent(String studentName, String studentAddress, String batchName, String contact) {
        List<Student> filteredStudent = studentRepository.filterStudent(studentName, studentAddress, batchName, contact);
        List<StudentDetailDTO> studentDetailDTOList = new ArrayList<>();
        if(filteredStudent.isEmpty()){
            throw new LmsSystemException(404,"students not found");
        }
        for(Student student : filteredStudent){
            if(student.getStudentStatus().equals(StudentStatus.ACTIVE)){
                List<String>subjectStudent=new ArrayList<>();
                for(StudentEnrollment studentEnrollment:student.getStudentEnrollments()){
                    subjectStudent.add(studentEnrollment.getSubject().getSubjectName());
                }
                studentDetailDTOList.add(new StudentDetailDTO(student.getStudentId(),student.getStudentName(),student.getStudentUsername(),student.getEmail(),student.getContact(),student.getAddress(),subjectStudent,student.getClassBatch().getBatchName()));

            }
        }
        return studentDetailDTOList;
    }

    @Override
    public List<StudentDetailDTO> getSubjectRelatedStudent(Integer subjectId) {
        try{
            List<Student> subjectRelatedStudentList = studentRepository.getSubjectRelatedStudentList(subjectId);
            if(subjectRelatedStudentList.isEmpty()){
                throw new LmsSystemException(404,"subject related student not found");
            }
            List<StudentDetailDTO> studentDetailDTOList = new ArrayList<>();
            for(Student student : subjectRelatedStudentList){
                if(student.getStudentStatus().equals(StudentStatus.ACTIVE)){
                    studentDetailDTOList.add(new StudentDetailDTO(student.getStudentId(),student.getStudentName(),student.getStudentUsername(),student.getEmail(),student.getContact(),student.getAddress(),student.getClassBatch().getBatchName()));

                }
            }
            return studentDetailDTOList;

        }catch (Exception e){
            throw  e;

        }
    }

    @Override
    public List<StudentEnrollmentDetails> getAllStudentEnrollmentDetails(Long studentId, Long batchId) {
        try{
            List<StudentEnrollmentDetails> subjectByStudentId = studentEnrollmentRepository.findSubjectByStudentId(studentId, batchId);
            if(subjectByStudentId.isEmpty()){
                throw new LmsSystemException(404,"no student related subjects found");
            }
            return subjectByStudentId;
        }catch (Exception e){
            throw e;
        }
    }
}

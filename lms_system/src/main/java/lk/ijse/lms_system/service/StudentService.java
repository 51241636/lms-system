package lk.ijse.lms_system.service;

import lk.ijse.lms_system.dto.LoginStudentDTO;
import lk.ijse.lms_system.dto.StudentDTO;
import lk.ijse.lms_system.dto.StudentLoginDTO;
import lk.ijse.lms_system.dto.SubjectDTO;
import lk.ijse.lms_system.dto.response.StudentDetailDTO;

import java.util.List;

public interface StudentService {

    void registerStudent(StudentDTO studentDTO);
    void updateStudent(StudentDTO studentDTO);
    void deleteStudent(Long studentId);
    List<StudentDetailDTO> getAllStudents();
    LoginStudentDTO getLoginStudent(StudentLoginDTO studentLoginDTO);
    List<SubjectDTO> getLoggedStudentSubjects(Long studentId);
//    List<StudentDTO> searchStudentByStudentName(String subjectName);
}

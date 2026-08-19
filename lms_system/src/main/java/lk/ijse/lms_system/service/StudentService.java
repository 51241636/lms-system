package lk.ijse.lms_system.service;

import lk.ijse.lms_system.dto.LoginStudentDTO;
import lk.ijse.lms_system.dto.StudentDTO;
import lk.ijse.lms_system.dto.StudentLoginDTO;
import lk.ijse.lms_system.dto.SubjectDTO;
import lk.ijse.lms_system.dto.response.StudentByIdDTO;
import lk.ijse.lms_system.dto.response.StudentDetailDTO;
import lk.ijse.lms_system.dto.response.StudentEnrollmentDetails;

import java.util.List;

public interface StudentService {

    void registerStudent(StudentDTO studentDTO);
    void updateStudent(StudentDTO studentDTO);
    void deleteStudent(Long studentId);
    List<StudentDetailDTO> getAllStudents();
    LoginStudentDTO getLoginStudent(StudentLoginDTO studentLoginDTO);
    List<SubjectDTO> getLoggedStudentSubjects(Long studentId);
    StudentByIdDTO getStudentById(Long studentId);
    Integer loadInActiveStudentCount();
    List<StudentDetailDTO> filterStudent(String studentName,String studentAddress,String batchName,String contact);
    List<StudentDetailDTO> getSubjectRelatedStudent(Integer subjectId);
    List<StudentEnrollmentDetails> getAllStudentEnrollmentDetails(Long studentId,Long batchId);
//    List<StudentDTO> searchStudentByStudentName(String subjectName);
}

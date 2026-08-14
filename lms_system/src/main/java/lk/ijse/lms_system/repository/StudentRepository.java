package lk.ijse.lms_system.repository;

import lk.ijse.lms_system.entity.Student;
import lk.ijse.lms_system.entity.StudentEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student,Long> {
    Optional<Student> findByStudentUsername(String studentUsername);
    @Query(value = "SELECT st FROM Student st WHERE (:studentName IS NULL OR st.studentName=:studentName)OR (:studentAddress IS NULL OR st.address=:studentAddress)OR (:batchName IS NULL OR st.classBatch.batchName=:batchName) OR  (:studentName IS NULL OR st.contact=:contact)  ")
    List<Student> filterStudent(@Param("studentName") String studentName, @Param("studentAddress")String studentAddress, @Param("batchName")String batchName, @Param("contact")String contact);

    @Query(value = "SELECT se.student FROM StudentEnrollment se WHERE se.subject.subjectId=:subjectId")
    List<Student> getSubjectRelatedStudentList(@Param("subjectId") Integer subjectId);
}

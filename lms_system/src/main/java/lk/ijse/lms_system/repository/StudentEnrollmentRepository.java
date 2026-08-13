package lk.ijse.lms_system.repository;

import lk.ijse.lms_system.entity.Student;
import lk.ijse.lms_system.entity.StudentEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentEnrollmentRepository  extends JpaRepository<StudentEnrollment,Long> {
    @Query(value = "SELECT se FROM StudentEnrollment se WHERE (:studentName IS NULL OR se.student.studentName=:studentName)AND (:studentAddress IS NULL OR se.student.address=:studentAddress)AND (:batchName IS NULL OR se.student.classBatch.batchName=:batchName) AND  (:studentName IS NULL OR se.student.contact=:contact) AND (:subjectName IS NULL OR se.subject.subjectName=:subjectName) ")
    List<StudentEnrollment> filterStudent(@Param("studentName") String studentName, @Param("studentAddress")String studentAddress, @Param("batchName")String batchName, @Param("contact")String contact,@Param("subjectName")String subjectName);

}

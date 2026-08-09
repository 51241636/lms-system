package lk.ijse.lms_system.repository;

import lk.ijse.lms_system.entity.Subject;
import lk.ijse.lms_system.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SubjectRepository extends JpaRepository<Subject,Integer> {
    //   subject filter by subjectName
    @Query(value = "SELECT s FROM Subject s WHERE (:subjectName IS NULL OR s.subjectName = :subjectName)")
    List<Subject> searchSubject( @Param("subjectName") String subject);

}

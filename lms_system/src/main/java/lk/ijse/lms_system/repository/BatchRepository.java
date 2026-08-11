package lk.ijse.lms_system.repository;

import lk.ijse.lms_system.entity.ClassBatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BatchRepository extends JpaRepository<ClassBatch,Long> {

    @Query(value = "SELECT cb FROM ClassBatch cb JOIN SubjectBatch sb ON (cb.classBatchId=sb.classBatch.classBatchId) " +
            "JOIN Subject s ON (s.subjectId=sb.subject.subjectId) " +
            "WHERE s.subjectId=:subjectId")
    List<ClassBatch> teacherRelatedBatches(@Param("subjectId") Integer subjectId);

}

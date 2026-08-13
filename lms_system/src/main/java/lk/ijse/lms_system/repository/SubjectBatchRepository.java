package lk.ijse.lms_system.repository;

import lk.ijse.lms_system.entity.ClassBatch;
import lk.ijse.lms_system.entity.Subject;
import lk.ijse.lms_system.entity.SubjectBatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SubjectBatchRepository extends JpaRepository<SubjectBatch, Long> {

    @Query(value = "SELECT s.subject from SubjectBatch s WHERE s.classBatch.classBatchId=:batchId")
    List<Subject> getBatchRelatedSubject(@Param("batchId") Integer batchId);


}

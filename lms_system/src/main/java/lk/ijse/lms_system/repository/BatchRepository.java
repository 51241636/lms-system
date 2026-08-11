package lk.ijse.lms_system.repository;

import lk.ijse.lms_system.dto.response.TeacherBatchDTO;
import lk.ijse.lms_system.entity.ClassBatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BatchRepository extends JpaRepository<ClassBatch,Long> {

    @Query(value = "SELECT new lk.ijse.lms_system.dto.response.TeacherBatchDTO(sb.subjectClassId,sb.classBatch.classBatchId,sb.subject.subjectId,sb.subject.subjectName) FROM ClassBatch cb JOIN SubjectBatch sb ON (cb.classBatchId=sb.classBatch.classBatchId) " +
            "JOIN Subject s ON (s.subjectId=sb.subject.subjectId) " +
            "WHERE s.subjectId=:subjectId")
    List<TeacherBatchDTO> teacherRelatedBatches(@Param("subjectId") Integer subjectId);

}

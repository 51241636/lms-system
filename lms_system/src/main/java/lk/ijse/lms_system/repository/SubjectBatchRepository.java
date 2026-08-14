package lk.ijse.lms_system.repository;

import lk.ijse.lms_system.dto.response.GetLogginTeacherSubjectDTO;
import lk.ijse.lms_system.dto.response.GetSubjectRelatedBatchDetailDTO;
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

    @Query(value = " SELECT\n" +
            "    sb.subject_class_id,\n" +
            "    cb.batch_name,\n" +
            "    cb.batch_start_date,\n" +
            "    COUNT(l.lesson_id) AS lesson_count\n" +
            "FROM subject_batch sb\n" +
            "JOIN class_batch cb\n" +
            "    ON cb.class_batch_id = sb.class_batch_id\n" +
            "LEFT JOIN lesson l\n" +
            "    ON l.subject_batch_id = sb.subject_class_id\n" +
            "WHERE sb.subject_id = ?1\n" +
            "GROUP BY\n" +
            "    cb.class_batch_id,\n" +
            "    cb.batch_name,\n" +
            "    cb.batch_start_date,sb.subject_class_id;",nativeQuery = true)
    List<GetSubjectRelatedBatchDetailDTO> getAllSubjectRelatedBatchDetails(Integer subjectId);

    @Query(value = "SELECT\n" +
            "    s.subject_name,\n" +
            "    COUNT(DISTINCT se.student_student_id) AS student_count,\n" +
            "    COUNT(DISTINCT l.lesson_id) AS lesson_count,\n" +
            "    COUNT(DISTINCT cb.class_batch_id) AS class_batches\n" +
            "    \n" +
            "FROM class_batch cb\n" +
            "JOIN subject_batch sb\n" +
            "    ON cb.class_batch_id = sb.class_batch_id\n" +
            "JOIN subject s\n" +
            "    ON s.subject_id = sb.subject_id\n" +
            "JOIN student_enrollment se\n" +
            "    ON se.subject_subject_id = s.subject_id\n" +
            "LEFT JOIN lesson l\n" +
            "    ON sb.subject_class_id = l.subject_batch_id\n" +
            "WHERE s.subject_id = ?1\n" +
            "GROUP BY\n" +
            "    s.subject_name",nativeQuery = true)
    GetLogginTeacherSubjectDTO getLoggedTeacherSubject(Integer subjectId);


}

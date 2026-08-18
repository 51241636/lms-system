package lk.ijse.lms_system.repository;

import lk.ijse.lms_system.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson,Integer> {
    @Query(value = "SELECT l FROM Lesson l where l.subjectBatch.subject.subjectName=:subjectName")
    List<Lesson> filterLesson(@Param("subjectName")String subjectName);

    @Query(value = "SELECT l FROM Lesson l WHERE l.subjectBatch.subjectClassId=:subjectClassId")
    List<Lesson> getLessonSubjectAndBatchRelated(@Param("subjectClassId") Long subjectClassId);
}

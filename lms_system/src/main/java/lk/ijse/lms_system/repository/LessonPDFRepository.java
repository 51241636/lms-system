package lk.ijse.lms_system.repository;

import lk.ijse.lms_system.entity.LessonPDF;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LessonPDFRepository extends JpaRepository<LessonPDF,Integer> {
    @Query(value = "SELECT lp FROM LessonPDF lp WHERE lp.lesson.lessonId=:lessonId")
    List<LessonPDF> getLessonPdfById(@Param("lessonId") Integer lessonId);
}

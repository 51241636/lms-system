package lk.ijse.lms_system.repository;

import lk.ijse.lms_system.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson,Integer> {
    @Query(value = "SELECT l FROM Lesson l WHERE (:lessonNumber IS NULL OR l.lessonNumber=:lessonNumber)AND (:lessonName IS NULL OR l.lessonTitle=:lessonName)AND (:createDate IS NULL OR l.lessonCreateDate=:createDate) ")
    List<Lesson> filterLesson(@Param("lessonNumber")Integer lessonNumber, @Param("lessonName")String lessonName, @Param("createDate")LocalDate  createDate);
}

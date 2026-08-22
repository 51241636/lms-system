package lk.ijse.lms_system.repository;

import lk.ijse.lms_system.entity.Assignment;
import lk.ijse.lms_system.entity.LessonPDF;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment,Long> {

    @Query(value = "SELECT a FROM Assignment a WHERE a.lesson.lessonId=:lessonId")
    List<Assignment> getLessonAssignmentById(@Param("lessonId") Integer lessonId);

}

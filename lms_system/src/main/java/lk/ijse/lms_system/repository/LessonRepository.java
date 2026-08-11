package lk.ijse.lms_system.repository;

import lk.ijse.lms_system.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonRepository extends JpaRepository<Lesson,Long> {
}

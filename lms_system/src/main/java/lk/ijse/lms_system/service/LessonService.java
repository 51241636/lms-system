package lk.ijse.lms_system.service;

import lk.ijse.lms_system.dto.LessonDTO;
import lk.ijse.lms_system.dto.response.LessonDetailDTO;
import lk.ijse.lms_system.entity.Lesson;

import java.time.LocalDate;
import java.util.List;

public interface LessonService {

    void saveLesson(LessonDTO lessonDTO);
    void updateLesson(LessonDTO lessonDTO);
    void deleteLesson(Integer lessonId);
    List<LessonDetailDTO> getAllLessons();
    List<LessonDetailDTO> filterLesson(Integer lessonNumber, String lessonName, LocalDate lessonCreateDate);
}

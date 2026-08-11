package lk.ijse.lms_system.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LessonDTO {
    private Integer lessonId;
    private Integer lessonNumber;
    private String lessonTitle;
    private String lessonDescription;
    private Long subjectClassId;
}

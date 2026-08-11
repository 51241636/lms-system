package lk.ijse.lms_system.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LessonDetailDTO {
    private Integer lessonId;
    private Integer lessonNumber;
    private String lessonTitle;
    private String lessonDescription;
    private LocalDate lessonStartDate;
    private String subjectName;
    private String batchName;
}

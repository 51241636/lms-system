package lk.ijse.lms_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentDTO {
    private Long assignmentId;
    private Integer lessonId;
    private String assignmentName;
    private String assignmentDescription;
    private LocalDate deadline;
    private Double maximumMarks;
    private MultipartFile assignmentPdfFile;
}

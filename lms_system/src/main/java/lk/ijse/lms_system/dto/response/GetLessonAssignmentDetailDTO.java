package lk.ijse.lms_system.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetLessonAssignmentDetailDTO {
    private Long assignmentId;
    private String assignmentName;
    private String assignmentDescription;
    private LocalDate deadline;
    private LocalDate assignmentPostedDate;
    private Double maximumMarks;

}

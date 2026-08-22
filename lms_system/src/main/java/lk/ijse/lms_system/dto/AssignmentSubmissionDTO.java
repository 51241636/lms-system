package lk.ijse.lms_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentSubmissionDTO {
    private Long assignmentSubmissionId;
    private MultipartFile assignmentSubmitFile;

}

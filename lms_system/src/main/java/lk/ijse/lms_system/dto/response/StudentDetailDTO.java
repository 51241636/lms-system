package lk.ijse.lms_system.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentDetailDTO {
    private Long studentId;
    private String studentName;
    private String studentUsername;
    private String email;
    private String contact;
    private String address;
}

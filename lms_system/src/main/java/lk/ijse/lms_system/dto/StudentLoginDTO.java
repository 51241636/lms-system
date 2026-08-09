package lk.ijse.lms_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentLoginDTO {
    private String studentUsername;
    private String studentPassword;
}

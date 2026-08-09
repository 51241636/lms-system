package lk.ijse.lms_system.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetUserDetailsDTO {
    private Long userId;
    private String username;
    private String email;
    private String contact;
    private String userRole;
    private Integer subjetId;
    private String subjectName;
    private String userStatus;
}

package lk.ijse.lms_system.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDataDTO {
    private Long userId;
    private String token;
    private List<String> userRoleList;
    private Integer subjectId;
}

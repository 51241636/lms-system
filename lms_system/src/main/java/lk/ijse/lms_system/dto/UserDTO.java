package lk.ijse.lms_system.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long userId;
    private String username;
    private String password;
    private String email;
    private String contact;
    private String userRole;
    private Integer subjetId;

    public UserDTO(Long userId, String username, String email, String contact, String userRole, Integer subjetId) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.contact = contact;
        this.userRole = userRole;
        this.subjetId = subjetId;
    }
}

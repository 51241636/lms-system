package lk.ijse.lms_system.dto.response;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lk.ijse.lms_system.entity.StudentEnrollment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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
    List<String> subjectStudent;
    private String batchName;

    public StudentDetailDTO(Long studentId, String studentName, String studentUsername, @NotBlank(message = "Email is required") @Email(message = "Invalid email address") String email, @Pattern(
            regexp = "^07[0-9]{8}$",
            message = "Invalid Sri Lankan contact number"
    ) String contact, String address) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.studentUsername = studentUsername;
        this.email = email;
        this.contact = contact;
        this.address = address;
    }
}

package lk.ijse.lms_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentDTO {
    private Long studentId;
    private String studentName;
    private String studentUsername;
    private String studentPassword;
    private String email;
    private String contact;
    private String address;
    private List<Integer> subjectId;
}

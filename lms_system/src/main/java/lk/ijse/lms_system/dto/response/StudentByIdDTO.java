package lk.ijse.lms_system.dto.response;

import lk.ijse.lms_system.dto.ClassBatchDTO;
import lk.ijse.lms_system.dto.SubjectDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentByIdDTO {
    private Long studentId;
    private String studentName;
    private String studentUsername;
    private String email;
    private String contact;
    private String address;
    List<SubjectDTO> subjectStudent;
    private ClassBatchDTO batchDTO;
}

package lk.ijse.lms_system.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeacherBatchDTO {
    private Long subjectClassId;
    private Long batchId;
    private Integer subjectId;
    private String subjectName;
}

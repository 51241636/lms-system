package lk.ijse.lms_system.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubjectBatchDetailDTO {
    private long subjectClassId;
    private String subjectName;
    private String batchName;
}

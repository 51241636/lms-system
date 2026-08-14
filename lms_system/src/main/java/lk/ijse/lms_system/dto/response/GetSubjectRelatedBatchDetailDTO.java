package lk.ijse.lms_system.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetSubjectRelatedBatchDetailDTO {
    private Long subjectClassId;
    private String batchName;
    private LocalDate  batchStartDate;
    private Long lessonCount;

}

package lk.ijse.lms_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClassBatchDTO {
    private Long classBatchId;
    private String classBatchName;
    private LocalDate classBatchStartDate;

    public ClassBatchDTO(Long classBatchId, String batchName) {
        this.classBatchId = classBatchId;
        this.classBatchName = batchName;
    }
}

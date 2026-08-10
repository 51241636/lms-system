package lk.ijse.lms_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubjectBatchDTO {
    private Long batchId;
    private List<Integer> subjectIdList;
}

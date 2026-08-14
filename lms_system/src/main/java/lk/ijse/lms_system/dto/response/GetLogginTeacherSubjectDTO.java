package lk.ijse.lms_system.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetLogginTeacherSubjectDTO {
    private String subjectName;
    private Long studentCount;
    private Long lessonCount;
    private Long batchCount;

}

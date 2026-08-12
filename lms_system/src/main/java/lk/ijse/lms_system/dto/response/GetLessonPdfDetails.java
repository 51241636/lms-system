package lk.ijse.lms_system.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetLessonPdfDetails {
    private Integer lessonId;
    private String fileName;
    private Integer lessonPdfFileId;
}

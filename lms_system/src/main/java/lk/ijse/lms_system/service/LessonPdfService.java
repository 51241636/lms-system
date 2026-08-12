package lk.ijse.lms_system.service;

import org.springframework.core.io.Resource;
import jakarta.servlet.http.HttpServletResponse;
import lk.ijse.lms_system.dto.LessonPdfDTO;
import lk.ijse.lms_system.dto.response.GetLessonPdfDetails;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

public interface LessonPdfService {
    void saveLessonPdf(LessonPdfDTO lessonPdfDTO) throws IOException;
    List<GetLessonPdfDetails> getLessonPdfByLessonId(Integer lessonId);
    Resource downloadSelectedPdf(Integer lessonPdfId, HttpServletResponse response) throws MalformedURLException;
}

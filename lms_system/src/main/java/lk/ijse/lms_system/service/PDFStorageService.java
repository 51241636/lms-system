package lk.ijse.lms_system.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface PDFStorageService {
    String savePdf(MultipartFile file) throws IOException;
}

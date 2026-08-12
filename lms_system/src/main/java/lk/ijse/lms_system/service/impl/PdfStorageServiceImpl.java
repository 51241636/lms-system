package lk.ijse.lms_system.service.impl;

import lk.ijse.lms_system.service.PDFStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PdfStorageServiceImpl implements PDFStorageService {
    @Value("${file.upload-directory}")
    private String uploadDir;

    @Override
    public String savePdf(MultipartFile file) throws IOException {
        try{
            Path path = Paths.get(uploadDir);
            Files.createDirectories(path);

//            file name generate randomly
            String fileName = UUID.randomUUID() + ".pdf";

            Path target = path.resolve(fileName);

//            save pdf to the server directory
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

            return target.toString();
        }catch (Exception e){
            throw  e;
        }
    }
}

package lk.ijse.lms_system.service.impl;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lk.ijse.lms_system.dto.LessonPdfDTO;
import lk.ijse.lms_system.dto.response.GetLessonPdfDetails;
import lk.ijse.lms_system.entity.Lesson;
import lk.ijse.lms_system.entity.LessonPDF;
import lk.ijse.lms_system.exception.LmsSystemException;
import lk.ijse.lms_system.repository.LessonPDFRepository;
import lk.ijse.lms_system.repository.LessonRepository;
import lk.ijse.lms_system.service.LessonPdfService;
import lk.ijse.lms_system.service.PDFStorageService;
import lk.ijse.lms_system.status.LessonContentStatus;
import lombok.RequiredArgsConstructor;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class LessonPdfServiceImpl implements LessonPdfService {
    private final PDFStorageService pdfStorageService;
    private final LessonPDFRepository lessonPDFRepository;
    private final LessonRepository lessonRepository;


    @Override
    public void saveLessonPdf(LessonPdfDTO lessonPdfDTO) throws IOException {
        try{
            Optional<Lesson> lessonById = lessonRepository.findById(lessonPdfDTO.getLessonId());
            if(lessonById.isEmpty()){
                throw new LmsSystemException(404,"Lesson not found");
            }


            if(lessonPdfDTO.getLessonPdfFile().isEmpty()){
                throw new LmsSystemException(404,"lessonPdf is empty");
            }
            if(!"application/pdf".equals(lessonPdfDTO.getLessonPdfFile().getContentType())){
                throw new LmsSystemException(404,"lessonPdf is not a PDF");
            }
            String savedPdf = pdfStorageService.savePdf(lessonPdfDTO.getLessonPdfFile());
            if(savedPdf.isEmpty()){
               throw new LmsSystemException(404,"savedPdf is empty");
            }
            LessonPDF lessonPDF = new LessonPDF();
            lessonPDF.setFileName(lessonPdfDTO.getLessonPdfFile().getOriginalFilename());
            lessonPDF.setFilePath(savedPdf);
            lessonPDF.setFileContentType(lessonPdfDTO.getLessonPdfFile().getContentType());
            lessonPDF.setFileSize(lessonPdfDTO.getLessonPdfFile().getSize());
            lessonPDF.setLesson(lessonById.get());
            lessonPDF.setLessonContentStatus(LessonContentStatus.ACTIVE);
            lessonPDFRepository.save(lessonPDF);


        }catch (Exception e){
            throw e;
        }
    }

    @Override
    public List<GetLessonPdfDetails> getLessonPdfByLessonId(Integer lessonId) {
        try{
            List<LessonPDF> lessonPdfById = lessonPDFRepository.getLessonPdfById(lessonId);
            if(lessonPdfById.isEmpty()){
                throw new LmsSystemException(404,"Lesson related pdf not found");
            }
            List<GetLessonPdfDetails> lessonPdfDTOList=new ArrayList<>();
            for(LessonPDF lessonPDF:lessonPdfById){
                lessonPdfDTOList.add(new GetLessonPdfDetails(lessonPDF.getLesson().getLessonId(),lessonPDF.getFileName(),lessonPDF.getLessonFileId()));
            }
            return lessonPdfDTOList;



        }catch (Exception e){
            throw e;
        }
    }

    @Override
    public Resource downloadSelectedPdf(Integer lessonPdfId, HttpServletResponse response) throws MalformedURLException {
        try{
            Optional<LessonPDF> byId = lessonPDFRepository.findById(lessonPdfId);
            if(byId.isEmpty()){
                throw new LmsSystemException(404,"Lesson related pdf not found");
            }
            LessonPDF lessonPDF = byId.get();
            response.setHeader(
                    HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=\"" +/* use pdf download*/
                            lessonPDF.getFileName() +
                            "\""
            );
            Path path = Paths.get(lessonPDF.getFilePath());
            org.springframework.core.io.Resource resource =
                    new UrlResource(path.toUri());
            if (!resource.exists() ||
                    !resource.isReadable()) {

                throw new LmsSystemException(
                        404,
                        "PDF file not found"
                );
            }
            return resource;



        } catch (Exception e) {
            throw e;
        }
    }
}


//@GetMapping(
//        value = "/pdf/{pdfId}/download",
//        produces = MediaType.APPLICATION\_PDF\_VALUE
//)
//public Resource downloadPdf(
//        @PathVariable Integer pdfId,
//        HttpServletResponse response) {
//
//```
//    LessonPDF pdf =
//            lessonPDFService.getPdfDetails(pdfId);
//
//    response.setHeader(
//            HttpHeaders.CONTENT_DISPOSITION,
//            "attachment; filename=\"" +
//                    pdf.getFileName() +
//                    "\""
//    );
//
//    return lessonPDFService.getPdfResource(pdfId);
//```
//
//} explain
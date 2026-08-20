package lk.ijse.lms_system.controller;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lk.ijse.lms_system.constant.CommonResponse;
import lk.ijse.lms_system.dto.ClassBatchDTO;
import lk.ijse.lms_system.dto.LessonPdfDTO;
import lk.ijse.lms_system.dto.response.GetLessonPdfDetails;
import lk.ijse.lms_system.service.LessonPdfService;
import lk.ijse.lms_system.service.PDFStorageService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static lk.ijse.lms_system.constant.ResponseCode.OPERATION_SUCCSESS;
import static lk.ijse.lms_system.constant.ResponseMessage.RESPONSE_MESSAGE;

@RestController
@RequestMapping(value = "v1/fileSave")
@AllArgsConstructor
@Slf4j
@CrossOrigin
public class LessonPdfController {

    private final LessonPdfService lessonPdfService;

    @PreAuthorize("hasAnyRole('Admin','Teacher')")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public CommonResponse addPDF(@ModelAttribute LessonPdfDTO lessonPdfDTO) throws IOException {

        lessonPdfService.saveLessonPdf(lessonPdfDTO);

        return new CommonResponse(OPERATION_SUCCSESS,RESPONSE_MESSAGE);
    }


    @GetMapping(value = "/{lessonId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getAllPdfRelatedLesson(@PathVariable Integer lessonId)  {
        List<GetLessonPdfDetails> lessonPdfList = lessonPdfService.getLessonPdfByLessonId(lessonId);

        return new CommonResponse(OPERATION_SUCCSESS,lessonPdfList,RESPONSE_MESSAGE);
    }

    @GetMapping(value = "/downloadPdf/{lessonPdfId}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<Resource> downloadPDF(@PathVariable Integer lessonPdfId, HttpServletResponse response) throws IOException {
        Resource resource = lessonPdfService.downloadSelectedPdf(lessonPdfId, response);
        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + resource.getFilename() + "\""
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);

    }
    @GetMapping(value = "/lessonPdfDetailById/{lessonPdfId}",produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getLessonPdfById(@PathVariable Integer lessonPdfId) throws IOException {
        GetLessonPdfDetails getLessonPdfDetail = lessonPdfService.getsavedLessonPdf(lessonPdfId);
        return new CommonResponse(OPERATION_SUCCSESS,getLessonPdfDetail,RESPONSE_MESSAGE);

    }


    @PreAuthorize("hasAnyRole('Admin','Teacher')")
    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public CommonResponse updatePdf(@ModelAttribute LessonPdfDTO lessonPdfDTO) throws IOException {

        lessonPdfService.updateLessonPdf(lessonPdfDTO);

        return new CommonResponse(OPERATION_SUCCSESS,RESPONSE_MESSAGE);
    }


    @PreAuthorize("hasAnyRole('Admin','Teacher')")
    @DeleteMapping(value = "/{lessonPdfId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse deleteLessonPdf(@PathVariable Integer lessonPdfId) throws IOException {
        lessonPdfService.deleteLessonPdf(lessonPdfId);
        return new CommonResponse(OPERATION_SUCCSESS,RESPONSE_MESSAGE);

    }




}

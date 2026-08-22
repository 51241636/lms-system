package lk.ijse.lms_system.controller;


import jakarta.servlet.http.HttpServletResponse;
import lk.ijse.lms_system.constant.CommonResponse;
import lk.ijse.lms_system.dto.AssignmentDTO;
import lk.ijse.lms_system.dto.LessonPdfDTO;
import lk.ijse.lms_system.dto.response.GetLessonAssignmentDetailDTO;
import lk.ijse.lms_system.dto.response.GetLessonPdfDetails;
import lk.ijse.lms_system.service.AssignmentService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static lk.ijse.lms_system.constant.ResponseCode.OPERATION_SUCCSESS;
import static lk.ijse.lms_system.constant.ResponseMessage.RESPONSE_MESSAGE;

@RestController
@RequestMapping(value = "v1/assignment")
@AllArgsConstructor
@Slf4j
@CrossOrigin
public class AssignmentController {
    private final AssignmentService assignmentService;


    @PreAuthorize("hasAnyRole('Admin','Teacher')")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public CommonResponse addAssignment(@ModelAttribute AssignmentDTO assignmentDTO) throws IOException {

        assignmentService.addAssignment(assignmentDTO);

        return new CommonResponse(OPERATION_SUCCSESS,RESPONSE_MESSAGE);
    }
    @PreAuthorize("hasAnyRole('Admin','Teacher')")
    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public CommonResponse updateAssignment(@ModelAttribute AssignmentDTO assignmentDTO) throws IOException {

        assignmentService.updateLessonAssignment(assignmentDTO);

        return new CommonResponse(OPERATION_SUCCSESS,RESPONSE_MESSAGE);
    }

    @GetMapping(value = "/{lessonId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getAllAssignmentRelatedLesson(@PathVariable Integer lessonId)  {
        List<GetLessonAssignmentDetailDTO> assignmentByLessonId = assignmentService.getAssignmentByLessonId(lessonId);
        return new CommonResponse(OPERATION_SUCCSESS,assignmentByLessonId,RESPONSE_MESSAGE);
    }
    @GetMapping(value = "/getAssignmentById/{assignmentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getAssignmentById(@PathVariable Long assignmentId)  {
        GetLessonAssignmentDetailDTO assignmentById = assignmentService.getAssignmentById(assignmentId);
        return new CommonResponse(OPERATION_SUCCSESS,assignmentById,RESPONSE_MESSAGE);
    }

    @DeleteMapping(value = "/{assignmentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse deleteAssignment(@PathVariable Long assignmentId)  {
        assignmentService.deleteLessonAssignment(assignmentId);
        return new CommonResponse(OPERATION_SUCCSESS,RESPONSE_MESSAGE);
    }

    @GetMapping(value = "/downloadAssignment/{assignmentId}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<Resource> downloadPDF(@PathVariable Long assignmentId, HttpServletResponse response) throws IOException {
        Resource resource = assignmentService.downloadSelectedAssignment(assignmentId, response);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + resource.getFilename() + "\""
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);

    }
}

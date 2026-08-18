package lk.ijse.lms_system.controller;

import jakarta.validation.Valid;
import lk.ijse.lms_system.constant.CommonResponse;
import lk.ijse.lms_system.dto.StudentDTO;
import lk.ijse.lms_system.dto.SubjectBatchDTO;
import lk.ijse.lms_system.dto.SubjectDTO;
import lk.ijse.lms_system.service.SubjectBatchService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static lk.ijse.lms_system.constant.ResponseCode.OPERATION_SUCCSESS;
import static lk.ijse.lms_system.constant.ResponseMessage.RESPONSE_MESSAGE;

@RestController
@RequestMapping(value = "v1/subjectBatch")
@AllArgsConstructor
@Slf4j
@CrossOrigin
public class SubjectBatchController {
    private final SubjectBatchService subjectBatchService;


    //    add subjectBatch
    @PreAuthorize("hasRole('Admin')")
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse addSubjectBatch(@Valid @RequestBody SubjectBatchDTO subjectBatchDTO) {
        log.info("get subjectBatch details");
        subjectBatchService.addSubjectBatch(subjectBatchDTO);
        log.info("add subjectBatches success");
        return new CommonResponse(OPERATION_SUCCSESS,RESPONSE_MESSAGE);
    }


// get subject list batch id related
    @GetMapping(value = "/subjects/{classBatchId}",produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getSubjectList(@PathVariable Integer classBatchId) {
        log.info("get classBatchId ");
        List<SubjectDTO> batchRelatedSubject = subjectBatchService.getBatchRelatedSubject(classBatchId);
        log.info("get subject list batch id related");
        return new CommonResponse(OPERATION_SUCCSESS,batchRelatedSubject,RESPONSE_MESSAGE);
    }

    // get batch subjectId related
    @GetMapping(value = "/batchList/{subjectId}",produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getSubjectRelatedBatchList(@PathVariable Integer subjectId) {
        log.info("get subjectId ");
        return new CommonResponse(OPERATION_SUCCSESS,subjectBatchService.getSubjectRelatedBatchDetail(subjectId),RESPONSE_MESSAGE);
    }

    // get batch subjectId related
    @GetMapping(value = "/teacherSubjectName/{subjectId}",produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getTeacherSubjectName(@PathVariable Integer subjectId) {
        log.info("get subjectId for get subjectName ");
        return new CommonResponse(OPERATION_SUCCSESS,subjectBatchService.getLoggingTeacherSubject(subjectId),RESPONSE_MESSAGE);
    }

    // get studentCount
    @GetMapping(value = "/studentCount",produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getStudentCount() {
        return new CommonResponse(OPERATION_SUCCSESS,subjectBatchService.getStudentCountSubjectRelated(),RESPONSE_MESSAGE);
    }

//    get all subjectbatch List
        @GetMapping(value = "/getAllSubjectBatch",produces = MediaType.APPLICATION_JSON_VALUE)
        public CommonResponse getAllSubjectBatch() {
            return new CommonResponse(OPERATION_SUCCSESS,subjectBatchService.getAllSubjectBatchDetail(),RESPONSE_MESSAGE);
        }



}

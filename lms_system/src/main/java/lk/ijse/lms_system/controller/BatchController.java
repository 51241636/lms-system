package lk.ijse.lms_system.controller;

import jakarta.validation.Valid;
import lk.ijse.lms_system.constant.CommonResponse;
import lk.ijse.lms_system.dto.ClassBatchDTO;
import lk.ijse.lms_system.dto.SubjectDTO;
import lk.ijse.lms_system.dto.response.StudentDetailDTO;
import lk.ijse.lms_system.service.BatchService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static lk.ijse.lms_system.constant.ResponseCode.OPERATION_SUCCSESS;
import static lk.ijse.lms_system.constant.ResponseMessage.RESPONSE_MESSAGE;


@RestController
@RequestMapping(value = "v1/classBatch")
@AllArgsConstructor
@Slf4j
@CrossOrigin
public class BatchController {

private final BatchService batchService;


    //    add class batch
    @PreAuthorize("hasAnyRole('Admin','Teacher')")
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse addBatch(@Valid @RequestBody ClassBatchDTO classBatchDTO) {
        log.info("get ClassBatch detail");
        batchService.addBatch(classBatchDTO);
        log.info("add batch success");
        return new CommonResponse(OPERATION_SUCCSESS,RESPONSE_MESSAGE);
    }


    //     update class batch
    @PreAuthorize("hasAnyRole('Admin','Teacher')")
    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse updateBatch(@Valid @RequestBody ClassBatchDTO classBatchDTO) {
        log.info("get update ClassBatch details");
        batchService.updateBatch(classBatchDTO);
        log.info("update ClassBatch success");
        return new CommonResponse(OPERATION_SUCCSESS,RESPONSE_MESSAGE);
    }

    //    delete Subject
    @PreAuthorize("hasAnyRole('Admin','Teacher')")
    @DeleteMapping(value = "/{classBatchId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse deleteClassBatch(@PathVariable Long classBatchId) {
        log.info("get classBatch id for delete ClassBatch");
        batchService.deleteBatch(classBatchId);
        log.info("deleted ClassBatch success");
        return new CommonResponse(OPERATION_SUCCSESS,RESPONSE_MESSAGE);
    }


    //    get all class batch
    @PreAuthorize("hasAnyRole('Admin','Teacher')")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getAllClassBatches() {
        log.info("get all ClassBatches");
        List<ClassBatchDTO> allBatches = batchService.getAllBatches();
        return new CommonResponse(OPERATION_SUCCSESS,allBatches,RESPONSE_MESSAGE);
    }

//    get class batch related student list
@PreAuthorize("hasAnyRole('Admin','Teacher')")
@GetMapping(value = "/batchRelatedStudent/{classBatchId}",produces = MediaType.APPLICATION_JSON_VALUE)
public CommonResponse getBatchRelatedStudentList(@PathVariable Long classBatchId) {
    log.info("classBatch id");
    List<StudentDetailDTO> allBatchRelatedStudents = batchService.getAllBatchRelatedStudents(classBatchId);
    return new CommonResponse(OPERATION_SUCCSESS,allBatchRelatedStudents,RESPONSE_MESSAGE);
}




}

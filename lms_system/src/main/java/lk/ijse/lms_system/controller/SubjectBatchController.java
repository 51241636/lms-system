package lk.ijse.lms_system.controller;

import jakarta.validation.Valid;
import lk.ijse.lms_system.constant.CommonResponse;
import lk.ijse.lms_system.dto.StudentDTO;
import lk.ijse.lms_system.dto.SubjectBatchDTO;
import lk.ijse.lms_system.service.SubjectBatchService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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


}

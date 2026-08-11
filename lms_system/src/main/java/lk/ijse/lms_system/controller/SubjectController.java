package lk.ijse.lms_system.controller;

import jakarta.validation.Valid;
import lk.ijse.lms_system.constant.CommonResponse;
import lk.ijse.lms_system.dto.SubjectDTO;
import lk.ijse.lms_system.dto.UserDTO;
import lk.ijse.lms_system.dto.UserLoginDTO;
import lk.ijse.lms_system.dto.response.GetUserDetailsDTO;
import lk.ijse.lms_system.dto.response.UserDataDTO;
import lk.ijse.lms_system.service.SubjectService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static lk.ijse.lms_system.constant.ResponseCode.OPERATION_SUCCSESS;
import static lk.ijse.lms_system.constant.ResponseMessage.RESPONSE_MESSAGE;

@RestController
@RequestMapping(value = "v1/subject")
@AllArgsConstructor
@Slf4j
@CrossOrigin
public class SubjectController {
    private final SubjectService subjectService;

    //    add Subject
    @PreAuthorize("hasRole('Admin')")
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse addSubject(@Valid @RequestBody SubjectDTO subjectDTO) {
        log.info("get subject detail");
        subjectService.addSubject(subjectDTO);
        log.info("add subject");
        return new CommonResponse(OPERATION_SUCCSESS,RESPONSE_MESSAGE);
    }


    //     update subject
    @PreAuthorize("hasRole('Admin')")
    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse updateSubject(@Valid @RequestBody SubjectDTO subjectDTO) {
        log.info("get update subject details");
        subjectService.updateSubject(subjectDTO);
        log.info("update subject");
        return new CommonResponse(OPERATION_SUCCSESS,RESPONSE_MESSAGE);
    }

    //    delete Subject
    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping(value = "/{subjectId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse deleteSubject(@PathVariable Integer subjectId) {
        log.info("get subject id for delete Subject");
        subjectService.deleteSubject(subjectId);
        log.info("deleted Subject");
        return new CommonResponse(OPERATION_SUCCSESS,RESPONSE_MESSAGE);
    }


    //    get all Subjects
    @PreAuthorize("hasRole('Admin')")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getAllSubjects() {

        List<SubjectDTO> allSubjects = subjectService.getAllSubjects();
        log.info("get all subjects success");
        return new CommonResponse(OPERATION_SUCCSESS,allSubjects,RESPONSE_MESSAGE);
    }


    //   search subjects using subject name
    @PreAuthorize("hasRole('Admin')")
    @GetMapping(value ="/filterSubject",produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse filterSubject(@RequestParam(value = "subjectName",required = false)String subjectName){
        List<SubjectDTO> getSubjectDTO = subjectService.searchSubjectByName(subjectName);
        log.info("filtered subject list success");
        return new CommonResponse(OPERATION_SUCCSESS,getSubjectDTO,RESPONSE_MESSAGE);
    }

    //   get user related subject
    @PreAuthorize("hasRole('Teacher')")
    @GetMapping(value ="/userRelatedSubject/{userId}",produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse userRelatedSubject(@PathVariable Long userId){
        SubjectDTO subjectDTO = subjectService.loadUserRelatedSubject(userId);
        return new CommonResponse(OPERATION_SUCCSESS,subjectDTO,RESPONSE_MESSAGE);
    }




}

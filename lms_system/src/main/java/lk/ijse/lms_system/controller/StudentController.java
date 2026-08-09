package lk.ijse.lms_system.controller;

import jakarta.validation.Valid;
import lk.ijse.lms_system.constant.CommonResponse;
import lk.ijse.lms_system.dto.*;
import lk.ijse.lms_system.dto.response.GetUserDetailsDTO;
import lk.ijse.lms_system.dto.response.StudentDetailDTO;
import lk.ijse.lms_system.dto.response.UserDataDTO;
import lk.ijse.lms_system.security.JWTUtil;
import lk.ijse.lms_system.service.StudentService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static lk.ijse.lms_system.constant.ResponseCode.OPERATION_SUCCSESS;
import static lk.ijse.lms_system.constant.ResponseMessage.RESPONSE_MESSAGE;

@RestController
@RequestMapping(value = "v1/student")
@AllArgsConstructor
@Slf4j
@CrossOrigin
public class StudentController {
    private final StudentService studentService;
    private final JWTUtil jwtUtil;

    //    register student
    @PreAuthorize("hasAnyRole('Admin','Teacher')")
    @PostMapping(value = "/registerStudent", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse registerStudent(@Valid @RequestBody StudentDTO studentDTO) {
        log.info("get Student details");
        studentService.registerStudent(studentDTO);
        log.info("register student success");
        return new CommonResponse(OPERATION_SUCCSESS,RESPONSE_MESSAGE);
    }

    //    login student and generate token
    @PostMapping(value = "/loginStudent",produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse loginStudent(@Valid @RequestBody StudentLoginDTO studentLoginDTO) {
        log.info("get studentUserName and studentPassword");
        LoginStudentDTO loginStudent = studentService.getLoginStudent(studentLoginDTO);
        log.info("get entered student userDetails");
        String token = jwtUtil.generatedToken(loginStudent.getStudentId(), loginStudent.getRole(), loginStudent.getStudentUserName());
        log.info("get entered student token");
        return new CommonResponse(OPERATION_SUCCSESS,new UserDataDTO(loginStudent.getStudentId(),token),RESPONSE_MESSAGE);
    }

    //     update Student
    @PreAuthorize("hasAnyRole('Admin','Teacher')")
    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse updateStudent(@Valid @RequestBody StudentDTO studentDTO) {
        log.info("get update student details");
        studentService.updateStudent(studentDTO);
        log.info("update student success");
        return new CommonResponse(OPERATION_SUCCSESS,RESPONSE_MESSAGE);
    }

    //    delete Student
    @PreAuthorize("hasAnyRole('Admin','Teacher')")
    @DeleteMapping(value = "/{studentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse deleteStudent(@PathVariable Long studentId) {
        log.info("get student id for delete student details");
        studentService.deleteStudent(studentId);
        log.info("deleted student");
        return new CommonResponse(OPERATION_SUCCSESS,RESPONSE_MESSAGE);
    }

    //    get all registered students
    @PreAuthorize("hasAnyRole('Admin','Teacher')")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getAllStudent() {
        log.info("get all students");
        List<StudentDetailDTO> allStudents = studentService.getAllStudents();
        return new CommonResponse(OPERATION_SUCCSESS,allStudents,RESPONSE_MESSAGE);
    }


}

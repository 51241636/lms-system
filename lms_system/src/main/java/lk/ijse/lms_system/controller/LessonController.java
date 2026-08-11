package lk.ijse.lms_system.controller;

import jakarta.validation.Valid;
import lk.ijse.lms_system.constant.CommonResponse;
import lk.ijse.lms_system.dto.LessonDTO;
import lk.ijse.lms_system.dto.SubjectDTO;
import lk.ijse.lms_system.dto.response.LessonDetailDTO;
import lk.ijse.lms_system.service.LessonService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

import static lk.ijse.lms_system.constant.ResponseCode.OPERATION_SUCCSESS;
import static lk.ijse.lms_system.constant.ResponseMessage.RESPONSE_MESSAGE;

@RestController
@RequestMapping(value = "v1/lesson")
@AllArgsConstructor
@Slf4j
@CrossOrigin
public class LessonController {

    private final LessonService lessonService;


    //    add new lesson
    @PreAuthorize("hasRole('teacher')")
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse addLesson(@Valid @RequestBody LessonDTO lessonDTO) {
        log.info("get lesson detail from frontEnd");
        lessonService.saveLesson(lessonDTO);
        log.info("add lesson success");
        return new CommonResponse(OPERATION_SUCCSESS,RESPONSE_MESSAGE);
    }

    // update added lesson
    @PreAuthorize("hasRole('Teacher')")
    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse updateLesson(@Valid @RequestBody LessonDTO lessonDTO) {
        log.info("get lesson detail from frontEnd for update");
        lessonService.updateLesson(lessonDTO);
        log.info("update lesson success");
        return new CommonResponse(OPERATION_SUCCSESS,RESPONSE_MESSAGE);
    }

//    delete added lesson
    @PreAuthorize("hasRole('Teacher')")
    @DeleteMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse deleteLesson(@Valid @RequestBody Integer lessonId) {
        log.info("get lesson id for delete");
        lessonService.deleteLesson(lessonId);
        log.info("delete lesson success");
        return new CommonResponse(OPERATION_SUCCSESS,RESPONSE_MESSAGE);
    }

//    get all subject related lesson
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getAllLessonSubjectRelated() {
        List<LessonDetailDTO> allLessonsSubjectRelated = lessonService.getAllLessons();
        log.info("get all subjectRelated lesson success");
        return new CommonResponse(OPERATION_SUCCSESS,allLessonsSubjectRelated,RESPONSE_MESSAGE);
    }

//    filter lessons using lesson number , lesson name or lesson created date
    @GetMapping(value = "/filterLesson", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse filterLesson(@RequestParam(value = "lessonNumber",required = false)Integer lessonId, @RequestParam(value = "lessonName",required = false)String lessonName, @RequestParam(value = "lessonCreateDate",required = false)LocalDate createDate) {
        List<LessonDetailDTO> filteredLessonList = lessonService.filterLesson(lessonId, lessonName, createDate);
        log.info("lesson filtered success");
        return new CommonResponse(OPERATION_SUCCSESS,filteredLessonList,RESPONSE_MESSAGE);
    }
}

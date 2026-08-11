package lk.ijse.lms_system.service.impl;

import lk.ijse.lms_system.dto.LessonDTO;
import lk.ijse.lms_system.dto.response.LessonDetailDTO;
import lk.ijse.lms_system.entity.Lesson;
import lk.ijse.lms_system.entity.SubjectBatch;
import lk.ijse.lms_system.exception.LmsSystemException;
import lk.ijse.lms_system.repository.LessonRepository;
import lk.ijse.lms_system.repository.SubjectBatchRepository;
import lk.ijse.lms_system.service.LessonService;
import lk.ijse.lms_system.status.LessonStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class LessonServiceImpl implements LessonService {
    private final LessonRepository lessonRepository;
    private final SubjectBatchRepository subjectBatchRepository;

    @Override
    public void saveLesson(LessonDTO lessonDTO) {
        try{
            Optional<SubjectBatch> subjectBatchById = subjectBatchRepository.findById(lessonDTO.getSubjectClassId());
            if(subjectBatchById.isPresent()){
                log.info("subjectBatchBy is present");
                Lesson lesson=new  Lesson();
                lesson.setLessonNumber(lessonDTO.getLessonNumber());
                lesson.setLessonTitle(lessonDTO.getLessonTitle());
                lesson.setLessonDescription(lessonDTO.getLessonDescription());
                lesson.setLessonCreateDate(LocalDate.now());
                lesson.setSubjectBatch(subjectBatchById.get());
                lesson.setLessonStatus(LessonStatus.ACTIVE);
                lessonRepository.save(lesson);
                log.info("Lesson saved successfully");

            }else {
                throw new LmsSystemException(404,"subject batch not found");
            }


        }catch(Exception e){
            throw e;
        }
    }

    @Override
    public void updateLesson(LessonDTO lessonDTO) {
        try{
            Optional<Lesson> lessonById = lessonRepository.findById(lessonDTO.getLessonId());
            if(lessonById.isPresent()){
                Lesson lesson = lessonById.get();
                lesson.setLessonNumber(lessonDTO.getLessonNumber());
                lesson.setLessonTitle(lessonDTO.getLessonTitle());
                lesson.setLessonDescription(lessonDTO.getLessonDescription());
                lesson.setLessonCreateDate(LocalDate.now());
                lesson.setLessonStatus(LessonStatus.ACTIVE);
                lessonRepository.save(lesson);
                log.info("Lesson updated successfully");
            }else {
                throw new LmsSystemException(404,"lesson not found");
            }
        }catch(Exception e){
            throw e;
        }
    }

    @Override
    public void deleteLesson(Integer lessonId) {
        try{
            Optional<Lesson> lessonById = lessonRepository.findById(lessonId);
            if(lessonById.isPresent()){
                Lesson lesson = lessonById.get();
                lesson.setLessonStatus(LessonStatus.INACTIVE);
                lessonRepository.save(lesson);
                log.info("lesson deleted successfully");
            }else {
                throw new LmsSystemException(404,"lesson not found");
            }
        }catch(Exception e){
            throw e;
        }
    }

    @Override
    public List<LessonDetailDTO> getAllLessons() {
       try{
           List<Lesson> allLessonList = lessonRepository.findAll();
           List<LessonDetailDTO> lessonDetailDTOList = new ArrayList<>();
          if(allLessonList.isEmpty()){
              throw new LmsSystemException(404,"lessons not yet added");
          }
          log.info("allLessonList is present");
           for(Lesson lesson:allLessonList){
               if(lesson.getLessonStatus().equals(LessonStatus.ACTIVE)){
                   lessonDetailDTOList.add(new LessonDetailDTO(lesson.getLessonId(),lesson.getLessonNumber(),lesson.getLessonTitle(),lesson.getLessonDescription(),lesson.getLessonCreateDate(),lesson.getSubjectBatch().getSubject().getSubjectName(),lesson.getSubjectBatch().getClassBatch().getBatchName()));
               }
           }
           log.info("lessons added success to the lessonDetailDTOList");
           return lessonDetailDTOList;
       }catch(Exception e){
           throw e;
       }
    }

    @Override
    public List<LessonDetailDTO> filterLesson(Integer lessonNumber,String lessonName,LocalDate lessonCreateDate) {
        try {
            List<Lesson> filteredLessonList = lessonRepository.filterLesson(lessonNumber, lessonName, lessonCreateDate);
            if(filteredLessonList.isEmpty()){
                throw new LmsSystemException(404,"related lessons not found");
            }
            log.info("filteredLesson is present");
            List<LessonDetailDTO> lessonDetailDTOList = new ArrayList<>();
            for(Lesson lesson:filteredLessonList){
                if(lesson.getLessonStatus().equals(LessonStatus.ACTIVE)){
                    lessonDetailDTOList.add(new LessonDetailDTO(lesson.getLessonId(),lesson.getLessonNumber(),lesson.getLessonTitle(),lesson.getLessonDescription(),lesson.getLessonCreateDate(),lesson.getSubjectBatch().getSubject().getSubjectName(),lesson.getSubjectBatch().getClassBatch().getBatchName()));
                }
            }
            log.info("lessonDetailDTOList is created");
            return lessonDetailDTOList;

        }catch (Exception e){
            throw e;
        }
    }
}

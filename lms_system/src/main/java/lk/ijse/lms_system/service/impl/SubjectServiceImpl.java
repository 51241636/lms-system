package lk.ijse.lms_system.service.impl;

import lk.ijse.lms_system.dto.SubjectDTO;
import lk.ijse.lms_system.entity.Subject;
import lk.ijse.lms_system.exception.LmsSystemException;
import lk.ijse.lms_system.repository.SubjectRepository;
import lk.ijse.lms_system.service.SubjectService;
import lk.ijse.lms_system.status.SubjectStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class SubjectServiceImpl implements SubjectService {

    private final SubjectRepository subjectRepository;

//    save subject
    @Override
    public void addSubject(SubjectDTO subjectDTO) {
        try{
            Subject subject=new Subject();
            subject.setSubjectName(subjectDTO.getSubjectName());
            subject.setSubjectStatus(SubjectStatus.ACTIVE);
            subjectRepository.save(subject);
            log.info("save subject");
        }catch(Exception e){
            throw e;
        }
    }

//    updateSubject
    @Override
    public void updateSubject(SubjectDTO subjectDTO) {
        try{
            Optional<Subject> subjectById = subjectRepository.findById(subjectDTO.getSubjectId());
            if(subjectById.isPresent()){
                Subject subject = subjectById.get();
                subject.setSubjectName(subjectDTO.getSubjectName());
                subject.setSubjectStatus(SubjectStatus.ACTIVE);
                subjectRepository.save(subject);
                log.info("update subject");

            }else {
                throw new LmsSystemException(404,"Subject not found");
            }


        }catch(Exception e){
            throw e;
        }
    }

//    delete subject
    @Override
    public void deleteSubject(Integer subjectId) {
        try{
            Optional<Subject> byId = subjectRepository.findById(subjectId);
            if(byId.isPresent() && SubjectStatus.ACTIVE.equals(byId.get().getSubjectStatus())){
                Subject subject = byId.get();
                subject.setSubjectStatus(SubjectStatus.INACTIVE);
                subjectRepository.save(subject);
                log.info("delete subject");

            }else {
                throw new LmsSystemException(404,"Subject not found");
            }

        }catch(Exception e){
            throw e;
        }

    }

//    get all subjects
    @Override
    public List<SubjectDTO> getAllSubjects() {
        try{
            List<Subject> allSubjects = subjectRepository.findAll();
            List<SubjectDTO> subjectDTOS=new ArrayList<>();
            for(Subject subject:allSubjects){
                if(subject.getSubjectStatus().equals(SubjectStatus.ACTIVE)){
                    subjectDTOS.add(new SubjectDTO(subject.getSubjectId(),subject.getSubjectName()));
                }

            }
            log.info("getAllSubjects");
            return subjectDTOS;

        }catch(Exception e){
            throw e;
        }
    }

//    search subjects using a subject name
    @Override
    public List<SubjectDTO> searchSubjectByName(String subjectName) {
        try{
            List<Subject> searchedSubjects = subjectRepository.searchSubject(subjectName);
            List<SubjectDTO> subjectDTOS=new ArrayList<>();
            for(Subject subject:searchedSubjects){
                if(subject.getSubjectStatus().equals(SubjectStatus.ACTIVE)){
                    subjectDTOS.add(new SubjectDTO(subject.getSubjectId(),subject.getSubjectName()));
                }
            }
            log.info("searchSubjectListByName");
            return subjectDTOS;
        }catch (Exception e){
            throw e;
        }
    }
}

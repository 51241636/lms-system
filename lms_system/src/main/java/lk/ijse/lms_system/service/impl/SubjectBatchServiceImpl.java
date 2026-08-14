package lk.ijse.lms_system.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.lms_system.dto.ClassBatchDTO;
import lk.ijse.lms_system.dto.SubjectBatchDTO;
import lk.ijse.lms_system.dto.SubjectDTO;
import lk.ijse.lms_system.dto.response.GetLogginTeacherSubjectDTO;
import lk.ijse.lms_system.dto.response.GetSubjectRelatedBatchDetailDTO;
import lk.ijse.lms_system.entity.ClassBatch;
import lk.ijse.lms_system.entity.Subject;
import lk.ijse.lms_system.entity.SubjectBatch;
import lk.ijse.lms_system.exception.LmsSystemException;
import lk.ijse.lms_system.repository.BatchRepository;
import lk.ijse.lms_system.repository.SubjectBatchRepository;
import lk.ijse.lms_system.repository.SubjectRepository;
import lk.ijse.lms_system.service.SubjectBatchService;
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
@Transactional
public class SubjectBatchServiceImpl implements SubjectBatchService {
    private final SubjectBatchRepository subjectBatchRepository;
    private final BatchRepository batchRepository;
    private final SubjectRepository subjectRepository;

//    add subjectBatch
    @Override
    public void addSubjectBatch(SubjectBatchDTO subjectBatchDTO) {
        try {
            Optional<ClassBatch> classBatchById = batchRepository.findById(subjectBatchDTO.getBatchId());
            if(classBatchById.isPresent()){
                for(Integer subjectId:subjectBatchDTO.getSubjectIdList()){
                    Optional<Subject> subjectById = subjectRepository.findById(subjectId);
                    if(subjectById.isPresent()){
                        log.info("subject is present");
                            SubjectBatch subjectBatch = new SubjectBatch();
                            subjectBatch.setSubject(subjectById.get());
                            subjectBatch.setClassBatch(classBatchById.get());
                            subjectBatchRepository.save(subjectBatch);
                            log.info("subject batch saved successfully");
                    }else {
                        throw new LmsSystemException(404,"subject not found");
                    }
                }

            }else{
                throw new LmsSystemException(404,"batch not found");
            }
        }catch (Exception e){
            throw e;
        }
    }

    @Override
    public List<SubjectDTO> getBatchRelatedSubject(Integer batchId) {
        try{
            List<Subject> batchRelatedSubject = subjectBatchRepository.getBatchRelatedSubject(batchId);
            if(batchRelatedSubject.isEmpty()){
                throw new LmsSystemException(404,"subject not found");
            }
            List<SubjectDTO> subjectDTOList=new ArrayList<>();
            for (Subject subject:batchRelatedSubject){
               if(subject.getSubjectStatus().equals(SubjectStatus.ACTIVE)){
                   subjectDTOList.add(new SubjectDTO(subject.getSubjectId(),subject.getSubjectName()));
               }
            }
            return subjectDTOList;
        }catch (Exception e){
            throw e;
        }
    }

    @Override
    public List<GetSubjectRelatedBatchDetailDTO> getSubjectRelatedBatchDetail(Integer subjectId) {
       try{
         return  subjectBatchRepository.getAllSubjectRelatedBatchDetails(subjectId);
       }catch (Exception e){
           throw e;
       }

    }

    @Override
    public GetLogginTeacherSubjectDTO getLoggingTeacherSubject(Integer subjectId) {
      try{
         return subjectBatchRepository.getLoggedTeacherSubject(subjectId);
      }catch (Exception e){
          throw e;
      }
    }


}

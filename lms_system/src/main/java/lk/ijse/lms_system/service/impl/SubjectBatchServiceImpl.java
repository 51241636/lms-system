package lk.ijse.lms_system.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.lms_system.dto.SubjectBatchDTO;
import lk.ijse.lms_system.entity.ClassBatch;
import lk.ijse.lms_system.entity.Subject;
import lk.ijse.lms_system.entity.SubjectBatch;
import lk.ijse.lms_system.exception.LmsSystemException;
import lk.ijse.lms_system.repository.BatchRepository;
import lk.ijse.lms_system.repository.SubjectBatchRepository;
import lk.ijse.lms_system.repository.SubjectRepository;
import lk.ijse.lms_system.service.SubjectBatchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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


}

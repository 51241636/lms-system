package lk.ijse.lms_system.service.impl;

import lk.ijse.lms_system.dto.ClassBatchDTO;
import lk.ijse.lms_system.dto.StudentDTO;
import lk.ijse.lms_system.dto.response.StudentDetailDTO;
import lk.ijse.lms_system.entity.ClassBatch;
import lk.ijse.lms_system.entity.Student;
import lk.ijse.lms_system.exception.LmsSystemException;
import lk.ijse.lms_system.repository.BatchRepository;
import lk.ijse.lms_system.service.BatchService;
import lk.ijse.lms_system.status.ClassBatchStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class BatchServiceImpl implements BatchService {
    private final BatchRepository batchRepository;
    private final ModelMapper modelMapper;
    @Override
    public void addBatch(ClassBatchDTO classBatchDTO) {
        try{
            ClassBatch classBatch = new ClassBatch();
            classBatch.setBatchName(classBatchDTO.getClassBatchName());
            classBatch.setBatchStartDate(classBatchDTO.getClassBatchStartDate());
            classBatch.setBatchStatus(ClassBatchStatus.ACTIVE);
            batchRepository.save(classBatch);
            log.info("Batch added successfully");
        }catch(Exception e){
            throw e;
        }
    }

    @Override
    public void updateBatch(ClassBatchDTO classBatchDTO) {
        try{
            Optional<ClassBatch> classBatchOptional = batchRepository.findById(classBatchDTO.getClassBatchId());
            if(classBatchOptional.isPresent()){
                ClassBatch classBatch = classBatchOptional.get();
                classBatch.setBatchName(classBatchDTO.getClassBatchName());
                classBatch.setBatchStartDate(classBatchDTO.getClassBatchStartDate());
                classBatch.setBatchStatus(ClassBatchStatus.ACTIVE);
                batchRepository.save(classBatch);
            }else {
                throw new LmsSystemException(404,"Batch not found");
            }
        }catch(Exception e){
            throw e;
        }
    }

    @Override
    public void deleteBatch(Long classBathId) {
        batchRepository.findById(classBathId).ifPresent(batch -> {
            batch.setBatchStatus(ClassBatchStatus.INACTIVE);
            batchRepository.save(batch);
        });
    }

    @Override
    public List<ClassBatchDTO> getAllBatches() {
        List<ClassBatchDTO> classBatchDTOList = new ArrayList<>();
        batchRepository.findAll().forEach(batch -> {
            classBatchDTOList.add(new ClassBatchDTO(batch.getClassBatchId(),batch.getBatchName(),batch.getBatchStartDate()));
        });
        return classBatchDTOList;
    }

    @Override
    public List<StudentDetailDTO> getAllBatchRelatedStudents(long classBathId) {
        try{
            Optional<ClassBatch> classBatchOptional = batchRepository.findById(classBathId);
            List<StudentDetailDTO> studentDTOList = new ArrayList<>();
            if(classBatchOptional.isPresent()){
                ClassBatch classBatch = classBatchOptional.get();
                for(Student student:classBatch.getStudentList()){
                    studentDTOList.add(new StudentDetailDTO(student.getStudentId(),student.getStudentName(),student.getStudentUsername(),student.getEmail(),student.getContact(),student.getAddress()));
                }
                return studentDTOList;
            }else {
                throw new LmsSystemException(404,"Batch not found");
            }


        } catch (Exception e) {
            throw e;
        }
    }


    //    after teacher login when click subject then get teacher related batch list using subjectId
    @Override
    public List<ClassBatchDTO> getAllTeacherRelatedBatches(Integer subjectId) {
        List<ClassBatch> teacherRelatedClassBatches = batchRepository.teacherRelatedBatches(subjectId);
        List<ClassBatchDTO> classBatchDTOList = new ArrayList<>();
        for(ClassBatch classBatch:teacherRelatedClassBatches){
            classBatchDTOList.add(modelMapper.map(classBatch,ClassBatchDTO.class));
        }
        return classBatchDTOList;
    }
}

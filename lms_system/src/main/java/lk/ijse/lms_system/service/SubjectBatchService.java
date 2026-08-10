package lk.ijse.lms_system.service;

import lk.ijse.lms_system.dto.SubjectBatchDTO;
import lk.ijse.lms_system.dto.SubjectDTO;

import java.util.List;

public interface SubjectBatchService {
    void addSubjectBatch(SubjectBatchDTO subjectBatchDTO);
    void updateSubjectBatch(SubjectBatchDTO subjectBatchDTO);
    void deleteSubjectBatch(Long subjectBatchId);
//    List<SubjectDTO> getAllSubjectsBatch();
//    List<SubjectDTO> searchSubjectByName(String subjectName);
}

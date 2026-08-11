package lk.ijse.lms_system.service;

import lk.ijse.lms_system.dto.ClassBatchDTO;
import lk.ijse.lms_system.dto.StudentDTO;
import lk.ijse.lms_system.dto.response.StudentDetailDTO;
import lk.ijse.lms_system.dto.response.TeacherBatchDTO;

import java.util.List;

public interface BatchService {
    void addBatch(ClassBatchDTO classBatchDTO);
    void updateBatch(ClassBatchDTO classBatchDTO);
    void deleteBatch(Long classBathId);
    List<ClassBatchDTO> getAllBatches();
    List<StudentDetailDTO> getAllBatchRelatedStudents(long classBathId);
    List<TeacherBatchDTO> getAllTeacherRelatedBatches(Integer subjectId);
}

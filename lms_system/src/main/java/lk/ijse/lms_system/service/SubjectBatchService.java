package lk.ijse.lms_system.service;

import lk.ijse.lms_system.dto.ClassBatchDTO;
import lk.ijse.lms_system.dto.SubjectBatchDTO;
import lk.ijse.lms_system.dto.SubjectDTO;
import lk.ijse.lms_system.dto.response.GetLogginTeacherSubjectDTO;
import lk.ijse.lms_system.dto.response.GetSubjectRelatedBatchDetailDTO;
import lk.ijse.lms_system.entity.Subject;

import java.util.List;

public interface SubjectBatchService {
    void addSubjectBatch(SubjectBatchDTO subjectBatchDTO);
    List<SubjectDTO> getBatchRelatedSubject(Integer batchId);
    List<GetSubjectRelatedBatchDetailDTO> getSubjectRelatedBatchDetail(Integer subjectId);
    GetLogginTeacherSubjectDTO getLoggingTeacherSubject(Integer subjectId);
    Long getStudentCountSubjectRelated();

}

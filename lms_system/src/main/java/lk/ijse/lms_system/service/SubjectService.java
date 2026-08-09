package lk.ijse.lms_system.service;

import lk.ijse.lms_system.dto.SubjectDTO;
import java.util.List;

public interface SubjectService {
    void addSubject(SubjectDTO subjectDTO);
    void updateSubject(SubjectDTO subjectDTO);
    void deleteSubject(Integer subjectId);
    List<SubjectDTO> getAllSubjects();
    List<SubjectDTO> searchSubjectByName(String subjectName);
}

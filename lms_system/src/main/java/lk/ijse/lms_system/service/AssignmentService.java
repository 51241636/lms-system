package lk.ijse.lms_system.service;

import jakarta.servlet.http.HttpServletResponse;
import lk.ijse.lms_system.dto.AssignmentDTO;
import lk.ijse.lms_system.dto.response.GetLessonAssignmentDetailDTO;
import lk.ijse.lms_system.dto.response.GetLessonPdfDetails;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

public interface AssignmentService {

    void addAssignment(AssignmentDTO assignmentDTO)throws IOException;
    List<GetLessonAssignmentDetailDTO> getAssignmentByLessonId(Integer lessonId);
    Resource downloadSelectedAssignment(Long assignmentId, HttpServletResponse response) throws MalformedURLException;
    void updateLessonAssignment(AssignmentDTO assignmentDTO) throws IOException;
    void deleteLessonAssignment(Long assignmentId);
    GetLessonAssignmentDetailDTO getAssignmentById(Long assignmentId);

}

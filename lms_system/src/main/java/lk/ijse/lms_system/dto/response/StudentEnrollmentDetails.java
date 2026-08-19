package lk.ijse.lms_system.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


public interface StudentEnrollmentDetails {
    Long getStudentId();

    String getSubjectName();

    String getBatchName();

    Long getSubjectClassId();

    Long getLessonCount();
}

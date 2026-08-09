package lk.ijse.lms_system.repository;

import lk.ijse.lms_system.entity.StudentEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentEnrollmentRepository  extends JpaRepository<StudentEnrollment,Long> {
}

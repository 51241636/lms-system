package lk.ijse.lms_system.repository;

import lk.ijse.lms_system.entity.Student;
import lk.ijse.lms_system.entity.StudentEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentEnrollmentRepository  extends JpaRepository<StudentEnrollment,Long> {


}

package lk.ijse.lms_system.repository;

import lk.ijse.lms_system.entity.ClassBatch;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BatchRepository extends JpaRepository<ClassBatch,Long> {
}

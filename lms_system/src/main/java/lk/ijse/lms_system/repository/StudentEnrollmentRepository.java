package lk.ijse.lms_system.repository;

import lk.ijse.lms_system.dto.response.StudentEnrollmentDetails;
import lk.ijse.lms_system.entity.Student;
import lk.ijse.lms_system.entity.StudentEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentEnrollmentRepository  extends JpaRepository<StudentEnrollment,Long> {


    @Query(value = "select student_enrollment.student_student_id AS studentId,subject.subject_name AS subjectName ,class_batch.batch_name AS batchName,subject_batch.subject_class_id AS subjectClassId,count(lesson.lesson_id)AS lessonCount from student_enrollment " +
            "JOIN subject ON student_enrollment.subject_subject_id=subject.subject_id " +
            "JOIN  student ON student.student_id =student_enrollment.student_student_id\n" +
            "JOIN class_batch on class_batch.class_batch_id=student.class_batch_id  JOIN" +
            " subject_batch ON subject_batch.subject_id=subject.subject_id AND subject_batch.class_batch_id=class_batch.class_batch_id " +
            "LEFT JOIN lesson ON subject_batch.subject_class_id=lesson.subject_batch_id " +
            "WHERE student_enrollment.student_student_id=?1 AND student.class_batch_id=?2 " +
            "group by  student_enrollment.student_student_id,\n" +
            "    subject.subject_name,\n" +
            "    class_batch.batch_name,\n" +
            "    subject_batch.subject_class_id",nativeQuery = true)
    List<StudentEnrollmentDetails> findSubjectByStudentId(Long studentId, Long batchId);


}

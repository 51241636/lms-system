package lk.ijse.lms_system.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
        name = "student_enrollment",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"student_student_id", "subject_subject_id"}
                )
        }
)
public class StudentEnrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long enrollmentId;
    @ManyToOne
    private Student student;
    @ManyToOne
    private Subject subject;
}

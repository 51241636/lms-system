package lk.ijse.lms_system.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
        name = "subject_batch",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"subject_id", "class_batch_id"}
                )
        }
)
public class SubjectBatch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subjectClassId;
    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;
    @ManyToOne
    @JoinColumn(name = "class_batch_id")
    private ClassBatch classBatch;
    @OneToMany(mappedBy = "subjectBatch",cascade = CascadeType.ALL)
    private List<Lesson> lessonList;
}

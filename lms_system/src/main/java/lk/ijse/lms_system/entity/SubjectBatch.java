package lk.ijse.lms_system.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class SubjectBatch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subjectClassId;
    @ManyToOne
    @JoinColumn(name = "subjectId")
    private Subject subject;
    @ManyToOne
    @JoinColumn(name = "classBatchId")
    private ClassBatch classBatch;
}

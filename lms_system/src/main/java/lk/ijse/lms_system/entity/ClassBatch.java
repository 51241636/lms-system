package lk.ijse.lms_system.entity;

import jakarta.persistence.*;
import lk.ijse.lms_system.status.ClassBatchStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ClassBatch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long classBatchId;
    @Column(unique = true, nullable = false)
    private String batchName;
    @Column(nullable = false)
    private String batchDescription;
    @Enumerated(EnumType.STRING)
    private ClassBatchStatus batchStatus;
    @OneToMany(mappedBy = "classBatch",cascade = CascadeType.ALL)
    private List<SubjectBatches> subjectBatchesList;
}

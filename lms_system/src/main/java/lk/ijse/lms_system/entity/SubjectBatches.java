package lk.ijse.lms_system.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.engine.jdbc.batch.spi.Batch;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class SubjectBatches {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subjectBatchesId;
    @ManyToOne
    @JoinColumn(name = "subjectId")
    private Subject subject;
    @ManyToOne
    @JoinColumn(name = "classBatchId")
    private ClassBatch classBatch;
}

package lk.ijse.lms_system.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer lessonNumber;
    private String lessonTitle;
    private String lessonDescription;
    private LocalDate lessonCreateDate;
    @ManyToOne
    @JoinColumn(name = "classBatchId")
    private ClassBatch classBatch;



}

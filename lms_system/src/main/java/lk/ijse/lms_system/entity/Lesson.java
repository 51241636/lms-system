package lk.ijse.lms_system.entity;

import jakarta.persistence.*;
import lk.ijse.lms_system.status.LessonStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Integer lessonNumber;
    @Column(nullable = false)
    private String lessonTitle;
    @Column(nullable = false)
    private String lessonDescription;
    @Column(nullable = false)
    private LocalDate lessonCreateDate;
    @ManyToOne
    @JoinColumn(name = "classBatchId")
    private ClassBatch classBatch;
    @OneToMany(mappedBy = "lesson",cascade = CascadeType.ALL)
    private List<LessonContent> lessonContentList;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LessonStatus lessonStatus;



}

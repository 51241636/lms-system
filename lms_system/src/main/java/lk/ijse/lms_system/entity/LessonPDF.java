package lk.ijse.lms_system.entity;

import jakarta.persistence.*;
import lk.ijse.lms_system.status.LessonContentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class LessonPDF {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer lessonFileId;
    @Column(nullable = false)
    private String fileName;
    @Column(nullable = false)
    private String filePath;
    @Column(nullable = false)
    private String fileContentType;
    @Column(nullable = false)
    private Long fileSize;
    @ManyToOne
    private Lesson lesson;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LessonContentStatus lessonContentStatus;
}

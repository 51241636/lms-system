package lk.ijse.lms_system.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class LessonContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lessonContentId;
    private String title;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] lessonFiles;
    @ManyToOne
    private Lesson lesson;
}

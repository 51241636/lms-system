package lk.ijse.lms_system.entity;

import jakarta.persistence.*;
import lk.ijse.lms_system.status.AssignmentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assignmentId;
    @Column(nullable = false)
    private String assignmentName;
    @Column(nullable = false)
    private String assignmentDescription;
    @Column(nullable = false)
    private String fileName;
    @Column(nullable = false)
    private String filePath;
    @Column(nullable = false)
    private String fileContentType;
    @Column(nullable = false)
    private Long fileSize;
    @Column(nullable = false)
    private LocalDate  startDate;
    @Column(nullable = false)
    private LocalDate deadline;
    private Double maximumMarks;
    private Double score;
    @ManyToOne
    private Lesson  lesson;
    @OneToMany(mappedBy = "assignment",cascade = CascadeType.ALL)
    private List<AssignmentSubmission> assignmentSubmissionList;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssignmentStatus assignmentStatus;

}

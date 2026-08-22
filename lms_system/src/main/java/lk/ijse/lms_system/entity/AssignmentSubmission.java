package lk.ijse.lms_system.entity;

import jakarta.persistence.*;
import lk.ijse.lms_system.status.AssignmentSubmissionStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AssignmentSubmission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String fileName;
    @Column(nullable = false)
    private String filePath;
    @Column(nullable = false)
    private String fileContentType;
    @Column(nullable = false)
    private Long fileSize;
    @Column(nullable = false)
    private LocalDate submissionDate;
    @ManyToOne
    @JoinColumn(name = "assignment_id")
    private Assignment assignment;
    @ManyToOne
    @JoinColumn(name = "studentId")
    private Student student;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssignmentSubmissionStatus assignmentSubmissionStatus;
}

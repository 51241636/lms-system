package lk.ijse.lms_system.entity;

import jakarta.persistence.*;
import lk.ijse.lms_system.status.ClassBatchStatus;
import lk.ijse.lms_system.status.SubjectStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer subjectId;
    @Column(unique = true, nullable = false )
    private String subjectName;
    @OneToMany(mappedBy = "subject",cascade = CascadeType.ALL)
    private List<User> users;
    @OneToMany(mappedBy = "subject",cascade = CascadeType.ALL)
    private List<StudentEnrollment> studentEnrollments;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private SubjectStatus subjectStatus;
    @OneToMany(mappedBy = "subject",cascade = CascadeType.ALL)
    private List<SubjectBatches> subjectBatchesList;

}

package lk.ijse.lms_system.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lk.ijse.lms_system.status.StudentStatus;
import lk.ijse.lms_system.status.SubjectStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentId;
    @Column(nullable = false,length = 50)
    private String studentName;
    @Column(unique = true,nullable = false,length = 50)
    private String studentUsername;
    @Column(length = 50,nullable = false)
    private String studentPassword;
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
    @Column(unique = true, nullable = false)
    private String email;
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "student")
    private List<AssignmentSubmission>  assignmentSubmissions;
    @Pattern(
            regexp = "^07[0-9]{8}$",
            message = "Invalid Sri Lankan contact number"
    )
    @Column(unique = true, nullable = false)
    private String contact;
    @Column(length = 100, nullable = false)
    private String address;
    @OneToMany(mappedBy = "student",cascade = CascadeType.ALL)
    private List<StudentEnrollment> studentEnrollments;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private StudentStatus studentStatus;
}

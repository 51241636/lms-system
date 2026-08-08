package lk.ijse.lms_system.entity;

import jakarta.persistence.*;
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
    private String studentName;
    private String studentUsername;
    private String studentPassword;
    private String email;
    private String contact;
    private String address;
    @OneToMany(mappedBy = "student",cascade = CascadeType.ALL)
    private List<StudentEnrollment> studentEnrollments;
}

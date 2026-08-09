package lk.ijse.lms_system.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lk.ijse.lms_system.status.UserRole;
import lk.ijse.lms_system.status.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    @Column(unique = true,nullable = false,length = 50)
    private String username;
    @Column(nullable = false)
    private String password;
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
    private String email;
    @Pattern(
            regexp = "^07[0-9]{8}$",
            message = "Invalid Sri Lankan contact number"
    )
    private String contact;
    @ManyToOne
    @JoinColumn(name = "subjectId")
    private Subject subject;
    @Column(nullable = false)
    private String role;
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Notification> notificationList;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserStatus status;

}

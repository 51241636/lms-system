package lk.ijse.lms_system.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;
    @Column(unique = true,nullable = false,length = 50)
    private String username;
    @Column(length = 50,nullable = false)
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
    @JoinColumn(name = "userId")
    private Subject subject;

}

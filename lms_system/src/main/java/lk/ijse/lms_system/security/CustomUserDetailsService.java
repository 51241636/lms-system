package lk.ijse.lms_system.security;

import lk.ijse.lms_system.entity.Student;
import lk.ijse.lms_system.entity.User;
import lk.ijse.lms_system.exception.LmsSystemException;
import lk.ijse.lms_system.repository.StudentRepository;
import lk.ijse.lms_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try{
            Optional<User> optionalUser = userRepository.findByUsername(username);
            if(optionalUser.isEmpty()){
                Optional<Student> optionalStudent = studentRepository.findByStudentUsername(username);
                if(optionalStudent.isEmpty()){
                    throw new LmsSystemException(404,"User Not Found");
                }
                return org.springframework.security.core.userdetails.User.builder()
                        .username(optionalStudent.get().getStudentUsername())
                        .password(optionalStudent.get().getStudentPassword())
                        .roles("STUDENT")
                        .build();


            }else{
                String userRolesStr=optionalUser.get().getRole();
                String[] roles=new String[0];
                if(userRolesStr!= null && !userRolesStr.trim().isEmpty()){
                    roles = Arrays.stream(userRolesStr.split(",")).map(String::trim).map(role -> role.startsWith("ROLE_") ? role.substring(5) : role).filter(role -> !role.isEmpty()).toArray(String[]::new);
                }
                return org.springframework.security.core.userdetails.User.builder()
                        .username(optionalUser.get().getUsername())
                        .password(optionalUser.get().getPassword())
                        .roles(roles )
                        .build();
            }


        }
        catch(Exception e){
            throw e;
        }
    }
}

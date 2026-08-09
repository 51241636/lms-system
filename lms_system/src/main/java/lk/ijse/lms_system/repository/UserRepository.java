package lk.ijse.lms_system.repository;

import lk.ijse.lms_system.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByUsername(String username);

//    customer query for filter user
    @Query(value = "SELECT u FROM User u WHERE (:userName IS NULL OR u.username = :userName)OR (:subjectName IS NULL OR u.subject.subjectName = :subjectName)OR (:contact IS null OR u.contact = :contact)")
    List<User> searchUser(@Param("userName") String username, @Param("subjectName") String subject, @Param("contactNumber") String userPhone);
}

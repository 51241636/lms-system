package lk.ijse.lms_system.service;

import lk.ijse.lms_system.dto.UserDTO;
import lk.ijse.lms_system.dto.UserLoginDTO;
import lk.ijse.lms_system.dto.response.GetUserDetailsDTO;

import java.util.List;

public interface UserService {
    void saveUser(UserDTO userDTO);
    UserDTO getLoginUser(UserLoginDTO userLoginDTO);
    void updateUser(UserDTO userDTO);
    void deleteUser(Long userId);
    List<GetUserDetailsDTO> getAllUsers();
    List<GetUserDetailsDTO> searchUsersByNameSubjectNameContact(String userName,String userEmail,String userPhone);
}

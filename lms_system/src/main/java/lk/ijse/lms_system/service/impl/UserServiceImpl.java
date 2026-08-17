package lk.ijse.lms_system.service.impl;

import lk.ijse.lms_system.dto.UserDTO;
import lk.ijse.lms_system.dto.UserLoginDTO;
import lk.ijse.lms_system.dto.response.GetUserDetailsDTO;
import lk.ijse.lms_system.entity.Subject;
import lk.ijse.lms_system.entity.User;
import lk.ijse.lms_system.exception.LmsSystemException;
import lk.ijse.lms_system.repository.SubjectRepository;
import lk.ijse.lms_system.repository.UserRepository;
import lk.ijse.lms_system.service.UserService;
import lk.ijse.lms_system.status.SubjectStatus;
import lk.ijse.lms_system.status.UserStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final SubjectRepository subjectRepository;


//    register new User
    @Override
    public void saveUser(UserDTO userDTO) {
        try{
            Optional<Subject> subjectById = subjectRepository.findById(userDTO.getSubjetId());
            System.out.print(subjectById.get().getSubjectName());
            if(subjectById.isPresent() && subjectById.get().getSubjectStatus() == SubjectStatus.ACTIVE){
                User user=new User();
                user.setUsername(userDTO.getUsername());
                user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
                user.setEmail(userDTO.getEmail());
                user.setContact(userDTO.getContact());
                user.setRole(userDTO.getUserRole());
                user.setSubject(subjectById.get());
                user.setStatus(UserStatus.ACTIVE);
                userRepository.save(user);
            }else {
                throw new LmsSystemException(404,"Subject not found");
            }

        }catch (Exception e){
            throw e;
        }
    }

//    get login User Details
    @Override
    public UserDTO getLoginUser(UserLoginDTO userLoginDTO) {
        try {
            Optional<User> byUsername = userRepository.findByUsername(userLoginDTO.getUserName());
            if(byUsername.isPresent()){
                User user = byUsername.get();
                if(!passwordEncoder.matches(userLoginDTO.getPassword(),user.getPassword())){
                    throw new LmsSystemException(404,"student password is wrong");
                }
                return new UserDTO(user.getUserId(),user.getUsername(),user.getPassword(),user.getEmail(),user.getContact(),user.getRole(),user.getSubject().getSubjectId());

            }else {
                throw new LmsSystemException(404,"Username not found");
            }

        }catch (Exception e){
            throw e;
        }
    }


//    update user details
    @Override
    public void updateUser(UserDTO userDTO) {
        try{
            Optional<User> byId = userRepository.findById(userDTO.getUserId());
            log.info("find user ");
            if(byId.isPresent()){
                User user = byId.get();
                user.setUsername(userDTO.getUsername());
                if(userDTO.getPassword()!=null){
                    user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
                }

                user.setEmail(userDTO.getEmail());
                user.setContact(userDTO.getContact());
                user.setRole(userDTO.getUserRole());
                Optional<Subject> subjectById = subjectRepository.findById(userDTO.getSubjetId());
                if(subjectById.isPresent() && subjectById.get().getSubjectStatus() == SubjectStatus.ACTIVE){
                    log.info("find user related subject");
                    user.setSubject(subjectById.get());
                    user.setStatus(UserStatus.ACTIVE);
                    userRepository.save(user);
                    log.info("user updated");
                }else {
                    throw new LmsSystemException(404,"subject not found");
                }




            }else {
                throw new LmsSystemException(404,"User not found");
            }

        }catch (Exception e){
            throw e;
        }
    }


//   delete user
    @Override
    public void deleteUser(Long userId) {
        try{
            Optional<User> byId = userRepository.findById(userId);
            log.info("find delete user ");
            if(byId.isPresent()){
                User user = byId.get();
                user.setStatus(UserStatus.INACTIVE);
                userRepository.save(user);
                log.info("user deleted");
            }else {
                throw new LmsSystemException(404,"user not found");
            }

        }catch (Exception e){
            throw e;
        }

    }


//   get all users
    @Override
    public List<GetUserDetailsDTO> getAllUsers() {
        try {
            List<User> allUser = userRepository.findAll();
            List<GetUserDetailsDTO> getUserDetailsDTO = new ArrayList<>();
            if (allUser.isEmpty()){
                throw new LmsSystemException(404,"Registered Users are  not found");
            }
            for (User user : allUser) {
                if(user.getStatus() == UserStatus.ACTIVE){
                    getUserDetailsDTO.add(new GetUserDetailsDTO(user.getUserId(),user.getUsername(),user.getEmail(),user.getContact(),user.getRole(),user.getSubject().getSubjectId(),user.getSubject().getSubjectName(),user.getStatus().toString()));
                }

            }
            log.info("add all users to the list");
            return getUserDetailsDTO;

        }catch (Exception e){
            throw e;
        }
    }

//    filter Users
    @Override
    public List<GetUserDetailsDTO> searchUsersByNameSubjectNameContact(String userName,String subjectName,String userPhone) {
        try {
            List<User> filteredUsers = userRepository.searchUser(userName, subjectName, userPhone);
            List<GetUserDetailsDTO> getFilteredUserDetailsDTO = new ArrayList<>();
            if (filteredUsers.isEmpty()){
                throw new LmsSystemException(404,"Registered Users are  not found");
            }
            for (User user : filteredUsers) {
                if(user.getStatus() == UserStatus.ACTIVE){
                    getFilteredUserDetailsDTO.add(new GetUserDetailsDTO(user.getUserId(),user.getUsername(),user.getEmail(),user.getContact(),user.getRole(),user.getSubject().getSubjectId(),user.getSubject().getSubjectName(),user.getStatus().toString()));
                }

            }
            log.info("add all filtered users to the list");
            return getFilteredUserDetailsDTO;

        }catch (Exception e){
            throw e;
        }

    }

    @Override
    public UserDTO getUserByUserId(Long userId) {
        try{
            Optional<User> userById = userRepository.findById(userId);
            if(userById.isEmpty()){
                throw new LmsSystemException(404,"user is not found");
            }
            User user = userById.get();
            return new UserDTO(user.getUserId(),user.getUsername(),user.getEmail(),user.getContact(),user.getRole(),user.getSubject().getSubjectId());
        }catch (Exception e){
            throw e;
        }
    }


}

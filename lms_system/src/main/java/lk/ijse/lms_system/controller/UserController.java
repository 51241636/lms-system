package lk.ijse.lms_system.controller;


import jakarta.validation.Valid;
import lk.ijse.lms_system.constant.CommonResponse;
import lk.ijse.lms_system.dto.UserDTO;
import lk.ijse.lms_system.dto.UserLoginDTO;
import lk.ijse.lms_system.dto.response.GetUserDetailsDTO;
import lk.ijse.lms_system.dto.response.UserDataDTO;
import lk.ijse.lms_system.security.JWTUtil;
import lk.ijse.lms_system.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static lk.ijse.lms_system.constant.ResponseCode.OPERATION_SUCCSESS;
import static lk.ijse.lms_system.constant.ResponseMessage.RESPONSE_MESSAGE;

@RestController
@RequestMapping(value = "v1/user")
@AllArgsConstructor
@Slf4j
@CrossOrigin
public class UserController {
    private UserService userService;
    private final JWTUtil jwtUtil;

//    register User
    @PostMapping(value = "/registerUser", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse registerUser(@Valid @RequestBody UserDTO userDTO) {
        log.info("get user details");
        userService.saveUser(userDTO);
        log.info("register user");
        return new CommonResponse(OPERATION_SUCCSESS,RESPONSE_MESSAGE);
    }

//    login user and generate token
    @PostMapping(value = "/loginUser",produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse loginUser(@Valid @RequestBody UserLoginDTO userLoginDTO) {
        log.info("get username and password");
        UserDTO loginUser = userService.getLoginUser(userLoginDTO);
        log.info("get entered user userDetails");
        String token = jwtUtil.generatedToken(loginUser.getUserId(), loginUser.getUserRole(), loginUser.getUsername());
        log.info("get entered user token");
        return new CommonResponse(OPERATION_SUCCSESS,new UserDataDTO(loginUser.getUserId(),token),RESPONSE_MESSAGE);
    }

//     update User
    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse updateUser(@Valid @RequestBody UserDTO userDTO) {
        log.info("get update user details");
        userService.updateUser(userDTO);
        log.info("update user");
        return new CommonResponse(OPERATION_SUCCSESS,RESPONSE_MESSAGE);
    }

//    delete User
    @DeleteMapping(value = "/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse deleteUser(@PathVariable Long userId) {
        log.info("get user id for delete user");
        userService.deleteUser(userId);
        log.info("deleted user");
        return new CommonResponse(OPERATION_SUCCSESS,RESPONSE_MESSAGE);
    }

//    get all registered users
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getAllUsers() {
        log.info("get all users");
        List<GetUserDetailsDTO> allUsers = userService.getAllUsers();
        return new CommonResponse(OPERATION_SUCCSESS,allUsers,RESPONSE_MESSAGE);
    }
//   search users by username subject or contact number
    @GetMapping(value ="/filterUser",produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse filterUsers(@RequestParam(value = "userName",required = false)String userName,@RequestParam(value = "subjectName",required = false)String subjectName,@RequestParam(value = "contact",required = false)String contact){
        List<GetUserDetailsDTO> getUserDetailsDTOS = userService.searchUsersByNameSubjectNameContact(userName, subjectName, contact);
        return new CommonResponse(OPERATION_SUCCSESS,getUserDetailsDTOS,RESPONSE_MESSAGE);
    }



}

package com.spend_wise.controllers;

import com.spend_wise.domain.User;
import com.spend_wise.dto.UserResponse;
import com.spend_wise.dto.UserSignInRequest;
import com.spend_wise.dto.UserSignUpRequest;
import com.spend_wise.mapper.UserMapper;
import com.spend_wise.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> signUp(@RequestBody UserSignUpRequest request) {
        User user = userService.signUp(
                request.getEmail(),
                request.getPassword(),
                request.getFirstName(),
                request.getLastName()
        );

        return ResponseEntity.ok(userMapper.toResponse(user));
    }

    @PostMapping("/signin")
    public ResponseEntity<UserResponse> signIn(@RequestBody UserSignInRequest request) {
        User user = userService.signIn(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(userMapper.toResponse(user));
    }
}

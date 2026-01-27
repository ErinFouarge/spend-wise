package com.spend_wise.controllers;

import com.spend_wise.dto.UserResponse;
import com.spend_wise.dto.UserSignInRequest;
import com.spend_wise.dto.UserSignUpRequest;
import com.spend_wise.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> signUp(@RequestBody UserSignUpRequest request) {
        return ResponseEntity.ok(
                userService.signUp(
                        request.getEmail(),
                        request.getPassword(),
                        request.getFirstName(),
                        request.getLastName()
                )
        );
    }

    @PostMapping("/signin")
    public ResponseEntity<UserResponse> signIn(@RequestBody UserSignInRequest request) {
        return ResponseEntity.ok(
                userService.signIn(
                        request.getEmail(),
                        request.getPassword()
                )
        );
    }
}

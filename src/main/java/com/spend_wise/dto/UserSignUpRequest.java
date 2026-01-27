package com.spend_wise.dto;

import lombok.Data;

@Data
public class UserSignUpRequest {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
}

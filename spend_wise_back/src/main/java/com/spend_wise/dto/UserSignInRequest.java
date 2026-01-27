package com.spend_wise.dto;

import lombok.Data;

@Data
public class UserSignInRequest {
    private String email;
    private String password;
}

package com.spend_wise.exception;

public class EmailAlreadyUsedException extends BadRequestException {
    public EmailAlreadyUsedException(String email) {
        super("Email already in use: " + email);
    }
}

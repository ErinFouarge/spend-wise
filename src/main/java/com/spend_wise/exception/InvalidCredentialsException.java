package com.spend_wise.exception;

public class InvalidCredentialsException extends UnauthorizedException {
    public InvalidCredentialsException() {
        super("L'adresse e-mail ou le mot de passe est incorrect.");
    }
}

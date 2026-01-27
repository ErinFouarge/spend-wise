package com.spend_wise.services;

import com.spend_wise.domain.User;
import com.spend_wise.exception.InvalidCredentialsException;
import com.spend_wise.mapper.UserMapper;
import com.spend_wise.dto.UserResponse;
import com.spend_wise.exception.EmailAlreadyUsedException;
import com.spend_wise.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userMapper = userMapper;
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public UserResponse signUp(String email, String password, String firstName, String lastName) throws EmailAlreadyUsedException {
        if (userRepository.existsByEmail(email)) {
            throw new EmailAlreadyUsedException(email);
        }

        User user = User.builder()
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .password(passwordEncoder.encode(password))
                .createdAt(Instant.now())
                .token(UUID.randomUUID().toString())
                .build();

        userRepository.save(user);

        return userMapper.toResponse(user);
    }

    public UserResponse signIn(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(InvalidCredentialsException::new);

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new InvalidCredentialsException();
        }

        return userMapper.toResponse(user);
    }

}

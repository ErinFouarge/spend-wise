package com.spend_wise.mapper;

import com.spend_wise.domain.User;
import com.spend_wise.dto.UserResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toResponse(User user);
}

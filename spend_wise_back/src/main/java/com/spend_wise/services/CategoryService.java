package com.spend_wise.services;

import com.spend_wise.domain.Category;
import com.spend_wise.domain.User;
import com.spend_wise.repositories.CategoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final UserService userService;

    public CategoryService(CategoryRepository categoryRepository, UserService userService) {
        this.categoryRepository = categoryRepository;
        this.userService = userService;
    }

    public List<Category> getAllByUser(String userId) {
        User user = userService.getById(userId);
        return categoryRepository.findAllByUser(user);
    }

    public Category getByNameAndUser(String name, String color, User user) {
        Category category = categoryRepository.findByNameAndUser(name, user);
        if (category == null) {
            category = this.create(name, color, user);
        }
        return category;
    }

    public Category create(String name, String color, User user) {
        Category category = Category.builder()
                .name(name)
                .color(color)
                .user(user)
                .build();
        return categoryRepository.save(category);
    }
}

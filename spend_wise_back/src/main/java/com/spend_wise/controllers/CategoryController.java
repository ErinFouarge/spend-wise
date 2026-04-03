package com.spend_wise.controllers;

import com.spend_wise.domain.Category;
import com.spend_wise.mapper.CategoryMapper;
import com.spend_wise.services.CategoryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    public CategoryController(CategoryService categoryService, CategoryMapper categoryMapper) {
        this.categoryService = categoryService;
        this.categoryMapper = categoryMapper;
    }

    @GetMapping
    public Object getAllCategories(Principal principal) {
        List<Category> category = categoryService.getAllByUser(principal.getName());
        return category.stream().map(categoryMapper::toResponse).toList();
    }
}

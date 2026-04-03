package com.spend_wise.repositories;

import com.spend_wise.domain.Category;
import com.spend_wise.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID>  {
    Category findByNameAndUser(String name, User user);
    List<Category> findAllByUser(User user);
}

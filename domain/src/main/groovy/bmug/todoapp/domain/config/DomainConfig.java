package bmug.todoapp.domain.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import bmug.todoapp.domain.repository.DummyGroceryListItemRepositoryImpl;
import bmug.todoapp.domain.repository.GroceryListItemRepository;

@Configuration
public class DomainConfig {

    @Bean
    public GroceryListItemRepository groceryListItemRepository() {
        return new DummyGroceryListItemRepositoryImpl();
    }

}

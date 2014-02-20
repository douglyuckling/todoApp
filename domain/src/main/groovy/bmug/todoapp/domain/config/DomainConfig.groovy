package bmug.todoapp.domain.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import bmug.todoapp.domain.repository.DummyGroceryListItemRepositoryImpl
import bmug.todoapp.domain.repository.GroceryListItemRepository

@Configuration
class DomainConfig {

    @Bean
    GroceryListItemRepository groceryListItemRepository() {
        return new DummyGroceryListItemRepositoryImpl()
    }

}

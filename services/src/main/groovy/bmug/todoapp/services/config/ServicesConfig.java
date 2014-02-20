package bmug.todoapp.services.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import bmug.todoapp.domain.config.DomainConfig;
import bmug.todoapp.services.GroceryListService;
import bmug.todoapp.services.GroceryListServiceImpl;

@Configuration
@Import(DomainConfig.class)
public class ServicesConfig {

    @Bean
    public GroceryListService groceryListService() {
        return new GroceryListServiceImpl();
    }

}

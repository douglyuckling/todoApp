package bmug.todoapp.services.config

import bmug.todoapp.domain.config.DomainConfig
import bmug.todoapp.services.TaskService
import bmug.todoapp.services.TaskServiceImpl
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import

@Configuration
@Import(DomainConfig.class)
class ServicesConfig {

    @Bean
    TaskService taskService() {
        return new TaskServiceImpl()
    }

}

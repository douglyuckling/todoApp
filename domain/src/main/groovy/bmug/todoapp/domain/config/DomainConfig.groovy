package bmug.todoapp.domain.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import bmug.todoapp.domain.repository.DummyTaskRepositoryImpl
import bmug.todoapp.domain.repository.TaskRepository

@Configuration
class DomainConfig {

    @Bean
    TaskRepository taskRepository() {
        return new DummyTaskRepositoryImpl()
    }

}

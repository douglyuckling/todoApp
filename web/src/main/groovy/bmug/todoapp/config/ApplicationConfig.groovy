package bmug.todoapp.config

import bmug.todoapp.services.config.ServicesConfig
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import
import org.springframework.context.annotation.PropertySource
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer

@Configuration
@Import(ServicesConfig.class)
@PropertySource('classpath:bmug/todoapp/internal.application.properties')
class ApplicationConfig {

    @Bean
    static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
        return new PropertySourcesPlaceholderConfigurer()
    }

    // Application-scoped beans go here...

}

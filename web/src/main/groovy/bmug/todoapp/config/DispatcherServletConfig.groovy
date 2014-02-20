package bmug.todoapp.config
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer
import org.springframework.http.converter.HttpMessageConverter
import org.springframework.http.converter.json.MappingJacksonHttpMessageConverter
import org.springframework.web.servlet.ViewResolver
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport
import org.springframework.web.servlet.view.InternalResourceViewResolver

@Configuration
@ComponentScan('bmug.todoapp.web.controller')
class DispatcherServletConfig extends WebMvcConfigurationSupport {

    @Bean
    static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
        return new PropertySourcesPlaceholderConfigurer()
    }

    // Servlet configuration and servlet-scoped beans go here...

    @Override
    void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler('/extjs/**').addResourceLocations('/extjs/')
        registry.addResourceHandler('/**/*.js').addResourceLocations('/')
    }

    @Override
    protected void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(new MappingJacksonHttpMessageConverter())
        super.configureMessageConverters(converters)
    }

    @Bean
    ViewResolver viewResolver() {
        def viewResolver = new InternalResourceViewResolver()
        viewResolver.prefix = '/WEB-INF/jsp/'
        viewResolver.suffix = '.jsp'
        return viewResolver
    }

}

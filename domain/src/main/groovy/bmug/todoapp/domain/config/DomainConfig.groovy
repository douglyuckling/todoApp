package bmug.todoapp.domain.config

import com.mongodb.Mongo
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.MongoDbFactory
import org.springframework.data.mongodb.core.MongoFactoryBean
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.SimpleMongoDbFactory
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories

@Configuration
@EnableMongoRepositories('bmug.todoapp.domain.repository')
class DomainConfig {

    @Value('${application.domain.persistence.mongo.host}')
    private String mongoHost

    @Value('${application.domain.persistence.mongo.port}')
    private int mongoPort

    @Value('${application.domain.persistence.mongo.database}')
    private String mongoDatabase

    @Bean
    MongoFactoryBean mongo() {
        MongoFactoryBean mongo = new MongoFactoryBean()
        mongo.host = mongoHost
        mongo.port = mongoPort
        return mongo
    }

    @Bean
    MongoDbFactory mongoDbFactory(Mongo mongo) throws Exception {
        return new SimpleMongoDbFactory(mongo, mongoDatabase);
    }

    @Bean
    MongoTemplate mongoTemplate() throws Exception {
        return new MongoTemplate(mongoDbFactory());
    }

}

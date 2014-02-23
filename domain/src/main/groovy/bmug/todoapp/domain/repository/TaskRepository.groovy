package bmug.todoapp.domain.repository

import bmug.todoapp.domain.Task
import org.springframework.data.repository.CrudRepository

interface TaskRepository extends CrudRepository<Task, String> {

}

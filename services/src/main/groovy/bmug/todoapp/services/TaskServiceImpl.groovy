package bmug.todoapp.services

import bmug.todoapp.domain.Task
import bmug.todoapp.domain.repository.TaskRepository
import org.springframework.beans.factory.annotation.Autowired

class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository repository

    @Override
    Collection<Task> getTasks() {
        return repository.findAll() as List
    }

    @Override
    Collection<Task> saveTasks(Collection<Task> tasks) {
        tasks.each { it.ensureId() }
        return repository.save(tasks) as List
    }

    @Override
    void deleteTaskById(String taskId) {
        repository.delete(taskId)
    }

}

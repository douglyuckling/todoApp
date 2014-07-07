package bmug.todoapp.services

import bmug.todoapp.domain.Task
import bmug.todoapp.domain.repository.TaskRepository
import org.springframework.beans.factory.annotation.Autowired

class TaskServiceImpl implements TaskService {

    @Autowired
    TaskRepository repository

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
    Task saveTask(Task task) {
        task.ensureId()
        return repository.save(task)
    }

    @Override
    void deleteTaskById(String taskId) {
        repository.delete(taskId)
    }

}

package bmug.todoapp.services

import bmug.todoapp.domain.Task

public interface TaskService {

    Collection<Task> getTasks()

    Collection<Task> saveTasks(Collection<Task> tasks)

    void deleteTaskById(String taskId)

}

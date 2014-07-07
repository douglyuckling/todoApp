package bmug.todoapp.services

import bmug.todoapp.domain.Task

public interface TaskService {

    Collection<Task> getTasks()

    Collection<Task> saveTasks(Collection<Task> tasks)

    Task saveTask(Task task)

    void deleteTaskById(String taskId)

}

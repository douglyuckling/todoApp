package bmug.todoapp.domain.repository

import bmug.todoapp.domain.Task

interface TaskRepository {

    Collection<Task> getTasks()

    Collection<Task> saveTasks(Collection<Task> tasks)

    void deleteTaskById(String taskId)

}

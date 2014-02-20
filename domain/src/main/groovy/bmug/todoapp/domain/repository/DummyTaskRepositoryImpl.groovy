package bmug.todoapp.domain.repository
import bmug.todoapp.domain.Task

class DummyTaskRepositoryImpl implements TaskRepository {

    private Map<String, Task> tasksById = new LinkedHashMap<>()

    DummyTaskRepositoryImpl() {
        storeTask(new Task(summary: 'Take out trash'))
        storeTask(new Task(summary: 'Read about MongoDB'))
        storeTask(new Task(summary: 'Find actual unicorn'))
    }

    @Override
    Collection<Task> getTasks() {
        return new ArrayList<>(tasksById.values())
    }

    @Override
    Collection<Task> saveTasks(Collection<Task> tasks) {
        tasks.each { task ->
            if (!task.id) {
                task.id = UUID.randomUUID().toString()
            }
            storeTask(task)
        }
        return tasks.asImmutable()
    }

    @Override
    void deleteTaskById(String taskId) {
        tasksById.remove(taskId)
    }

    void storeTask(Task task) {
        this.tasksById.put(task.getId(), task)
    }

}

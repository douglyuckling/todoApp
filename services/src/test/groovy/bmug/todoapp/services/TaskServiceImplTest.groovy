package bmug.todoapp.services

import bmug.todoapp.domain.Task
import bmug.todoapp.domain.repository.TaskRepository
import spock.lang.Specification

class TaskServiceImplTest extends Specification {

    TaskRepository mockTaskRepository
    TaskServiceImpl taskService

    def setup() {
        mockTaskRepository = Mock(TaskRepository)

        taskService = new TaskServiceImpl()
        taskService.repository = mockTaskRepository
    }

    def "all tasks can be retrieved"() {
        given:
        mockTaskRepository.findAll() >> [ new Task(id: 'taskA'), new Task(id: 'taskB') ]

        when:
        def tasks = taskService.getTasks()

        then:
        tasks*.id == [ 'taskA', 'taskB' ]
    }

    def "tasks can be saved"() {
        given:
        def taskA = new Task(id: 'taskA')
        def taskB = new Task(id: 'taskB')

        when:
        def savedTasks = taskService.saveTasks([taskA, taskB])

        then:
        mockTaskRepository.save([taskA, taskB]) >> [new Task(id: 'savedTaskA'), new Task(id: 'savedTaskB')]
        savedTasks*.id == [ 'savedTaskA', 'savedTaskB' ]
    }

    def "tasks are ensured to have an ID before being saved"() {
        given:
        def taskA = new Task(summary: 'Task A')
        def taskB = new Task(summary: 'Task B')
        assert (taskA.@id == null) && (taskB.@id == null)
        Iterable<Task> savedTasks = null

        when:
        taskService.saveTasks([taskA, taskB])

        then:
        1 * mockTaskRepository.save({ savedTasks = it })
        savedTasks*.summary == [ 'Task A', 'Task B' ]
        savedTasks.each { task ->
            assert task.@id != null
        }
    }

    def "tasks can be deleted"() {
        when:
        taskService.deleteTaskById('taskId')

        then:
        1 * mockTaskRepository.delete('taskId')
    }

}

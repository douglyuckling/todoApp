package bmug.todoapp.web.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import bmug.todoapp.domain.Task
import bmug.todoapp.services.TaskService

import static org.springframework.web.bind.annotation.RequestMethod.DELETE
import static org.springframework.web.bind.annotation.RequestMethod.GET
import static org.springframework.web.bind.annotation.RequestMethod.POST
import static org.springframework.web.bind.annotation.RequestMethod.PUT

@Controller
@RequestMapping('/data/tasks')
class TasksController {

    @Autowired
    private TaskService taskService

    @RequestMapping(value = ['','/'], method = GET)
    @ResponseBody
    List<Task> getTasks() {
        return new ArrayList<>(taskService.getTasks())
    }

    @RequestMapping(value = ['', '/'], method = POST)
    @ResponseBody
    List<Task> createTasks(@RequestBody List<Task> newTasks) {
        return new ArrayList<>(taskService.saveTasks(newTasks))
    }

    @RequestMapping(value = '/{taskId}', method = PUT)
    @ResponseBody
    List<Task> updateTask(@PathVariable('taskId') String taskId,  @RequestBody List<Task> modifiedTasks) {
        return new ArrayList<>(taskService.saveTasks(modifiedTasks))
    }

    @RequestMapping(value = '/{taskId}', method = DELETE)
    @ResponseBody
    void deleteTask(@PathVariable('taskId') String taskId) {
        taskService.deleteTaskById(taskId)
    }

}

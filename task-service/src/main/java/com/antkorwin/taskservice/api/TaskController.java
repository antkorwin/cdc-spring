package com.antkorwin.taskservice.api;

import com.antkorwin.taskservice.model.Task;
import com.antkorwin.taskservice.service.task.CreateTaskArgument;
import com.antkorwin.taskservice.service.task.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created on 11.09.2018.
 *
 * @author Korovin Anatoliy
 */
@RestController
@RequestMapping("tasks")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Task createTask(@RequestParam String title,
                           @RequestParam int estimate) {

        return taskService.create(CreateTaskArgument.builder()
                                                    .title(title)
                                                    .estimate(estimate)
                                                    .build());
    }

    @GetMapping("/list")
    public List<Task> getAllTask() {
        return taskService.getAll();
    }
}

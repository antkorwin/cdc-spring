package com.antkorwin.taskservice.service.task;

import com.antkorwin.taskservice.model.Task;
import com.antkorwin.taskservice.service.crud.BaseCrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * Created on 04.09.2018.
 *
 * @author Korovin Anatoliy
 */
@Service
public class TaskServiceImpl extends BaseCrudService<Task, CreateTaskArgument, UpdateTaskArgument> implements TaskService {

    @Autowired
    public TaskServiceImpl(@Qualifier("taskRepository") JpaRepository<Task, UUID> repository) {
        super(repository);
    }

    @Override
    protected Task createEntityFromArgument(CreateTaskArgument createTaskArgument) {
        return Task.builder()
                   .title(createTaskArgument.getTitle())
                   .estimate(createTaskArgument.getEstimate())
                   .build();
    }

    @Override
    protected Task updateEntityByArgument(Task task, UpdateTaskArgument updateTaskArgument) {
        task.setTitle(updateTaskArgument.getTitle());
        task.setEstimate(updateTaskArgument.getEstimate());
        return task;
    }
}

package com.antkorwin.taskservice.service.task;

import com.antkorwin.taskservice.model.Task;
import com.antkorwin.taskservice.service.crud.CrudService;

/**
 * Created on 04.09.2018.
 *
 * @author Korovin Anatoliy
 */
public interface TaskService extends CrudService<Task, CreateTaskArgument, UpdateTaskArgument> {
}

package com.antkorwin.taskservice.repository;

import com.antkorwin.taskservice.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

/**
 * Created on 04.09.2018.
 *
 * @author Korovin Anatoliy
 */
public interface TaskRepository extends JpaRepository<Task, UUID> {
}

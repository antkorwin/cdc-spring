package com.antkorwin.taskservice.database;

import com.antkorwin.junit5integrationtestutils.test.runners.meta.annotation.PostgresIntegrationTests;
import com.antkorwin.taskservice.model.Task;
import com.antkorwin.taskservice.service.task.TaskService;
import com.antkorwin.taskservice.service.task.CreateTaskArgument;
import com.antkorwin.taskservice.service.task.UpdateTaskArgument;
import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.core.api.dataset.DataSetFormat;
import com.github.database.rider.core.api.dataset.ExpectedDataSet;
import com.github.database.rider.core.api.exporter.ExportDataSet;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static com.antkorwin.taskservice.utils.TestDataHelper.*;
import static org.assertj.core.api.Assertions.assertThat;

/**
 * Created on 04.09.2018.
 *
 * @author Korovin Anatoliy
 */
@PostgresIntegrationTests
@DataSet(cleanBefore = true, cleanAfter = true)
class TaskServiceIT {

    @Autowired
    private TaskService taskService;

    @Test
    @ExportDataSet(outputName = "target/datasets/task.json", format = DataSetFormat.JSON)
    void generateTestData() {
        taskService.create(CreateTaskArgument.builder()
                                             .title("доделать презентацию")
                                             .estimate(3)
                                             .build());
        taskService.create(CreateTaskArgument.builder()
                                             .title("выложить проект на гитхаб")
                                             .estimate(2)
                                             .build());
        taskService.create(CreateTaskArgument.builder()
                                             .title("вкрутить лампочку")
                                             .estimate(1)
                                             .build());
    }

    @Test
    @DataSet(value = "datasets/task.json", cleanAfter = true, cleanBefore = true)
    void getTask() {
        // Act
        Task task = taskService.get(TASK_ID);
        // Asserts
        assertThat(task).isNotNull()
                        .extracting(Task::getTitle, Task::getEstimate)
                        .contains(TASK_TITLE, TASK_ESTIMATE);
    }

    @Test
    @ExpectedDataSet("datasets/expected_task.json")
    void createTask() {
        taskService.create(CreateTaskArgument.builder()
                                             .title(TASK_TITLE)
                                             .estimate(TASK_ESTIMATE)
                                             .build());
    }

    @Test
    @DataSet(value = "datasets/task.json", cleanAfter = true, cleanBefore = true)
    @ExpectedDataSet("datasets/updated_task.json")
    void updateTask() {
        taskService.update(TASK_ID, UpdateTaskArgument.builder()
                                                      .title("писать круды")
                                                      .estimate(1)
                                                      .build());
    }

    @Test
    @DataSet(value = "datasets/task.json", cleanAfter = true, cleanBefore = true)
    @ExpectedDataSet("datasets/empty.json")
    void deleteTask() {
        taskService.delete(TASK_ID);
    }


}

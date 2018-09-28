package com.antkorwin.taskservice.api;

import com.antkorwin.junit5integrationtestutils.mvc.requester.MvcRequester;
import com.antkorwin.junit5integrationtestutils.test.runners.EnableRestTests;
import com.antkorwin.junit5integrationtestutils.test.runners.meta.annotation.PostgresIntegrationTests;
import com.antkorwin.taskservice.model.Task;
import com.antkorwin.taskservice.utils.TestDataHelper;
import com.fasterxml.jackson.core.type.TypeReference;
import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.core.api.dataset.ExpectedDataSet;
import org.assertj.core.groups.Tuple;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Created on 11.09.2018.
 *
 * @author Korovin Anatoliy
 */
@EnableRestTests
@PostgresIntegrationTests
class TaskControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DataSet(cleanBefore = true, cleanAfter = true)
    @ExpectedDataSet("datasets/expected_task.json")
    void createTask() throws Exception {

        Task task = MvcRequester.on(mockMvc)
                                .to("tasks/create")
                                .withParam("title", TestDataHelper.TASK_TITLE)
                                .withParam("estimate", TestDataHelper.TASK_ESTIMATE)
                                .post()
                                .expectStatus(HttpStatus.CREATED)
                                .returnAs(Task.class);

        assertThat(task).isNotNull()
                        .extracting(Task::getTitle,
                                    Task::getEstimate)
                        .contains(TestDataHelper.TASK_TITLE,
                                  TestDataHelper.TASK_ESTIMATE);
    }

    @Test
    @DataSet(value = "datasets/task.json", cleanBefore = true, cleanAfter = true)
    void getAllTasks() throws Exception {
        // Arrange
        // Act
        List<Task> tasks = MvcRequester.on(mockMvc)
                                       .to("tasks/list")
                                       .get()
                                       .doReturn(new TypeReference<List<Task>>() {
                                       });
        // Assert
        assertThat(tasks).isNotNull()
                         .hasSize(1)
                         .extracting(Task::getTitle, Task::getEstimate)
                         .contains(Tuple.tuple(TestDataHelper.TASK_TITLE, TestDataHelper.TASK_ESTIMATE));
    }
}

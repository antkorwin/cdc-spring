package com.antkorwin.reportservice.feign;

import java.util.List;

import com.antkorwin.junit5integrationtestutils.test.runners.EnableIntegrationTests;
import com.antkorwin.junit5integrationtestutils.test.runners.EnableRestTests;
import com.antkorwin.reportservice.model.Task;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.contract.stubrunner.spring.AutoConfigureStubRunner;
import org.springframework.cloud.contract.stubrunner.spring.StubRunnerProperties;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Created on 24.09.2018.
 *
 * TODO: replace on javadoc
 *
 * @author Korovin Anatoliy
 */
//@ExtendWith(SpringExtension.class)
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
//@AutoConfigureStubRunner(ids = {"com.antkorwin:task-service:+:stubs"},
//                         stubsMode = StubRunnerProperties.StubsMode.LOCAL)

@EnableIntegrationTests
@AutoConfigureStubRunner(ids = {"com.antkorwin:task-service:+:stubs"},
                         stubsMode = StubRunnerProperties.StubsMode.REMOTE,
                         snapshotCheckSkip = true,
                         repositoryRoot = "http://192.168.0.8:8081/artifactory/libs-snapshot-local")
class TaskServiceFeignIT {

    @Autowired
    private TaskServiceFeign taskServiceFeign;

    @Test
    void getAllTasks() {
        // Arrange
        // Act
        List<Task> tasks = taskServiceFeign.getAllTask();
        // Assert
        assertThat(tasks).isNotNull()
                         .extracting(Task::getEstimate)
                         .contains(20, 7, 100);
    }
}
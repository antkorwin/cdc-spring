package com.antkorwin.reportservice.api;

import java.util.List;

import com.antkorwin.junit5integrationtestutils.mvc.requester.MvcRequester;
import com.antkorwin.junit5integrationtestutils.test.runners.EnableIntegrationTests;
import com.antkorwin.junit5integrationtestutils.test.runners.EnableRestTests;
import com.antkorwin.reportservice.model.Value;
import com.fasterxml.jackson.core.type.TypeReference;
import org.assertj.core.groups.Tuple;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.contract.stubrunner.spring.AutoConfigureStubRunner;
import org.springframework.cloud.contract.stubrunner.spring.StubRunnerProperties;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Created on 24.09.2018.
 * <p>
 * TODO: replace on javadoc
 *
 * @author Korovin Anatoliy
 */
@EnableIntegrationTests
@EnableRestTests
@AutoConfigureStubRunner(ids = {"com.antkorwin:task-service:+:stubs"},
                         stubsMode = StubRunnerProperties.StubsMode.REMOTE,
                         snapshotCheckSkip = true,
                         repositoryRoot = "http://192.168.0.8:8081/artifactory/libs-snapshot-local")
class MetricsControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getMetrics() throws Exception {

        // Act
        List<Value> values = MvcRequester.on(mockMvc)
                                         .to("/metrics/")
                                         .get()
                                         .expectStatus(HttpStatus.OK)
                                         .doReturn(new TypeReference<List<Value>>() {
                                         });

        // Assert
        assertThat(values).isNotNull()
                          .extracting(Value::getName, Value::getValue)
                          .contains(Tuple.tuple("0..10 - easy", (double) 100 / 3),
                                    Tuple.tuple("11..20 - cool", (double) 100 / 3),
                                    Tuple.tuple("21..40 - hard", (double) 0),
                                    Tuple.tuple("41..1000 - unicorn", (double) 100 / 3));
    }
}
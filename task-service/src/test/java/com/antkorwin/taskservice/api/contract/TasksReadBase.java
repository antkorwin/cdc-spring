package com.antkorwin.taskservice.api.contract;

import com.antkorwin.junit5integrationtestutils.test.runners.EnablePostgresTestContainers;
import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.spring.api.DBRider;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.context.WebApplicationContext;


@EnablePostgresTestContainers
@ExtendWith(SpringExtension.class)
//@PostgresIntegrationTests
@DBRider
@DataSet("datasets/tasks.json")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
public class TasksReadBase {

    @Autowired
    private WebApplicationContext context;

    @BeforeEach
    void setup() {
        RestAssuredMockMvc.webAppContextSetup(context);
    }

}
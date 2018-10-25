# JUnit5 and Spring Cloud Contract DEMO

This is a project to demonstrate how to work with Spring Cloud Contract and JUnit5.

You can read about this in more details in my article: http://antkorwin.com/cloud/spring_cloud_contract_junit5.html

![diagram](http://antkorwin.com/cloud/diagram_cdc.png)

The brief description of microservices:
- `task-service` - API provider microservice
- `report-service` - consumer service example
- `task-frontend-service` - front-end application that used to show a simple task manager with the reporting data (wrapped in the spring boot application)
- `eureka` - Spring Cloud Eureka (service discovery server)
- `gateway` - Spring Cloud Netflix Zuul (API gateway)

And some additional usabilities:
- `docker` - folder with a docker compose file, which needed to run the TeamCity and Artifactory
- `stub-runner` - Spring Cloud Stub Runner application, which used to manually run a mock server with a selected contract

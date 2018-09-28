package contracts.tasks.write

import org.springframework.cloud.contract.spec.Contract
import org.springframework.http.HttpStatus

UUID_REGEX = "([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})";

Contract.make {
    description "Create new task"
    request {
        method POST()
        url("/tasks/create") {
            queryParameters {
                parameter("title", value(consumer(regex("[a-z A-Z]+"))))
                parameter("estimate", value(consumer(regex("[0-9]+"))))
            }
        }
    }
    response {
        body(
                id: value(producer(regex("$UUID_REGEX"))),
                title: fromRequest().query("title"),
                estimate: fromRequest().query("estimate")
        )
        headers {
            contentType(applicationJson())
        }
        status HttpStatus.CREATED.value()
    }
}
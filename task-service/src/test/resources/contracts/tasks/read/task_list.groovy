package contracts.tasks.read

import org.springframework.cloud.contract.spec.Contract
import org.springframework.http.HttpStatus

Contract.make {
    description "Get list of tasks"
    request {
        method GET()
        url("/tasks/list") {
        }
    }
    response {
        body(file("task_list.json"))
        headers {
            contentType(applicationJson())
        }
        status HttpStatus.OK.value()
    }
}
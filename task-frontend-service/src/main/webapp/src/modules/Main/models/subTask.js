import { Task } from './task';

class SubTask {
    constructor(params = {}) {
        this.id = params.id;
        this.parent = params.parent ? new Task(params.parent) : null;
        this.title = params.title;
        this.estimate = params.estimate;
        this.weight = params.weight;
    }
}

export { SubTask };
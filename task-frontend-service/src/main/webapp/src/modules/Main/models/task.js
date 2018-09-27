class Task {
    constructor(params = {}) {
        this.id = params.id;
        this.title = params.title;
        this.estimate = params.estimate;
    }
}

export { Task };
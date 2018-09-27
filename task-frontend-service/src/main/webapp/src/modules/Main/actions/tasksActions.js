import axios from 'axios';
import { Task } from '../models/task';
import { SubTask } from '../models/subTask';
import { globalConfig } from '../../../config/globalConfig';
import { ActionService } from '../../Global/services/actionService';

export function taskCreate(title, estimate) {
    let params = {
        title: title
    };
    if (estimate) {
        params.estimate = estimate;
    }
    return axios.post(`${globalConfig.api}task-service/tasks/create?${ActionService.parseParamsToQueryString(params)}`, params)
        .then(res => res.data)
        .then(task => new Task(task));
}

export function subtaskCreate(taskId, title, estimate) {
    let params = {
        title: title
    };
    if (estimate) {
        params.estimate = estimate;
    }
    return axios.post(`${globalConfig.api}task-service/tasks/${taskId}/subtasks/create?${ActionService.parseParamsToQueryString(params)}`, params)
        .then(res => res.data)
        .then(task => new SubTask(task));
}

export function tasksList() {
    return axios.get(`${globalConfig.api}task-service/tasks/list`)
        .then(res => res.data)
        .then(tasks => tasks.map(task => new Task(task)));
}

export function tasksListMock() {
    return Promise.resolve([
        {
            id: '1',
            title: 'Первая задача',
            estimate: 123
        },
        {
            id: '2',
            title: 'Вторая задача',
            estimate: 2
        },
        {
            id: '3',
            title: 'Третья задача',
            estimate: 54
        }
    ]);
}

export function subtasksList(taskId) {
    return axios.get(`${globalConfig.api}task-service/tasks/${taskId}/subtasks/list`)
    .then(res => res.data)
    .then(tasks => tasks.map(task => new SubTask(task)));
}

export function subtasksListMock(taskId) {
    return Promise.resolve([
        {
            id: '1',
            parent: null,
            weight: 0,
            title: 'Первая подзадача',
            estimate: 23
        },
        {
            id: '2',
            parent: null,
            weight: 2,
            title: 'Вторая подзадача',
            estimate: 567
        },
        {
            id: '3',
            parent: null,
            weight: 1,
            title: 'Третья подзадача',
            estimate: 32
        }
    ]);
}
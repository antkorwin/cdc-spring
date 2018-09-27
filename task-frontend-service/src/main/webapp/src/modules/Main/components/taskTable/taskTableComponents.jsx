import React from 'react';
import { tasksList, taskCreate } from '../../actions/tasksActions';
import classnames from 'classnames';
import { FlexDiv } from 'ws-react-flex-layout';
import { TaskInfo } from '../../components/taskInfo/taskInfoComponent';
import { WsReactBaseComponent } from 'ws-react-base-components';
import { Table } from 'react-bootstrap';
import { Modal, Button, FormControl } from 'react-bootstrap';

export class TaskTable extends WsReactBaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
    }

    componentDidMount() {
        this.updateTasksList();
    }

    updateTasksList() {
        tasksList()
            .then(tasks => {
                this.setState({
                    tasks: tasks
                });
            });
    }
    /**
     * Показать форму добавления таска
     */
    showForm = () => {
        this.setState({
            showForm: true
        });
    }

    /**
     * Скрыть форму добавления таска
     */
    hideForm = () => {
        this.setState({
            showForm: false,
            createTitle: '',
            createEstimate: ''
        });
    }

    /**
     * Обработчик события обновления названия таска
     */
    updateCreateTitle = (e) => {
        this.setState({
            createTitle: e && e.target && e.target.value ? e.target.value : ''
        });
    }

    /**
     * Обработчик события обновления оценки таска
     */
    updateCreateEstimate = (e) => {
        this.setState({
            createEstimate: e && e.target && e.target.value ? e.target.value : ''
        });
    }

    /**
     * Создать задачу
     */
    createTask = () => {
        if (!this.state.createTitle) {
            return;
        }
        taskCreate(this.state.createTitle, this.state.createEstimate ? this.state.createEstimate : null)
            .then(task => {
                this.updateTasksList();
                this.hideForm();
            })
            .catch(error => {
                this.hideForm();
            });
    }

    render() {
        return (
            <div>
                <FlexDiv
                    column="start start"
                    className={classnames(
                        'main-block'
                    )}
                >
                    <Table
                        striped bordered condensed hover
                        className={classnames(
                            'table-tasks'
                        )}
                    >
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Estimate</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.tasks.map((task, index) =>
                                    <TaskInfo
                                        key={index}
                                        task={task}
                                    />
                                )
                            }
                        </tbody>
                    </Table>

                    <Button
                        bsStyle="primary"
                        bsSize="large"
                        onClick={this.showForm}
                        className={classnames(
                            'new-task'
                        )}
                    >
                        Create task
                        </Button>
                </FlexDiv>

                <Modal show={this.state.showForm} onHide={this.hideForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Create new task
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl
                            className={classnames(
                                'form-title-subtask'
                            )}
                            type="text"
                            placeholder="Title *"
                            value={this.state.createTitle ? this.state.createTitle : ''}
                            onChange={this.updateCreateTitle}
                        />
                        <FormControl
                            type="number"
                            placeholder="Estimate"
                            value={this.state.createEstimate ? this.state.createEstimate : ''}
                            onChange={this.updateCreateEstimate}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <FlexDiv
                            row="start start"
                        >
                            <Button
                                onClick={this.hideForm}
                            >
                                Close
                            </Button>
                            <FlexDiv
                                flex={true}
                            >
                            </FlexDiv>
                            <Button
                                bsStyle="primary"
                                onClick={this.createTask}
                            >
                                Create
                            </Button>
                        </FlexDiv>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
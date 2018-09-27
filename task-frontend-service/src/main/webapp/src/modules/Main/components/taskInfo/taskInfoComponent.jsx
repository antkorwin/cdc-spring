import React, { Component } from 'react';
import { subtasksList, subtaskCreate } from '../../actions/tasksActions';
import classnames from 'classnames';
import { FlexDiv } from 'ws-react-flex-layout';
import { ESTIMATE_EMOJI } from '../../enums/estimateEmoji';
import { Modal, Button, FormControl } from 'react-bootstrap';

export class TaskInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subtasks: [],
            showForm: false,
            createTitle: '',
            createEstimate: ''
        };
    }

    componentDidMount() {
        this.updateSubtasksList();
    }

    updateSubtasksList() {
        subtasksList(this.props.task.id)
            .then(subtasks => {
                this.setState({
                    subtasks: subtasks.sort((a, b) => {
                        if (a.weight > b.weight) {
                            return -1;
                        }
                        if (a.weight < b.weight) {
                            return 1;
                        }
                        return 0;
                    })
                });
            });
    }

    /**
     * Показать форму добавления сабтаска
     */
    showForm = () => {
        this.setState({
            showForm: true
        });
    }

    /**
     * Скрыть форму добавления сабтаска
     */
    hideForm = () => {
        this.setState({
            showForm: false,
            createTitle: '',
            createEstimate: ''
        });
    }

    /**
     * Обработчик события обновления названия сабтаска
     */
    updateCreateTitle = (e) => {
        this.setState({
            createTitle: e && e.target && e.target.value ? e.target.value : ''
        });
    }

    /**
     * Обработчик события обновления оценки сабтаска
     */
    updateCreateEstimate = (e) => {
        this.setState({
            createEstimate: e && e.target && e.target.value ? e.target.value : ''
        });
    }

    /**
     * Создать подзадачу
     */
    createSubtask = () => {
        if (!this.state.createTitle) {
            return;
        }
        subtaskCreate(this.props.task.id, this.state.createTitle, this.state.createEstimate ? this.state.createEstimate : null)
            .then(subtask => {
                this.updateSubtasksList();
                this.hideForm();
            })
            .catch(error => {
                this.hideForm();
            });
    }

    /**
     * Получить иконку по оценке
     * @param {*} estimate 
     */
    getEmojiByEstimate(estimate) {
        let find = null;

        ESTIMATE_EMOJI.forEach(config => {
            if ((!config.min && estimate <= config.max) || (!config.max && estimate > config.min) || (estimate > config.min && estimate <= config.max)) {
                find = config;
            }
        });

        return find ? find.emoji : null;
    }

    render() {
        return (
            <React.Fragment>

                <Modal show={this.state.showForm} onHide={this.hideForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Create new subtask for task: {this.props.task.title}
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
                                onClick={this.createSubtask}
                            >
                                Create
                            </Button>
                        </FlexDiv>
                    </Modal.Footer>
                </Modal>

                <tr>
                    <td
                        className={classnames(
                            'title-block--task'
                        )}>
                        {this.props.task.title}
                    </td>
                    <td
                        className={classnames(
                            'estimate-block--task'
                        )}>
                        {this.props.task.estimate}
                    </td>
                    <td>
                        <FlexDiv
                            row="center center"
                            className={classnames(
                                'button-block'
                            )}
                            onClick={this.showForm}
                        >
                            <Button bsStyle="primary" bsSize="large" onClick={this.showForm}>
                                Create subtask
                            </Button>

                        </FlexDiv>
                    </td>
                </tr>
                {
                    this.state.subtasks.map((subtask, index) =>
                        <tr
                            key={index}
                        >
                            <td>
                                <FlexDiv
                                    row="start center"
                                    className={classnames(
                                        'title-block',
                                    )}
                                >
                                    {subtask.title}
                                </FlexDiv>
                            </td>
                            <td
                                className={classnames(
                                    'estimate-block'
                                )}>
                                <FlexDiv
                                    row="center center"
                                >
                                    <span>{subtask.estimate}</span>
                                    <FlexDiv
                                        row="center center"
                                        className={classnames(
                                            'emoji-block'
                                        )}
                                    >
                                        {this.getEmojiByEstimate(subtask.estimate)}
                                    </FlexDiv>
                                </FlexDiv>
                            </td>
                            <td></td>
                        </tr>
                    )
                }
            </React.Fragment>
        );
    }
}
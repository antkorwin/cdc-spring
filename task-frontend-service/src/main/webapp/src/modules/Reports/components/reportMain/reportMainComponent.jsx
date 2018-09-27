/* global CanvasJS*/

import React, { Component } from 'react';
import { valuesList } from '../../actions/reportActions';
import { FlexDiv } from 'ws-react-flex-layout';
import { WsReactBaseComponent } from 'ws-react-base-components';
import classnames from 'classnames';
import { Button } from 'react-bootstrap';

export class ReportMain extends WsReactBaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
            idContainer: 'chartContainer'
        };
    }

    componentDidMount() {
        this.updateValuesList();
    }

    updateValuesList = () => {
        valuesList()
            .then(values => {
                this.setState({
                    values: values
                }, () => this.renderSchedule());
            });
    }

    /**
     * Отрисовываем график
     */
    renderSchedule() {
        let chart = new CanvasJS.Chart(this.state.idContainer, {
            animationEnabled: true,
            title: {
                text: ''
            },
            data: [{
                type: 'pie',
                startAngle: 240,
                yValueFormatString: '##0.00\'%\'',
                indexLabel: '{label} {y}',
                dataPoints: this.state.values ? this.state.values.map(item => ({
                    y: item.value,
                    label: item.name
                })) : []
            }]
        });
        chart.render();
    }

    render() {
        return (
            <FlexDiv
                column="start start"
            >
                <Button
                    className={classnames(
                        'redirect-button'
                    )}
                    onClick={this.updateValuesList}
                >
                Refresh
                </Button>
                <div>
                    <div
                        id={this.state.idContainer}
                    >
                    </div>
                </div>
            </FlexDiv>
        );
    }
}
import React from 'react';
import { WsReactBaseComponent } from 'ws-react-base-components';
import { ReportMain } from '../../../Reports/components/reportMain/reportMainComponent';
import { TaskTable } from '../../components/taskTable/taskTableComponents';
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';

export class MainPage extends WsReactBaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row className="clearfix">
                        <Col sm={4}>
                            <Nav bsStyle="pills" stacked>
                                <NavItem 
                                    eventKey="first" 
                                >
                                    Main
                                </NavItem>
                                <NavItem 
                                    eventKey="second"
                                >
                                    Report
                                </NavItem>
                            </Nav>
                        </Col>
                        <Col sm={8}>
                            <Tab.Content 
                                animation
                                mountOnEnter={true}
                                unmountOnExit={true}
                            >
                                <Tab.Pane eventKey="first">
                                    <TaskTable />
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <ReportMain />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>

            </div>
        );
    }
}
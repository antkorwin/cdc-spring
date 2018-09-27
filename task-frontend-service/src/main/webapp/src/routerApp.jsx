import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import { MainPage } from './modules/Main/pages/mainPage/mainPageContainer';

export default class RouterApp extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact={true} path="/" component={MainPage} />
                </Switch>
            </HashRouter>
        );
    }
}
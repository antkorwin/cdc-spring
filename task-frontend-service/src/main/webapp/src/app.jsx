import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { AppConfig } from './appConfig';

render(
    <AppConfig />,
    document.getElementById('app')
);
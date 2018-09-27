import axios from 'axios';
import { ReportValue } from '../models/reportValue';
import { globalConfig } from '../../../config/globalConfig';

export function valuesList() {
    return axios.get(`${globalConfig.api}report-service/metrics`)
        .then(res => res.data)
        .then(values => values.map(value => new ReportValue(value)));
}

export function valuesListMock() {
    return Promise.resolve(
    [
        {
            name : '0..10 - easy',
            value : 33.333333333333336
        },
        {
            name : '10..20 - cool',
            value : 33.333333333333336
        },
        {
            name : '20..40 - hard',
            value : 0.0
        },
        {
            name : '40..60 - unicorn',
            value : 33.333333333333336
        }
    ]);
}
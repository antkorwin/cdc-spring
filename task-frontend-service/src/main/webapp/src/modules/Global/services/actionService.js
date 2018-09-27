class ActionService {
    static parseParamsToQueryString(params) {
        let str = [];
        for (let [field, value] of Object.entries(params)) {
            str.push(`${encodeURIComponent(field)}=${encodeURIComponent(value)}`);
        }
        return str.join('&');
    }
}

export { ActionService };
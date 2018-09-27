/*global WS_GLOBAL_IP*/

const globalConfig = {
    api: WS_GLOBAL_IP ? WS_GLOBAL_IP : '/'
};

export { globalConfig };
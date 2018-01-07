const {initCli} = require('./utils');

initCli()
    .then(({initTodos, initSetting}) => {
        require('./interface-setting')(initTodos, initSetting);
    })
    .catch((e) => console.log(e));
const fs = require('fs');
const path = require('path');

const loadTodos = () => {
    let todos = fs.readFileSync(path.join(__dirname, 'seed.json'));
    todos = JSON.parse(todos);
    return todos;
};

const loadSetting = () => {
    let setting = fs.readFileSync(path.join(__dirname, 'setting.json'));
    setting = JSON.parse(setting);
    return setting;
};

module.exports = {
    loadTodos,
    loadSetting
};
const fs = require('fs');
const path = require('path');

const initCli = () => {
    let todos = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed.json'), 'utf-8'));
    let setting = JSON.parse(fs.readFileSync(path.join(__dirname, 'setting.json'), 'utf-8'));
    return {todos, setting};
};

const saveCli = (todos, setting) => {
    fs.writeFileSync(path.join(__dirname, 'seed_saved.json'), JSON.stringify(todos));
    fs.writeFileSync(path.join(__dirname, 'setting_saved.json'), JSON.stringify(setting));
};

const printTodo = (todo) => {
    console.log(`todo [${todo.id}] : ${todo.text}, priority : ${todo.priority}`);
};

module.exports = {
    initCli,
    saveCli,
    printTodo
};

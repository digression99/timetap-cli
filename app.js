const inquirer = require('inquirer');
const _ = require('lodash');
const program = require('commander');
const {TIME_PER_SECOND, QUESTION_MESSAGE} = require('./constants');
const {initCli, printTodo} = require('./utils');
require('./readline_settings');
const {setProgram} = require('./commander_settings');

let timeoutObj, todos, setting;

// check if this works.
const afterStartPomo = (todos, setting) => {
    timeoutObj = undefined;
    console.log('pomo finished!');
    printTodo(todos.find(todo => setting.todoId === todo.id));
};

initCli()
    .catch(err => console.log(err))
    .then(({initTodos, initSetting}) => {
        todos = initTodos;
        setting = initSetting;

        let questions = [
            {
                type: 'input',
                name: 'command',
                message: QUESTION_MESSAGE,
                prefix : "",
                suffix : ""
            }
        ];

        const ask = () => {
            inquirer.prompt(questions).then(answers => {
                let argv = Array.prototype.slice.call(process.argv);

                answers.command.split(' ').forEach(opt => {
                    argv.push(opt.trim());
                });

                let programArgs = {
                    todos,
                    setting,
                    argv,
                    timeoutObj,
                    QUESTION_MESSAGE,
                    TIME_PER_SECOND,
                    afterStartPomo
                };

                let parsedProgram = _.cloneDeep(program);

                const {changedTodos, changedSetting, changedTimeoutObj} = setProgram(parsedProgram, programArgs);
                todos = _.cloneDeep(changedTodos);
                setting = _.cloneDeep(changedSetting);
                timeoutObj = changedTimeoutObj;
                ask();
            });
        };

        ask();
    });
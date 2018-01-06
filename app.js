const inquirer = require('inquirer');
const _ = require('lodash');
const program = require('commander');
const {TIME_PER_SECOND, QUESTION_MESSAGE} = require('./constants');
const {initCli} = require('./utils');
require('./readline_settings');
const {setProgram} = require('./commander_settings');

let timeoutObj;
let {todos, setting} = initCli();

let questions = [
    {
        type: 'input',
        name: 'command',
        message: QUESTION_MESSAGE,
        prefix : "",
        suffix : ""
    }
];

//let ui = new inquirer.ui.BottomBar();
//process.stdout.pipe(ui.log);

function ask() {
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
        };

        let parsedProgram = _.cloneDeep(program);

        const {changedTodos, changedSetting} = setProgram(parsedProgram, programArgs);
        // console.log('changed todos : ', changedTodos);
        // console.log('changed setting : ', changedSetting);
        todos = _.cloneDeep(changedTodos);
        setting = _.cloneDeep(changedSetting);

        ask();
    });
}

ask();
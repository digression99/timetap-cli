const EventEmitter = require('events');
const moment = require('moment');
const { printTodo, printSetting, finishPomo, startPomo, saveCli } = require('./utils');

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('check', ({ options, setting, todos }) => {
    printSetting(setting, todos);
});

myEmitter.on('help', ({ options, setting, todos }) => {
    console.log('help message');
});

myEmitter.on('set', ({ options, setting, todos }) => {
    if (!options.time && !options.index) {
        console.log('set the flag!');
        return;
    }

    if (options.time) {
        setting.time = options.time;
        console.log(`set time to ${options.time} min.`);
    }
    if (options.index) {
        // exception handling.
        if (options.index < 1 || todos.length < options.index) {
            console.log('pick the right one!');
            return;
        }

        setting.index = options.index - 1;
        console.log(`set todo to ${todos[setting.index].text}.`);
    }
});

myEmitter.on('start', ({ options, setting, todos }) => {
    if (setting.timeoutObj) {
        console.log('you already started pomo!');
    } else {
        console.log(`starting ${todos[setting.index].text}!`);
        startPomo(setting, todos, myEmitter);
    }
});

myEmitter.on('stop', ({ options, setting, todos }) => {
    if (setting.timeoutObj) {
        console.log('stop pomo!');
        finishPomo(setting);
    } else {
        console.log('start pomo first!');
    }
});

myEmitter.on('todo', ({ options, setting, todos }) => {
    todos.forEach(todo => printTodo(todo));
});

myEmitter.on('exit', ({ options, setting, todos }) => {
    saveCli(todos, setting)
        .then(() => {
            console.log('bye~');
            process.exit(0);
        })
        .catch(e => {
            console.log('error occured.');
            process.exit(0);
        })
});

myEmitter.on('pomo_done', ({setting, todos}) => {
    console.log(`\n${todos[setting.index].text} done!`);
    process.stdout.write(':: ');

    // take these logic to function.
    finishPomo(setting);
});

module.exports = myEmitter;
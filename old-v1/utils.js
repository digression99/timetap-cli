const fs = require('fs');
const path = require('path');
const moment = require('moment');
const {TIME_PER_SECOND, QUESTION_MESSAGE} = require('./constants');

const initCli = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, 'seed.json'), (err, todos) => {
            if (err) reject(err);
            fs.readFile(path.join(__dirname, 'setting.json'), (err, setting) => {
                if (err) reject(err);
                resolve({
                    initTodos : JSON.parse(todos),
                    initSetting : JSON.parse(setting)
                });
            })
        })
    })
};

const saveCli = (todos, setting) => {
    console.log('saving!');
    return new Promise((resolve, reject) => {
        fs.writeFile(path.join(__dirname, 'seed_saved.json'), JSON.stringify(todos), (err) => {
            if (err) reject(err);
            fs.writeFile(path.join(__dirname, 'setting_saved.json'), JSON.stringify(setting), (err) => {
                if (err) reject(err);
                resolve();
            })
        })
    });
};

const printTodo = (todo) => {
    console.log(`todo [${todo.id}] : ${todo.text}, priority : ${todo.priority}`);
};

const startPomo = (todos, setting, options, callback) => {
    return new Promise((resolve, reject) => {
        try {
            if (options.without) console.log('without removing it!');

            setting.startedAt = moment.valueOf();
            let newTimeoutObj = setTimeout(() => {
                callback(todos, setting);
            }, setting.duration * TIME_PER_SECOND);

            // let newTimeoutObj = setTimeout(() => {
            //
            //     // console.log(QUESTION_MESSAGE);
            //     //setting.timeoutObj =
            // }, setting.duration * TIME_PER_SECOND);
            // how can I undefine timeoutObj in app.js after setTimeout???
            // use setting? yeah!
            // no no no, use
            resolve({
                newTimeoutObj,
                newSetting : setting
            });
        } catch (e) {
            reject(e);
        }
    })
};

const finishPomo = (todos, setting) => {

}

module.exports = {
    initCli,
    saveCli,
    printTodo,
    startPomo,
    finishPomo
};

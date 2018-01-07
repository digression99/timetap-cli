const {printTodo, saveCli, startPomo, finishPomo} = require('./utils');
const moment = require('moment');

const setProgram = (prog, {todos, setting, argv, timeoutObj, afterStartPomo}) => {

    prog
        .version('0.1.0');

    prog
        .command('exit')
        .description('exit the program.')
        .action (() => {
            saveCli(todos, setting)
                .then(() => {
                    console.log('bye~');
                    process.exit(0);

                })
                .catch((err) => {
                    console.log(err);
                    process.exit(0);
                })
        })
        .on('-h, --help', function() {
            console.log('  Examples:');
            console.log();
            console.log('    $ deploy exec sequential');
            console.log('    $ deploy exec async');
            console.log();
        });

    prog
        .command('todo')
        .description('show all todos.')
        .option("-t, --time", "check times when todo made.")
        .option("-c, --count [cnt]", "count how many to show.") // how many to show.
        //.option("-)
        .action((options) => {
            todos.forEach(todo => {
                printTodo(todo);
                // if (options.time) console.log('with timestamps.');
                // if (options.count) console.log('with count, ', options.count);
            });
        })
        .on('-h, --help', function() {
            console.log('  Examples:');
            console.log();
            console.log('    $ deploy exec sequential');
            console.log('    $ deploy exec async');
            console.log();
        });

    prog
        .command('check')
        .description('check the setting.')
        .option("-v, --verify", "show all the details")
        .option("-t, --time", "check remaining time if pomo started.")
        .action((options) => {
            setting.todoId = setting.todoId || todos[0].id;
            let todo = todos.find(todo => {
                return todo.id === setting.todoId;
            });

            console.log(`duration : ${setting.duration} min.`);
            printTodo(todo);
            setting.startedAt && console.log(`pomo started : ${setting.startedAt}`);
            setting.endedAt && console.log(`pomo ended : ${setting.endedAt}`);
        })
        .on('-h, --help', function() {
            console.log('  Examples:');
            console.log();
            console.log('    $ deploy exec sequential');
            console.log('    $ deploy exec async');
            console.log();
        });

    prog
        .command('set')
        .description('set the setting.')
        .option("-t, --time [dur]", "change the time.")
        .option("-i --id [todoId]", "change todo.")
        .action(options => {
            let duration = options.time || 25;

            let todoId = options.id ? parseInt(options.id, 10) : (setting.todoId || todos[0].id);
            setting = { // not changing. how can I?...
                ...setting,
                duration,
                todoId
            };
        })
        .on('-h, --help', function() {
            console.log('  Examples:');
            console.log();
            console.log('    $ deploy exec sequential');
            console.log('    $ deploy exec async');
            console.log();
        });

    prog
        .command('start')
        .description('start the pomo. when finished, remove todo.')
        .option("-w, --without", "without removing pomo.")
        .action(options => {
            if (timeoutObj) return console.log('pomo already started!');
            startPomo(todos, setting, options, afterStartPomo)
                .then(({ newSetting, newTimeoutObj }) => {
                    setting = newSetting;
                    timeoutObj = newTimeoutObj;

                    console.log('start pomo!');
                })
                .catch(err => console.log(err));
        })
        .on('-h, --help', function() {
            console.log('  Examples:');
            console.log();
            console.log('    $ deploy exec sequential');
            console.log('    $ deploy exec async');
            console.log();
        });

    prog
        .command('stop')
        .description('stop the pomo if it started.')
        .option('-w --with', "with removing pomo.")
        .option('-s --save', "not removing the records.")
        .action(options => {
            if (timeoutObj) {
                console.log('stop pomo!');
                if (options.with) console.log('with removing it!');

                setting.endedAt = moment.valueOf();
                // remove timeoutObj.
                clearTimeout(timeoutObj);
                timeoutObj = undefined;
            } else return console.log('start pomo first!');
        })
        .on('-h, --help', function() {
            console.log('  Examples:');
            console.log();
            console.log('    $ deploy exec sequential');
            console.log('    $ deploy exec async');
            console.log();
        });

    prog
        .command('*')
        .action((env) => {
            console.log('wrong command, you entered : "%s". \n please get help by entering --help.', env);
        });

    prog.parse(argv);

    // affect changes.
    return {changedTodos : todos, changedSetting : setting};
};

module.exports = {setProgram};
const inquirer = require('inquirer');
const _ = require('lodash');
const fs = require('fs');
const program = require('commander');
const path = require('path');
const readline = require('readline');

const TIME_PER_SECOND = 100;
const QUESTION_MESSAGE = "==> ";

const initCli = () => {
    let todos = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed.json'), 'utf-8'));
    let setting = JSON.parse(fs.readFileSync(path.join(__dirname, 'setting.json'), 'utf-8'));
    return {todos, setting};
};


let timeoutObj;
let {todos, setting} = initCli();

const printTodo = (todo) => {
    console.log(`todo [${todo.id}] : ${todo.text}, priority : ${todo.priority}`);
};

// about read line.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ':: '
});

// deal with ctrl + c
rl.on('SIGINT', () => {
    console.log('bye~');
    fs.writeFileSync(path.join(__dirname, 'seed_saved.json'), todos);
    fs.writeFileSync(path.join(__dirname, 'setting_saved.json'), setting);
    process.exit(0);
});

const setProgram = (prog, argv) => {
    // prog
    //     .version('0.1.0')
    //     .option('-p, --peppers', 'Add peppers')
    //     .option('-P, --pineapple', 'Add pineapple')
    //     .option('-b, --bbq-sauce', 'Add bbq sauce')
    //     .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
    //
    // prog
    //     .version('0.1.0')
    //     .option('-C, --chdir <path>', 'change the working directory')
    //     .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
    //     .option('-T, --no-tests', 'ignore test hook');

    prog
        .command('exit')
        .description('exit the program.')
        .action (() => {
            console.log('bye~');
            fs.writeFileSync(path.join(__dirname, 'seed_saved.json'), todos);
            fs.writeFileSync(path.join(__dirname, 'setting_saved.json'), setting);
            process.exit(0);
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
        });

    prog
        .command('check')
        .description('check the setting.')
        .option("-v, --verify", "show all the details")
        .action((options) => {
            setting.todoId = setting.todoId || todos[0].id;
            let todo = todos.find(todo => {
                // console.log('typeof todo.id : ', typeof todo.id);
                // console.log('typeof setting.todoId : ', typeof setting.todoId);
                return todo.id === setting.todoId;
            });
            // console.log('setting.todoId : ', setting.todoId);
            // console.log('todo : ', todo);

            console.log(`duration : ${setting.duration} min.`);
            printTodo(todo);
            // Object.entries(setting).forEach( (ent, index) => {
            //     console.log(`${ent[0]} : ${ent[1]}`);
            // });
        });

    prog
        .command('set')
        .description('set the setting.')
        .option("-t, --time [dur]", "change the time.")
        .option("-i --id [todoId]", "change todo.")
        .action(options => {
            let duration = options.time || 25;
            let todoId = options.id ? parseInt(options.id, 10) : setting.todoId || todos[0].id;
            setting = {
                ...setting,
                duration,
                todoId
            };
        });

    prog
        .command('start')
        .description('start the pomo. when finished, remove todo.')
        .option("-w, --without", "without removing pomo.")
        .action(options => {
            console.log('start pomo!');
            if (options.without) console.log('without removing it!');
            if (timeoutObj) return console.log('pomo already started!');
            timeoutObj = setTimeout(() => {
                console.log('pomo finished!');
                printTodo(todos.find(todo => setting.todoId === todo.id));
                console.log(QUESTION_MESSAGE);
                timeoutObj = undefined;
            }, setting.duration * TIME_PER_SECOND);
        });

    prog
        .command('stop')
        .description('stop the pomo if it started.')
        .option('-w --with', "with removing pomo.")
        .action(options => {
            if (timeoutObj) {
                console.log('stop pomo!');
                if (options.with) console.log('with removing it!');
                // remove timeoutObj.
                clearTimeout(timeoutObj);
                timeoutObj = undefined;
            } else return console.log('start pomo first!');
        });

    prog
        .command('setup [env]')
        .description('run setup commands for all envs')
        .option("-s, --setup_mode [mode]", "Which setup mode to use")
        .action(function(env, options) {
            var mode = options.setup_mode || "normal";
            env = env || 'all';
            console.log('setup for %s env(s) with %s mode', env, mode);
        });

    prog
        .command('exec <cmd>')
        .alias('ex')
        .description('execute the given remote cmd')
        .option("-e, --exec_mode <mode>", "Which exec mode to use")
        .action(function(cmd, options){
            console.log('exec "%s" using %s mode', cmd, options.exec_mode);
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
        .action(function(env){
            console.log('deploying "%s"', env);
        });

    prog.parse(argv);
};

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

        let parsedProgram = _.cloneDeep(program);
        setProgram(parsedProgram, argv);

        ask();
    });
}

ask();
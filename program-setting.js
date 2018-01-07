const myEmitter = require('./event-emitter');

const setProgram = (prog, setting, todos) => {
    const messageHandler = (options) => {
        const cmd = options._name;
        myEmitter.emit(cmd, {options, setting, todos});
    };

    const optionMessageHandler = (options) => {
        // console.log(options)
        if (options.help) console.log('help message');
    };

    prog
        .option('-h, --help', 'help message')
        .action(optionMessageHandler);

    prog
        .command('check')
        .description('check the setting.')
        .option('-v, --verify', 'verify everything!')
        // .option('-h, --help', () => {
        //     console.log('check help message.');
        // })
        // you don't have to use action on this. you could just parse the data.
        .action(messageHandler)

    // .on('-h, --help', () => {
    //     console.log('check help message.');
    // });

    prog
        .command('set')
        .description('set the setting.')
        .option('-t, --time [min]', 'set the time!')
        .option('-i, --index [idx]', 'set todo!')
        .action(messageHandler);

    prog
        .command('start')
        .description('start pomo.')
        .option('-h, --help', '')
        .action(messageHandler);

    prog
        .command('stop')
        .description('stop pomo.')
        .option('-h, --help', '')
        .action(messageHandler);

    prog
        .command('exit')
        .description('exit the program.')
        .option('-h, --help', '')
        .action(messageHandler);

    prog
        .command('todo')
        .description('show all todos.')
        .option('-h, --help', '')
        .action(messageHandler);

    prog
        .command('help')
        .description('help message')
        .action(messageHandler);
};

module.exports = {
    setProgram
}
const readline = require('readline');
const {saveCli} = require('./utils');
// about read line.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ':: '
});

// deal with ctrl + c
rl.on('SIGINT', () => {
    console.log('exit with typing "exit"');
    // console.log('bye~');
    // saveCli(todos, setting)
    //     .then(() => {
    //         console.log('bye~');
    //         process.exit(0);
    //
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         process.exit(0);
    //     })
    // saveCli(todos, setting);
    // process.exit(0);
});


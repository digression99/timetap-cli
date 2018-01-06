const readline = require('readline');
// about read line.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ':: '
});

// deal with ctrl + c
rl.on('SIGINT', () => {
    console.log('bye~');
    saveCli(todos, setting);
    process.exit(0);
});
#!/usr/bin/env node

const {Command} = require('commander');
const program = new Command();
program
    .command('greet <name>')
    .action ((name) => {
        console.log(`Hello, ${name}!`);
    });

program.parse();
#!/usr/bin/env node

const {Command} = require('commander');
const program = new Command();
program
    .command('greet <name>')
    .action ((name) => {
        console.log(`Hello, ${name}!`);
    });


program
    .command('add <num1> <num2>')
    .action((num1, num2) => {
        const sum = parseFloat(num1) + parseFloat(num2);
        console.log(`The sum of ${num1} and ${num2} is ${sum}.`);
    });

program
    .command('subtract <num1> <num2>')
    .action((num1, num2) => {
        const difference = parseFloat(num1) - parseFloat(num2);
        console.log(`The difference between ${num1} and ${num2} is ${difference}.`);
    });

program 
    .command('multiply <num1> <num2>')
    .action((num1, num2) => {
        const product = parseFloat(num1) * parseFloat(num2);
        console.log(`The product of ${num1} and ${num2} is ${product}.`);
    });

program
    .command('divide <num1> <num2>')
    .action((num1, num2) => {
        if (parseFloat(num2) === 0) {
            console.log('Error: Division by zero is not allowed.');
        } else {
            const quotient = parseFloat(num1) / parseFloat(num2);
            console.log(`The quotient of ${num1} and ${num2} is ${quotient}.`);
        }
    });

program.parse();
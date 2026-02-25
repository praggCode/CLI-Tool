#!/usr/bin/env node

import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const { Command } = require('commander');
const program = new Command();
program
    .command('greet <name>')
    .action((name) => {
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

program
    .command("pokemon")
    .action(async () => {
        try {
            const randomId = Math.floor(Math.random() * 898) + 1;
            if (!process.env.POKEAPI_URL) { console.error('Missing POKEAPI_URL in .env'); process.exit(1); }
            const res = await axios.get(`${process.env.POKEAPI_URL}/${randomId}`);
            console.log(res.data.name);
        }
        catch (error) {
            console.error("An error occurred:", error);
        }
    })

program
    .command("joke")
    .action(async () => {
        try {
            if (!process.env.JOKE_API_URL) { console.error('Missing JOKE_API_URL in .env'); process.exit(1); }
            const res = await axios.get(process.env.JOKE_API_URL);
            console.log(`${res.data.setup} - ${res.data.punchline}`);
        }
        catch (error) {
            console.error("An error occurred:", error);
        }
    });

program.parse();
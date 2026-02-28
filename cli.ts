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

program
    .command("uppercase <string>")
    .action((string) => {
        console.log(string.toUpperCase());
    });

program
    .command("lowercase <string>")
    .action((string) => {
        console.log(string.toLowerCase());
    });

program
    .command("length <string>")
    .action((string) => {
        console.log(`The length of "${string}" is ${string.length}.`);
    });

program
    .command("random <min> <max>")
    .action((min, max) => {
        const minNum = parseFloat(min);
        const maxNum = parseFloat(max);
        if (minNum > maxNum) {
            console.log("Error: min must be less than or equal to max.");
        } else {
            const random = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
            console.log(`Random number between ${min} and ${max}: ${random}`);
        }
    });

program
    .command("reverse <string>")
    .action((string) => {
        console.log(string.split("").reverse().join(""));
    });

program
    .command("square <num>")
    .action((num) => {
        const parsedNum = parseFloat(num);
        console.log(`The square of ${num} is ${parsedNum * parsedNum}.`);
    });

program
    .command("github <username>")
    .action(async (username) => {
        try {
            if (!process.env.GITHUB_API_URL) { console.error('Missing GITHUB_API_URL in .env'); process.exit(1); }
            const res = await axios.get(`${process.env.GITHUB_API_URL}/${username}`);
            // console.log(res)
            console.log(`User: ${res.data.name || res.data.login}`);
            console.log(`Bio: ${res.data.bio || 'N/A'}`);
            console.log(`Followers: ${res.data.followers}`);
            console.log(`Public Repos: ${res.data.public_repos}`);
        }
        catch (error) {
            console.error("An error occurred fetching GitHub user:", error.message);
        }
    });

program
    .command("weather <city>")
    .action(async (city) => {
        try {
            if (!process.env.WEATHER_API_URL) { console.error('Missing WEATHER_API_URL in .env'); process.exit(1); }
            if (!process.env.WEATHER_API_KEY) { console.error('Missing WEATHER_API_KEY in .env, please add your OpenWeather API key'); process.exit(1); }
            const res = await axios.get(`${process.env.WEATHER_API_URL}?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`);
            console.log(`Weather in ${city}: ${res.data.weather[0].description}`);
            console.log(`Temperature: ${res.data.main.temp}°C`);
            console.log(`Humidity: ${res.data.main.humidity}%`);
        }
        catch (error) {
            console.error("An error occurred fetching weather:", error.message);
        }
    });

program
    .command("quote")
    .action(async () => {
        try {
            if (!process.env.QUOTE_API_URL) { console.error('Missing QUOTE_API_URL in .env'); process.exit(1); }
            const res = await axios.get(process.env.QUOTE_API_URL);
            const quoteContent = res.data.quote || res.data.content;
            const quoteAuthor = res.data.author;
            console.log(`"${quoteContent}"\n- ${quoteAuthor}`);
        }
        catch (error) {
            console.error("An error occurred fetching quote:", error.message);
        }
    });

program.parse();
import chalk from "chalk";
import prompts from "prompts";
import { randomInt } from "node:crypto";
import {appendFileSync} from "node:fs";

function output(message) {
    console.log(message);
    appendFileSync("output_messages.txt", message + "\n");
}

output(chalk.magenta("GUESS THE NUMBER!"));
output(chalk.cyan("_____________________________"));
output(chalk.white("Guess a number between 1 and 10."));
output(chalk.yellow("You have 3 attempts!"));

const tries = 3;

const correctNumber = randomInt(1, 11);

for(let i = 1; i <= tries; i++) {
    const x = await prompts({
        type: "text",
        name: "value",
        message: `Attempt ${i}/${tries}: Enter your guess ... `
    });
    try{
    if(x.value.trim() === "") {
        throw new Error("A guess is required.");
    }

    const num = Number(x.value);

    if (!Number.isInteger(num)) {
        throw new Error("Guess must be a whole number.");
    }

    if (num <= 0) {
        throw new Error("Guess must be at least 1.");
    }

    if(num > 10) {
        throw new Error("Guess cannot exceed 10.");
    }

    if(num < correctNumber) {
        output(chalk.yellow("Too low!"));
    }
    else if(num > correctNumber) {
        output(chalk.yellow("Too high!"));
    }
    else {
        output(chalk.green("Correct!"));
        break;
    }
    }catch(error) {
    output(chalk.red(error.message));
    }

    if (i === tries) {
        output(chalk.red(`GAME OVER!`));
        output(chalk.white(`The secret number was ${correctNumber}.`));
    }
}

output(chalk.magenta("Thanks for playing!"));
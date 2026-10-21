import chalk from "chalk";
import prompts from "prompts";
import { randomInt } from "node:crypto";

console.log(chalk.magenta("GUESS THE NUMBER!"));
console.log(chalk.cyan("_____________________________"));
console.log(chalk.white("Guess a number between 1 and 10."));
console.log(chalk.yellow("You have 3 attempts!"));

const tries = 3;

const correctNumber = randomInt(1, 11);

for(let i = 1; i <= tries; i++) {
    const x = await prompts({
        type: "number",
        name: "value",
        message: `Attempt ${i}/${tries}: Enter your guess ... `
    });

    if(x.value < correctNumber) {
        console.log(chalk.yellow("Too low!"));
    }
    else if(x.value > correctNumber) {
        console.log(chalk.yellow("Too high!"));
    }
    else {
        console.log(chalk.green("Correct!"));
        break;
    }
}
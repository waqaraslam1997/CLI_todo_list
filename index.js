#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
class TodoList {
    constructor() {
        this.items = [];
    }
    async main() {
        const name = await this.promptForName();
        console.log(chalk.magenta.bold("\nHello " + name.toUpperCase() + "!\n"));
        while (true) {
            const action = await this.promptForAction();
            if (action === 'Add Item') {
                const newItem = await this.promptForNewItem();
                this.addItem(newItem);
            }
            else if (action === 'Delete Item') {
                const itemToDelete = await this.promptForItemToDelete();
                this.deleteItem(itemToDelete);
            }
            else {
                break; // Exit the loop on 'Exit' action
            }
        }
        this.displayTodoItems();
    }
    promptForName() {
        return inquirer.prompt({
            type: "input",
            message: "what is your Full Name? ",
            name: "fname"
        }).then((answer) => answer.fname);
    }
    promptForAction() {
        return inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: ['Add Item', 'Delete Item', 'Exit'],
        }).then((answers) => answers.action);
    }
    promptForNewItem() {
        return inquirer.prompt({
            type: 'input',
            name: 'item',
            message: 'Enter a new TODO item:',
        }).then((answers) => answers.item);
    }
    promptForItemToDelete() {
        return inquirer.prompt({
            type: 'list',
            name: 'item',
            message: 'Choose an item to delete:',
            choices: this.items,
        }).then((answers) => answers.item);
    }
    addItem(item) {
        this.items.push(item);
    }
    deleteItem(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }
    displayTodoItems() {
        console.log(chalk.yellow.bold(`\nYour TODO Items:`));
        this.items.forEach((item, index) => {
            console.log(`${index + 1}. ${item}`);
        });
    }
}
console.log(chalk.yellow(`\n<<== `) + chalk.green.bold("TODO LIST APPLICATION") + chalk.yellow(` ==>>\n`));
const todoList = new TodoList();
todoList.main();

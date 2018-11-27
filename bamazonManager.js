var utils = require('./utils');
var globals = require('./globals');
var inquirer = require('inquirer');

var appCommands = {
    'View Products for Sale': function(){
        viewAllProducts();
    },
    'View Low Inventory': function(){
        viewLowProducts(5);
    },
    'Add to Inventory': function(){
        addToInventory();
    },
    'Add New Product': function(){
        addNewProduct();
    },
    'Exit': function(){
        process.exit();
    }
}

console.log('\nWelcome to BAMAZON Manager!\n');
commandPrompt();

function commandPrompt(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'command',
            message: 'What would you like to do?',
            choices: Object.keys(appCommands)
        }
    ]).then(response => {
        var functionCall = appCommands[response.command];
        functionCall();
    });
}

function viewAllProducts(){
    utils.getAllProducts(function(err, res){
        if (err) throw err;
        utils.printProducts(res);
        commandPrompt();
    });
}

function viewLowProducts(min){
    utils.connection.query(
        `SELECT * FROM ${globals.productsTableName} WHERE ${globals.stockQtyCol}<?`, 
        [min],
        function(err, res){
            if (err) throw err;
            utils.printProducts(res);
            commandPrompt();
        }
    );
}

function addToInventory(){
    // TODO
}

function addNewProduct(){
    // TODO
}
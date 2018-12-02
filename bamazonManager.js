var utils = require('./utils');
var globals = require('./globals');
var inquirer = require('inquirer');
var colors = require('colors');

var itemIds = [];

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
getAllProducts();

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

function keepManagingPromp(){
    console.log('\n');
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'keepManaging',
            message: 'Would you like to continue managing inventory?'
        }
    ]).then(response => {
        if (response.keepManaging){
            getAllProducts();
        } else {
            process.exit();
        }
    })
}

function getAllProducts(){
    utils.getAllProducts(function(err, res){
        if (err) throw err;
        itemIds = utils.extractItemIds(res);
        commandPrompt();
    })
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
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: `What is the ${globals.itemIdCol} of the product?`,
            validate: function(id){
                return itemIds.includes(Number(id)) ? true : `Item ID '${id}' not found in the store.`;
            }
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'What is the quantity that you will be adding?',
            validate: function(quantity){
                return isNaN(Number(quantity)) ? `Please enter a valid number.` : true;
            }
        }
    ]).then(response => {
        utils.getProductById(response.id, function(err, res){
            if (err) throw err;
            utils.connection.query(
                `UPDATE ${globals.productsTableName} SET ? WHERE ?`,
                [
                    {
                        [globals.stockQtyCol]:Number(res[0][globals.stockQtyCol])+Number(response.quantity)
                    },
                    {
                        [globals.itemIdCol]:response.id
                    }
                ],
                function(err, res){
                    if (err) throw err;
                    console.log('\nInventory Successfully Processed'.bold.green);
                    keepManagingPromp();
                }
            )
        })
    })
}

function addNewProduct(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'productName',
            message: 'Type in the Product Name?'
        },
        {
            type: 'input',
            name: 'departmentName',
            message: 'Type in the Department Name?'
        },
        {
            type: 'input',
            name: 'price',
            message: 'Price?',
            validate: function(price){
                return isNaN(Number(price)) ? `Please enter a valid number.` : true;
            }
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'Quantity?',
            validate: function(price){
                return isNaN(Number(price)) ? `Please enter a valid number.` : true;
            }
        }
    ]).then(response => {
        utils.addAProduct({
            fields: [globals.productNameCol, globals.departmentNameCol, globals.priceCol, globals.stockQtyCol],
            values: [response.productName, response.departmentName, response.price, response.quantity]
        },
        function(err, res){
            if (err) throw err;
            console.log('\nItem Successfully Added To Inventory'.bold.green);
            keepManagingPromp();
        })
    })
}
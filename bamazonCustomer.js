// Import Node libraries.
var utils = require('./utils');
var globals = require('./globals');
var colors = require('colors');
var inquirer = require('inquirer');

var itemIds = [];

// Start the application.
console.log("\nWELCOME TO BAMAZON!\n");
console.log("Here's a list of all available products in the store:");
getAllProducts();

function purchasePrompt(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: "What's the Item ID of the product you'd like to purchase?",
            validate: function(id){
                return itemIds.includes(Number(id)) ? true : `Item ID '${id}' not found in the store.`;
            }
        },
        {
            type: 'input',
            name: 'quantity',
            message: "How many would you like to buy?",
            validate: function(quantity){
                return isNaN(Number(quantity)) ? `Please enter a valid number.` : true;
            }
        }
    ]).then(response => {
        purchaseProduct(response.id, response.quantity);
    });
}

function unableToProcessPrompt(id, productName, quantityAvailable){
    console.log('\nTrasaction Failed!'.bold.red);
    console.log(`\nWe don't have enough in stock to meet that order:\nProduct: ${productName} | Quantity In Stock: ${quantityAvailable}`);
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'updateQuantity',
            message: "Would you like to update the quantity you'd like to purchase?",
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to buy?',
            when: function(response){
                return response.updateQuantity;
            }
        }
    ]).then(response => {
        if (response.updateQuantity){
            purchaseProduct(id, response.quantity);
        } else {
            getAllProducts();
        }
    });
}

function keepShoppingPrompt(){
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'keepShopping',
            message: 'Would you like to keep shopping?'
        }
    ]).then(response => {
        if (response.keepShopping){
            getAllProducts();
        } else {
            process.exit();   
        }
    });
}

function purchaseProduct(id, quantity){
    utils.getProductById(id, 
        function(err, res){
            if (err) throw err;
            
            var productName = res[0][globals.productNameCol];
            var quantityAvailable = res[0][globals.stockQtyCol];
            var desiredQuantity = Number(quantity);
            if (quantityAvailable < desiredQuantity){
                unableToProcessPrompt(id, productName, quantityAvailable);
            } else {
                processTransaction(id, quantityAvailable-desiredQuantity);
            }
    });
}

function processTransaction(id, quantity){
    utils.connection.query(
        `UPDATE ${globals.productsTableName}
        SET ${globals.stockQtyCol}=${quantity}
        WHERE ${globals.itemIdCol}=${id}`,
        function(err, res){
            if (err) throw err;
            console.log('\nTransaction Successfully Processed'.bold.green);
            keepShoppingPrompt();
        });
}

function getAllProducts(){
    utils.getAllProducts(function(err, res){
        if (err) throw err;``
        itemIds = utils.extractItemIds(res);
        utils.printProducts(res);
        purchasePrompt();
    });
}

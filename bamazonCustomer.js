// Import Node libraries.
var colors = require('colors');
var inquirer = require('inquirer');
var mysql = require('mysql');
var table = require('table');

// Database globals.
var databaseName = 'bamazon';
var productsTableName = "products";
var itemIdCol = "item_id";
var stockQtyCol = "stock_quantity";
var productNameCol = "product_name";
var itemIds = [];

// Create the MySQL database connection.
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: databaseName
});

// Attempt to establish a connection with the database.
connection.connect(function(error){
    if (error) throw `Error occurred while connection to "${databaseName}" MySQl database:\n${error}`;
})

// Start the application.
console.log("\nWELCOME TO BAMAZON!\n");
console.log("Here's a list of all available products in the store:\n");
getAllProducts();

function purchasePrompt(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: "What's the Item ID of the product you'd like to purchase?",
            validate: function(id){
                return itemIds.includes(id) ? true : `Item ID '${id}' not found in the store.`;
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
    console.log(`\nWe don't have enough in stock to meet that order:\nProduct: ${productName} | Quantity In Stock: ${quantityAvailable}\n`);
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
    getProductById(id, 
        function(err, res){
            if (err) throw err;
            
            var productName = res[0][productNameCol];
            var quantityAvailable = res[0][stockQtyCol];
            var desiredQuantity = Number(quantity);
            if (quantityAvailable < desiredQuantity){
                unableToProcessPrompt(id, productName, quantityAvailable);
            } else {
                processTransaction(id, quantityAvailable-desiredQuantity);
            }
    });
}

function processTransaction(id, quantity){
    connection.query(
        `UPDATE ${productsTableName}
        SET ${stockQtyCol}=${quantity}
        WHERE ${itemIdCol}=${id}`,
        function(err, res){
            if (err) throw err;
            console.log('\nTransaction Successfully Processed\n'.bold.green);
            keepShoppingPrompt();
        });
}

function printProducts(rows){
    itemIds = [];
    var output = [];
    for (let i = 0; i < rows.length; i++) {
        // For the header row, get the object keys (only need to do this once).
        if (i == 0){
            output.push(Object.keys(rows[i]));
        }

        // Itereate through each row object and extract the values of each field.
        var row = [];
        for(var col in rows[i]){
            row.push(rows[i][col]);
            if (col === itemIdCol){
                itemIds.push(String(rows[i][col]));
            }
        }
        output.push(row);
    }

    // Print rows in a nice table format.
    console.log(table.table(output));
}


// #### MYSQL Functions #### //
function getAllProducts(){
    connection.query(`SELECT * FROM ${productsTableName}`, function(err, res){
        if (err) throw err;

        printProducts(res);
        purchasePrompt();
    });
}

function getProductById(id, callback){
    connection.query(
        `SELECT * FROM ${productsTableName} WHERE ?`,
        [
            {
                item_id: id
            }
        ],
        callback);
}

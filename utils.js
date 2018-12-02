var globals = require('./globals');
var table = require('table');
var mysql = require('mysql');

// Create the MySQL database connection.
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: globals.databaseName
});

exports.connection = connection;

exports.getAllProducts = function(callback){
    connection.query(`SELECT * FROM ${globals.productsTableName}`, callback);
}

exports.getProductById = function(id, callback){
    connection.query(
        `SELECT * FROM ${globals.productsTableName} WHERE ${globals.itemIdCol}=?`,
        [id],
        callback
    );
}

exports.addAProduct = function(product, callback){
    connection.query(
        `INSERT INTO ${globals.productsTableName} (${product.fields.join(",")}) VALUES (?)`,
        [product.values],
        callback
    );
}

exports.extractItemIds = function(rows){
    return rows.map(row => row[globals.itemIdCol]);
}

exports.printProducts = function(rows){
    var output = [];
    for (let i = 0; i < rows.length; i++) {
        // Extract the header fields by grabbing the object keys of the first row (only needed once).
        if (i == 0){
            output.push(Object.keys(rows[i]));
        }

        // Itereate through each row object and extract the values of each field.
        var row = [];
        for(var col in rows[i]){
            row.push(rows[i][col]);
        }
        output.push(row);
    }
    
    // Print rows in a nice table format.
    console.log('\n' + table.table(output) + '\n');
}
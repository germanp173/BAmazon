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
        callback);
}

exports.printProducts = function(rows){
    var itemIds = [];
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
            if (col === globals.itemIdCol){
                itemIds.push(String(rows[i][col]));
            }
        }
        output.push(row);
    }

    // Print rows in a nice table format.
    console.log('\n' + table.table(output) + '\n');
    return itemIds;
}
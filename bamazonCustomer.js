var mysql = require('mysql');
var inquirer = require('inquirer');
// var table = require('table');
// console.log(table);
var cTable = require('console.table');
// console.log(cTable);

var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

connection.connect(function (error) {
    if (error) {
        console.error('error connecting: ' + error.stack);
        return;
    };

    console.log('connected as id ' + connection.threadId);
});
function userChoice() {
    connection.query("select * from products;", function (err, res) {
        // console.log(res);
        if (err) throw err;
        var arrProducts = [];
        for (var i = 0; i < res.length; i++) {
            // console.log(`${res[i].item_id}. ${res[i].product_name}. ${res[i].stock_quantity}`);

        }
        inquirer.prompt([
            {
                message: "What is the ID of the product?",
                type: "input",
                choices: arrProducts,
                name: "item_id"
            },
            {
                type: "input",
                message: "How many units of the product would you like to buy?",
                name: "unit_products"

            }
        ]).then(function (answers) {
            //displaying the result of user input
            var id = answers.item_id;
            var quantity = answers.unit_products;
            console.log("*******************************************************************");

            console.log("Chosen Product ID: " + id);
            console.log("*********************************************************************");

            console.log("The Total amount of Products Selected: " + quantity);
            console.log("*********************************************************************");


            connection.query("select * from products where item_id =" + id, function (err, response) {
                console.log(response);
                if (err) throw err;
                //checking if we have user's request in stock
                if (response[0].stock_quantity - quantity <= 0) {
                    console.log("############INSUFFICIENT QUANTITY!!!############");



                } else {
                    console.log("*********************YOUR ORDER IS  SUCCESSFULLY PLACED!!!!****************");
                    // connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [response[0].stock_quantity - quantity, id],
                    //     function (error, resp) {
                    //         if (error) throw error;
                    //         // console.log(resp);
                    //     });

                }

            });

        });


    });
}




//applie npm console.log to display data in better way
var values = [
    [1, "Camera", "Electronics", 60, 80],
    [2, "Printer", "Electronics", 45, 50],
    [3, "Red Skirt", "Clothes", 20, 100],
    [4, "White Socks", "Clothes", 4.5, 150],
    [5, "Black Shirt", "Clothes", 12.4, 50],
    [6, "Dums", "Toys", 3.4, 200],
    [7, "Barbie", "Toys", 34.7, 500],
    [8, "Cars", "Toys", 1.34, 290],
    [9, "Pillow", "Home", 7.90, 140],
    [10, "Blanket", "Home", 10, 80],
    [11, "Tide", "Household", 12.9, 400],
    [12, "Dove Soap", "Household", 0.9, 1000],
    [13, "Computer mouse", "Electronics", 5.67, 200],
    [14, "Face Cream", "Beauty", 34.6, 40],
    [15, "Red Lip-Stick", "Beauty", 10.00, 35],
    [16, "Pink Blush", "Beauty", 24.7, 25]

]
console.table(["item_id", "product_name", "department_name", "price", "stock_quantity"], values);


userChoice();


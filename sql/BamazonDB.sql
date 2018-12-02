DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

CREATE TABLE `bamazon`.`products` (
`item_id` int(11) NOT NULL AUTO_INCREMENT,
`product_name` varchar(100) NOT NULL,
`department_name` varchar(100) NOT NULL,
`price` double NOT NULL,
`stock_quantity` int(11) NOT NULL,
PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

USE bamazon;
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUE('Muffins', 'Bakery', 7.99, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUE('Bread', 'Bakery', 5.45, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUE('Band Aids', 'Pharmacy', 2.99, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUE('Shampoo', 'Personal Care', 10.99, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUE('Bananas', 'Produce', 4.25, 300);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUE('Headphones', 'Electronics', 50.46, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUE('Tool Box', 'Hardware', 40.99, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUE('Bicycle', 'Athletics', 125, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUE('Towel', 'Home', 5, 400);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUE('Lamp', 'Decor', 35, 10);

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


create database bamazon;
use bamazon;
create table products
(
    item_id integer not null
    auto_increment,
product_name varchar
    (15) not null,
department_name varchar
    (20) not null,
price decimal
    (10, 2) not null,
stock_quantity integer
    (5),
primary key
    (item_id)
);
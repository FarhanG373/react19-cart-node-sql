import mySql from 'mysql';

export const conn = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cart_node_next_sql'
});
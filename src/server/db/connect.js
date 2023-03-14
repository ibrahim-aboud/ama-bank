const mysql = require("mysql2/promise");

async function connect() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  return connection;
}

export default async function dbQuery(query, values) {
  const connection = await connect();
  const [rows, fields] = await connection.query(query, values);
  connection.end();

  return rows;
}

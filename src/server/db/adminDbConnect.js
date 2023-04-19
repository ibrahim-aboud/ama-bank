const mysql = require("mysql2/promise");

async function connect() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_ADMIN_HOST,
    port: process.env.MYSQL_ADMIN_PORT,
    user: process.env.MYSQL_ADMIN_USER,
    password: process.env.MYSQL_ADMIN_PASSWORD,
    database: process.env.MYSQL_ADMIN_DATABASE,
  });

  return connection;
}

export default async function dbQuery(query, values) {
  const connection = await connect();
  const [rows, fields] = await connection.query(query, values);
  connection.end();

  return rows;
}

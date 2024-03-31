const mysql = require("mysql2/promise");

async function connect() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_ARCHIV_HOST,
      port: process.env.MYSQL_ARCHIV_PORT,
      user: process.env.MYSQL_ARCHIV_USER,
      password: process.env.MYSQL_ARCHIV_PASSWORD,
      database: process.env.MYSQL_ARCHIV_DATABASE,
    });

    return connection;
  } catch (err) {
    console.error("error of connexion");
    throw err;
  }
}

export default async function dbQueryArchive(query, values) {
  const connection = await connect();
  const [rows, fields] = await connection.query(query, values);
  connection.end();

  return rows;
}
//.env

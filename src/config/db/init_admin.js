const crypto = require('crypto');
const mysql = require('mysql2');
const readline = require('readline');

const info = {
    secret: "FE123E51947",
    host:'localhost',
    port: 3306,
    user: "f100w",
    password: "user",
    database: "db_amabank"
}

// create a connection to the MySQL server
const connection = mysql.createConnection({
  host:info.host,
  port: info.port,
  user:info.user,
  password:info.password,
  database:'db_admin_amabank'
});

// Create an interface for reading input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function sha256(data) {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
}

const usage = `USAGE: node /path/to/this/script/init_admin.js "admin_username" "admin_email" "admin_password"`

const args = process.argv.slice(2)

if (args.length!=3){
    console.log(usage);
    process.exit(-1) ;
}

var confirm = `Confirm your data:
username: ${args[0]}
email: ${args[1]}
password: ${args[2]}
Is this correct ? [Y/N]`

rl.question(confirm, (name) => {
    if (name.toLocaleLowerCase()!='y'){
        console.log("aborted");
        process.exit(1) ;
    }

    const password = sha256(args[2] + info.secret) ;
    
    var query = "INSERT INTO ab_admins (admin_name,admin_email,admin_password) VALUES (?,?,?)"
    connection.query(query,[args[0],args[1],password],(res,err)=>{
        if (err) {
            console.log(err) ;
        } else {
            console.log("admin account inserted successfully",res);
        }
    }) ;

    // Close the interface
    connection.end((error) => {
        if (error) {
          console.error('Error disconnecting from the MySQL server:', error);
          return;
        }
      
        console.log('Disconnected from MySQL server.');
    });

    rl.close();
});


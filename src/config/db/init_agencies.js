const mysql = require('mysql2');

// create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Inzel@2004',
  database: 'db_amabank'
});

connection.connect((error) => {
    if (error) {
      console.error('Error connecting to the MySQL server:', error);
      return;
    }
    console.log('Connected to MySQL server.');
  });
  
  let jsonData = require("../../../public/data/agencies/alsalambankagencies.json");
  for(let i of jsonData.agencies){
            let fax = null, phone = null, locationLink = null
            if(i.agency_phone){
                phone = "'"
                phone += i.agency_phone
                phone += "'"
            }
            if(i.agency_fax){
                fax = "'"
                fax += i.agency_fax
                fax += "'"
            }
            if(i.agency_location_link){
                locationLink = "'"
                locationLink += i.agency_location_link
                locationLink += "'"
            }
            insertQuery = `INSERT INTO ab_agencies VALUES (${null}, ${1}, '${i.agency_address}',
            ${i.agency_lat}, ${i.agency_lng}, ${16},
            ${phone}, ${fax}, ${locationLink})`;
            
        connection.query(insertQuery, (error, result) => {
        if (error) throw error;
        console.log(`Inserted row with id ${result.insertId}`);
        });

  }
  connection.end((error) => {
    if (error) {
      console.error('Error disconnecting from the MySQL server:', error);
      return;
    }
    console.log('Disconnected from MySQL server.');
  });
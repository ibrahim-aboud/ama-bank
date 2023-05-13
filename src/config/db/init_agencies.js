const mysql = require('mysql2');

// create a connection to the MySQL server
const connection = mysql.createConnection({
  // host: process.env.MYSQL_HOST,
  // user: process.env.MYSQL_USER,
  // password: process.env.MYSQL_PASSWORD,
  // database: process.env.MYSQL_DATABASE
  host:'localhost',
  user:'root',
  password:'password',
  database:'db_amabank'
});
connection.connect((error) => {
    if (error) {
      console.error('Error connecting to the MySQL server:', error);
      return;
    }
    console.log('Connected to MySQL server.');
  });
  
  
  let filesArray = [
    '../../../public/data/agencies/NatixisAlgérieAgencies.json',
    '../../../public/data/agencies/TRUSTBankAgencies.json',
    '../../../public/data/agencies/SocietegeneraleAgencies.json',
    '../../../public/data/agencies/alsalambankagencies.json',
    '../../../public/data/agencies/ARAB_BANK_ALGERIA_PLC_AGENCES.json',
    '../../../public/data/agencies/FRANSABANK_El_DJAZAIR_AGENCES.json',
    '../../../public/data/agencies/HousingBankAlgeriaAgencies.json',
    '../../../public/data/agencies/BDLAGENCIES.json',
    '../../../public/data/agencies/BNP_PARIBAS_EL_DJAZAIR_AGENCES.json'
  ];//lis
  for (let file of filesArray) {
    let jsonData = require(file);
    let bankIdPromise = new Promise((resolve, reject) => {
      
      connection.query(
        `SELECT * FROM db_amabank.ab_banks WHERE bank_name='${jsonData.bank_name}'`,
        (err, results) => {
          if (err) {
            console.error('Error fetching data: ' + err.stack);
            reject(err);
          } else {
            console.log('Data received from database:');
            resolve(results[0].id_bank);
          }
        }
      );
    });
  
    bankIdPromise.then((bankId) => {
      for (let i of jsonData.agencies) {
        let fax = null,
          phone = null,
          locationLink = null;
        if (i.agency_phone) {
          phone = "'";
          phone += i.agency_phone;
          phone += "'";
        }
        if (i.agency_fax) {
          fax = "'";
          fax += i.agency_fax;
          fax += "'";
        }
        if (i.agency_location_link) {
          locationLink = "'";
          locationLink += i.agency_location_link;
          locationLink += "'";
        }
        insertQuery = `INSERT INTO ab_agencies VALUES (${null}, ${bankId}, '${i.agency_address}',
          ${i.agency_lat}, ${i.agency_lng}, ${i.agency_wilaya},
          ${phone}, ${fax}, ${locationLink}, '${i.agency_location}')`;
        connection.query(insertQuery, (error, result) => {
          if (error) {
            console.error('Error while inserting', error);
            return;
          };
          console.log(`Inserted row with id ${result.insertId}`);
        });
      }
      
    }).catch((err) => {
      console.error('Error fetching bankId: ' + err.stack);
    });
  }
  // connection.end((error) => {
  //   if (error) {
  //     console.error('Error disconnecting from the MySQL server:', error);
  //     return;
  //   }
  //   console.log('Disconnected from MySQL server.');
  // });
  




const mysql = require('mysql2');

// create a connection to the MySQL server
const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'password',
  database:'db_amabank'
});

let filesArray = [
    '../../../public/data/banks/NatixisAlgérie.json',
    '../../../public/data/banks/TRUSTBank.json',
    '../../../public/data/banks/SocieteGenerale.json',
    '../../../public/data/banks/alSalamBankAlgerie.json',
    '../../../public/data/banks/ARAB_BANK_ALGERIA_PLC.json',
    '../../../public/data/banks/FRANSABANK_EL_DJAZAIR.json',
    '../../../public/data/banks/HousingBankAlgeria.json',
    '../../../public/data/banks/BDL.json',
    '../../../public/data/banks/BNP_PARIBAS_EL_DJAZAIR.json'
];//liste of files

// connect to the MySQL server
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the MySQL server:', error);
    return;
  }
  console.log('Connected to MySQL server.');
});

//insertion des informations du site
insertQuery = `INSERT INTO ab_info VALUES(DEFAULT, "+213 21 98 53 99", "support@amaBank.com", "+213 21 98 53 99", "amaBank est une plateforme de comparaison des offres de prestataires
                bancaires actifs en Algérie. Elle offre la possibilité de consulter toutes les informations relatives à
                l''ouverture, la fermeture et la gestion d''un compte bancaire.", "https://www.facebook.com/amabank", "https://www.linkedin.com/amabank", "https://www.instagram.com/amabank", "https://twitter.com/amabank");`
connection.query(insertQuery, (error, result) => {
    if (error) throw error;
    console.log(`Inserted row with id ${result.insertId}`);
});


//insert the JSON data into the tables
let category = ["ouverture de compte", "tenue de compte", "fermeture de compte", "Versement", "Virement", "Retrait", "chèque", "CIB", "VISA", "MASTERCARD","COORPORATE"]
for(let categoryName of category) {   
    insertQuery = `INSERT INTO ab_categories VALUES(${null}, '${categoryName}')`;
    connection.query(insertQuery, (error, result) => {
        if (error) throw error;
        console.log(`Inserted row with id ${result.insertId}`);
    });
}


let bank_id = 1;//manuellement pour mettre les relations entre les tables

for(let file of filesArray){
        let jsonData = require(file);//import the json file 

        //insert the bank infos
        let insertQuery = `INSERT INTO ab_banks VALUES (${bank_id}, '${jsonData.bank_name}', '${jsonData.bank_description}' ,${0}, 
                          '${jsonData.website_link}', '${jsonData.date_prestations}')`;
                               
        connection.query(insertQuery, (error, result) => {
        if (error) throw error;
        console.log(`Inserted row with id ${result.insertId}`);
        });

        //insert in ab_dgs
        insertQuery = `INSERT INTO ab_dgs VALUES (${null}, ${bank_id}, '${jsonData.dg_address}',
            ${jsonData.dg_lat}, ${jsonData.dg_lng}, ${jsonData.dg_wilaya},
            '${jsonData.dg_phone}', '${jsonData.dg_fax}', '${jsonData.dg_location_link}')`;
            
        connection.query(insertQuery, (error, result) => {
        if (error) throw error;
        console.log(`Inserted row with id ${result.insertId}`);
        });

        let typePrestation = ["particulier", "professionnel", "entreprise"];//
        let categoryOperation = ["Gestion et tenue de compte", "Opération de paiement", "Monétique"]
        const tabTypePrestations = [jsonData.prestations_indiv, jsonData.prestations_prof, jsonData.prestations_ets]//ahya smail nta sbabna derna 5 boucles
        
        let cpt = 0;//Savoir quelle type de prestation
        for(let i of tabTypePrestations){//boucler sur le fichier jSon
            let idCatigorie = 0;//categories id
            for(let j in i){
                let jData = i[j]//tables of ...
                //Boucler sur les types de comptes (particuler...)
                if(idCatigorie != 2){//we have a special representation for monetics
                    for(let element of jData){//boucler sur le type de l'operation
                        
                        if(element.tarif != null){
                            let insertQuery = `INSERT INTO ab_prestations VALUES(${null},${bank_id},'${element.nom_prestation}',
                            ${category.indexOf(element.categorie) + 1}, '${typePrestation[cpt]}', ${element.tarif}, ${element.period}, '${categoryOperation[idCatigorie]}')`;

                            connection.query(insertQuery, (error, result) => {
                                if (error) throw error;
                                console.log(`Inserted row with id ${result.insertId}`);
                            });
                        }     
                    }
                } else {
                    //Il faut decider si on ajoute CARTE CIB...
                    for(let k in jData){
                        //CIB et CARTE INTERNATIONAL, ...
                        let kData = jData[k]
                        for(let element of kData){
                            
                            if(element.tarif != null){
                                let insertQuery = `INSERT INTO ab_prestations VALUES(${null},${bank_id},'${element.nom_prestation}',
                                ${category.indexOf(element.categorie) + 1}, '${typePrestation[cpt]}', ${element.tarif}, ${element.period}, '${categoryOperation[idCatigorie]}')`;

                                connection.query(insertQuery, (error, result) => {
                                    if (error) throw error;
                                    console.log(`Inserted row with id ${result.insertId}`);
                                });
                            }   
                        }
                    }
                }
                idCatigorie++;
            }
            cpt++;//i can use the bank id but to make things clear i wont
        }
        bank_id++;
    }

// close the connection to the MySQL server
connection.end((error) => {
  if (error) {
    console.error('Error disconnecting from the MySQL server:', error);
    return;
  }

  console.log('Disconnected from MySQL server.');
});

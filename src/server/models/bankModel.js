import FilesHelpers from "@/lib/utils/FilesHelpers";
import ModelError from "../../lib/utils/ModelError";
import dbQuery from "../db/connect";
import dbQueryArchive from "../db/connectArchiv";
import { errorMessages } from "@/lib/utils/errorMessages";

export default class Bank {
  constructor(id, name, description, visitsCount, websiteLink, updateDate) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.visitsCount = visitsCount;
    this.websiteLink = websiteLink;
    this.updateDate = updateDate
      ? updateDate
      : new Date().toJSON().slice(0, 10);

    this.logoLink = Bank.#getLogoLink(id);
    this.imageLink = Bank.#getImageLink(id);
  }

  static #getLogoLink(id) {
    try {
      const dirPath = "public/assets/logos/banks_logos";
      const logos = FilesHelpers.getAllDirectoryFiles(dirPath);

      const logo = logos.find((logo) => logo.split(".")[0] == id);
      return logo ? "/assets/logos/banks_logos/" + logo : "";
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }
  }

  static #getImageLink(id) {
    try {
      const dirPath = "public/assets/images/banks_images";
      const images = FilesHelpers.getAllDirectoryFiles(dirPath);

      const image = images.find((image) => image.split(".")[0] == id);
      return image ? "/assets/images/banks_images/" + image : "";
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }
  }

  static async getAllBanks() {
    try {
      var data = await dbQuery("SELECT * FROM ab_banks");
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    var result = data.map((bank) => {
      return new Bank(
        bank.id_bank,
        bank.bank_name,
        bank.bank_description,
        bank.bank_visits_count,
        bank.bank_website_link,
        bank.bank_update_date
      );
    });

    return result;
  }

  static async getBankById(id) {
    try {
      var data = await dbQuery("SELECT * FROM ab_banks WHERE id_bank=(?)", [
        id,
      ]);
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    if (data.length == 0) {
      return null;
    } else {
      return new Bank(
        data[0].id_bank,
        data[0].bank_name,
        data[0].bank_description,
        data[0].bank_visits_count,
        data[0].bank_website_link,
        data[0].bank_update_date
      );
    }
  }

  static async getBankByName(name) {
    try {
      var data = await dbQuery("SELECT * FROM ab_banks WHERE bank_name=(?)", [
        name,
      ]);
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    if (data.length == 0) {
      return null;
    } else {
      return new Bank(
        data[0].id_bank,
        data[0].bank_name,
        data[0].bank_description,
        data[0].bank_visits_count,
        data[0].bank_website_link,
        data[0].bank_update_date
      );
    }
  }

  static async insertBank(bank) {
    try {
      const { name, description, websiteLink } = bank;

      var data = await dbQuery(
        "INSERT INTO ab_banks (bank_name,bank_description,bank_website_link) VALUES (?,?,?)",
        [name, description, websiteLink]
      );
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    return data;
  }

  static async updateBank(bank) {
    try{
      var row = await dbQuery("SELECT * FROM db_amabank.ab_banks WHERE id_bank=(?)", [bank.id])
    } catch(err){
      throw new ModelError(errorMessages.serverError, 502);
    }
    try{
      console.log(row[0])
      var dataToAchive = await dbQueryArchive(
      "INSERT INTO db_amabank_archive.ab_banks VALUES((?), (?), (?), (?), (?), (?), (?), NOW(), 'MODIFIED')", 
      [null, row[0].id_bank, row[0].bank_name, row[0].bank_description, row[0].bank_visits_count, row[0].bank_website_link, 
      row[0].bank_update_date]
          )
    } catch(err){
        throw new ModelError(errorMessages.serverError,501) ; 
    }
    try {
      var data = await dbQuery(
        "UPDATE ab_banks SET bank_name=(?), bank_description=(?), bank_visits_count=(?), bank_website_link=(?) WHERE id_bank=(?)",
        [
          bank.name,
          bank.description,
          bank.visitsCount,
          bank.websiteLink,
          // bank.updateDate,
          bank.id,
        ]
      );
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    return data;
  }

  static async deleteBank(id) {
    try{
      var row = await dbQuery("SELECT * FROM db_amabank.ab_banks WHERE id_bank=(?)", [id])
    } catch(err){
      throw new ModelError(errorMessages.serverError, 502);
    }
    try{
      var dataToAchive = await dbQueryArchive(
      "INSERT INTO db_amabank_archive.ab_banks VALUES((?), (?), (?), (?), (?), (?), (?), NOW(), 'DELETED')", 
      [null, row[0].id_bank, row[0].bank_name, row[0].bank_description, row[0].bank_visits_count, row[0].bank_website_link, 
      row[0].bank_update_date]
          )
    } catch(err){
        throw new ModelError(errorMessages.serverError,501) ; 
    }
    try{

      var rowPres = await ddbQuery("SELECT * FROM db_amabank.ab_prestations WHERE prestation_bank_id=(?)", [id])
    
    } catch(err){
        throw new ModelError(errorMessages.serverError,503) ; 
    }
    try{
      if(rowPres.length != 0){
        var dataToInsertPres = await dbQueryArchive(
          "INSERT INTO db_amabank_archive.ab_prestations VALUES((?), (?), (?), (?), (?), (?), (?), (?), (?), NOW(), 'INSERTED')", 
          [null, rowPres[0].id_prestation, rowPres[0].prestation_bank_id, rowPres[0].prestation_name, rowPres[0].prestation_categorie_id, rowPres[0].prestation_type, 
          rowPres[0].prestation_tarif, rowPres[0].prestation_period, rowPres[0].prestation_categorie_operation]
              )
      }
    } catch(err){
        throw new ModelError(errorMessages.serverError,504) ; 
    }
    try{

      var rowAgen = await ddbQuery("SELECT * FROM db_amabank.ab_agencies WHERE agency_bank_id=(?)", [id])
    
    } catch(err){
        throw new ModelError(errorMessages.serverError,505) ; 
    }
    try{
      if(rowAgen.length != 0){
        var dataToArchiveAgencies = await dbQueryArchive(
          "INSERT INTO db_amabank_archive.ab_agencies VALUES((?), (?), (?), (?), (?), (?), (?), (?), (?), (?), NOW(), 'INSERTED')", 
          [null, rowAgen[0].id_agency, rowAgen[0].agency_bank_id, rowAgen[0].agency_address, rowAgen[0].agency_lat, rowAgen[0].agency_lng, 
          rowAgen[0].agency_wilaya, rowAgen[0].agency_phone, rowAgen[0].agency_fax, rowAgen[0].agency_location_link]
          ) 
      }
    } catch(err){
        throw new ModelError(errorMessages.serverError,506) ; 
    }
    try{

      var rowDg = await ddbQuery("SELECT * FROM db_amabank.ab_dgs WHERE dg_bank_id=(?)", [id])
    
    } catch(err){
        throw new ModelError(errorMessages.serverError,507) ; 
    }
    try{
      if(rowDg.length != 0){
        var dataToArchiveDgs = await dbQueryArchive(
            "INSERT INTO db_amabank_archive.ab_dgs VALUES((?), (?), (?), (?), (?), (?), (?), (?), (?), (?), NOW(), 'INSERTED')", 
            [null, rowDg[0].id_dg, rowDg[0].dg_bank_id, rowDg[0].dg_address, rowDg[0].dg_lat, rowDg[0].dg_lng, 
            rowDg[0].dg_wilaya, rowDg[0].dg_phone, rowDg[0].dg_fax, rowDg[0].dg_location_link]
                )
      }
    } catch(err){
        throw new ModelError(errorMessages.serverError,508) ; 
    }
    try {

      var data = await dbQuery("DELETE FROM ab_banks WHERE id_bank=(?)", [id]);

    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    return data;
  }
}

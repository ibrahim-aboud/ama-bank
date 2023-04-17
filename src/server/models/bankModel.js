import FilesHelpers from "@/lib/utils/FilesHelpers";
import ModelError from "../../lib/utils/ModelError";
import dbQuery from "../db/connect";
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
      return logo ? "public/assets/logos/banks_logos/" + logo : "";
    } catch(err){
      throw new ModelError(errorMessages.serverError,500) ;
    }
  }

  static #getImageLink(id) {
    try {
      const dirPath = "public/assets/images/bank_images";
      const images = FilesHelpers.getAllDirectoryFiles(dirPath);
  
      const image = images.find((image) => image.split(".")[0] == id);
      return image ? "public/assets/images/bank_images" + image : "";
    } catch(err){
      throw new ModelError(errorMessages.serverError,500) ;
    }﻿
  }

  static async getAllBanks() {
    try {
      var data = await dbQuery("SELECT * FROM ab_banks") ;
    } catch(err){
        throw new ModelError(errorMessages.serverError,500) ;
    }

    var result = data.map(bank=>{
        return new Bank(
            bank.id_bank, 
            bank.bank_name,
            bank.bank_description,
            bank.bank_visits_count,
            bank.bank_website_link,
            bank.bank_update_date,
        )
    })

    return result ;
 
  }

  static async getBankById(id) {
    
    try {
      var data = await dbQuery("SELECT * FROM ab_banks WHERE id_bank=(?)", [id]);
      
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    if (data.length==0){
      return null ;
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

  static async getBankByName(name){
    try {
     
      var data = await dbQuery("SELECT * FROM ab_banks WHERE bank_name=(?)", [name]);
      
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    if (data.length==0){
      return null ;
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

  static async insertBank(bank){
    
    try {
        const {name,description,websiteLink}= bank ;

        var data = await dbQuery("INSERT INTO ab_banks (bank_name,bank_description,bank_website_link) VALUES (?,?,?)", [name,description,websiteLink])

    } catch(err){
        throw new ModelError(errorMessages.serverError,500) ;
    }

    return data ;
}

  static async updateBank(bank) {

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

    return data ;
  }

  static async deleteBank(id){

    try {
        var data = await dbQuery("DELETE FROM ab_banks WHERE id_bank=(?)",[id]) ;
    
    } catch (err){
        throw new ModelError(errorMessages.serverError,500) ;
    }

    return data ;
}
}

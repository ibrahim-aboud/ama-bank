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
    // try {
    //   const dirPath = "public/assets/logos/banks_logos";
    //   const logos = FilesHelpers.getAllDirectoryFiles(dirPath);

    //   const logo = logos.find((logo) => logo.split(".")[0] == id);
    //   return logo ? "/assets/logos/banks_logos/" + logo : "";
    // } catch (err) {
    //   throw new ModelError(errorMessages.serverError, 500);
    // }

    return "/assets/logos/logo.png";
  }

  static #getImageLink(id) {
    // try {
    //   const dirPath = "public/assets/images/banks_images";
    //   const images = FilesHelpers.getAllDirectoryFiles(dirPath);

    //   const image = images.find((image) => image.split(".")[0] == id);
    //   return image ? "/assets/images/banks_images/" + image : "";
    // } catch (err) {
    //   throw new ModelError(errorMessages.serverError, 500);
    // }

    return "/assets/logos/logo.png";
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

  // possibly here when deleting a big sized bank because with empty banks it deletes without any problem
  // some times it even says took too long or somth
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
      var date = new Date();
      var day = date.getDay();
      var month = date.getMonth();
      var year = date.getFullYear();
      var data = await dbQuery(
        "INSERT INTO ab_banks (bank_name,bank_description,bank_website_link,bank_update_date) VALUES (?,?,?,?)",
        [name, description, websiteLink, year + "-" + month + "-" + day]
      );
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    return data;
  }

  static async updateBank(bank) {
    try {
      var row = await dbQuery("SELECT * FROM ab_banks WHERE id_bank=(?)", [
        bank.id,
      ]);
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 502);
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
    try {
      var date = new Date();
      var day = date.getDay();
      var month = date.getMonth();
      var year = date.getFullYear();
      var dataToArchive = await dbQueryArchive(
        "INSERT INTO ab_banks VALUES((?), (?), (?), (?), (?), (?), (?), '" +
          year +
          "-" +
          month +
          "-" +
          day +
          "', 'MODIFIED')",
        [
          null,
          row[0].id_bank,
          row[0].bank_name,
          row[0].bank_description,
          row[0].bank_visits_count,
          row[0].bank_website_link,
          row[0].bank_update_date,
        ]
      );
      return data;
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 501);
    }
  }

  static async deleteBank(id) {
    try {
      var row = await dbQuery("SELECT * FROM ab_banks WHERE id_bank=(?)", [id]);
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 502);
    }
    try {
      var rowPres = await dbQuery(
        "SELECT * FROM ab_prestations WHERE prestation_bank_id=(?)",
        [id]
      );
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 503);
    }

    try {
      var rowAgen = await dbQuery(
        "SELECT * FROM ab_agencies WHERE agency_bank_id=(?)",
        [id]
      );
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 505);
    }
    try {
      var rowDg = await dbQuery("SELECT * FROM ab_dgs WHERE dg_bank_id=(?)", [
        id,
      ]);
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 507);
    }
    try {
      // possibly here when deleting heavy banks since light weight banks are deleted no problem
      // some times it even says took too long or somth
      var data = await dbQuery("DELETE FROM ab_banks WHERE id_bank=(?)", [id]);
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    try {
      var date = new Date();
      var day = date.getDay();
      var month = date.getMonth();
      var year = date.getFullYear();
      var dataToAchive = await dbQueryArchive(
        "INSERT INTO ab_banks VALUES((?), (?), (?), (?), (?), (?), (?), '" +
          year +
          "-" +
          month +
          "-" +
          day +
          "', 'DELETED')",
        [
          null,
          row[0].id_bank,
          row[0].bank_name,
          row[0].bank_description,
          row[0].bank_visits_count,
          row[0].bank_website_link,
          row[0].bank_update_date,
        ]
      );
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 501);
    }
    try {
      var date = new Date();
      var day = date.getDay();
      var month = date.getMonth();
      var year = date.getFullYear();
      for (let i in rowAgen) {
        var dataToArchiveAgencies = await dbQueryArchive(
          "INSERT INTO ab_agencies VALUES((?), (?), (?), (?), (?), (?), (?), (?), (?), (?), '" +
            year +
            "-" +
            month +
            "-" +
            day +
            "', 'INSERTED')",
          [
            null,
            rowAgen[i].id_agency,
            rowAgen[i].agency_bank_id,
            rowAgen[i].agency_address,
            rowAgen[i].agency_lat,
            rowAgen[i].agency_lng,
            rowAgen[i].agency_wilaya,
            rowAgen[i].agency_phone,
            rowAgen[i].agency_fax,
            rowAgen[i].agency_location_link,
          ]
        );
      }
    } catch (err) {
      console.log(err);
      throw new ModelError(errorMessages.serverError, 506);
    }

    try {
      var date = new Date();
      var day = date.getDay();
      var month = date.getMonth();
      var year = date.getFullYear();
      for (let i in rowPres) {
        var dataToInsertPres = await dbQueryArchive(
          "INSERT INTO ab_prestations VALUES((?), (?), (?), (?), (?), (?), (?), (?), (?), '" +
            year +
            "-" +
            month +
            "-" +
            day +
            "', 'INSERTED')",
          [
            null,
            rowPres[i].id_prestation,
            rowPres[i].prestation_bank_id,
            rowPres[i].prestation_name,
            rowPres[i].prestation_categorie_id,
            rowPres[i].prestation_type,
            rowPres[i].prestation_tarif,
            rowPres[i].prestation_period,
            rowPres[i].prestation_categorie_operation,
          ]
        );
      }
    } catch (err) {
      //HERE
      throw new ModelError(errorMessages.serverError, 504);
    }
    try {
      var date = new Date();
      var day = date.getDay();
      var month = date.getMonth();
      var year = date.getFullYear();
      if (rowDg.length != 0) {
        var dataToArchiveDgs = await dbQueryArchive(
          "INSERT INTO ab_dgs VALUES((?), (?), (?), (?), (?), (?), (?), (?), (?), (?), '" +
            year +
            "-" +
            month +
            "-" +
            day +
            "', 'INSERTED')",
          [
            null,
            rowDg[0].id_dg,
            rowDg[0].dg_bank_id,
            rowDg[0].dg_address,
            rowDg[0].dg_lat,
            rowDg[0].dg_lng,
            rowDg[0].dg_wilaya,
            rowDg[0].dg_phone,
            rowDg[0].dg_fax,
            rowDg[0].dg_location_link,
          ]
        );
      }
      return data;
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 508);
    }
  }
}

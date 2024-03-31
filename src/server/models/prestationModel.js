import { errorMessages } from "@/lib/utils/errorMessages";
import ModelError from "@/lib/utils/ModelError";
import dbQuery from "../db/connect";
import dbQueryArchive from "../db/connectArchiv";

export default class Prestation {
  constructor(
    id,
    bank_id,
    categorie_id,
    name,
    type,
    tarif,
    period,
    categorie_operation
  ) {
    this.id = id;
    this.bank_id = bank_id;
    this.categorie_id = categorie_id;
    this.name = name;
    this.type = type;
    this.tarif = tarif;
    this.period = period;
    this.categorie_operation = categorie_operation;
  }

  static async getEverything() {
    try {
      var data = await dbQuery("SELECT * from ab_prestations");
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    var result = data.map((prest) => {
      return new Prestation(
        prest.id_prestation,
        prest.prestation_bank_id,
        prest.prestation_categorie_id,
        prest.prestation_name,
        prest.prestation_type,
        prest.prestation_tarif,
        prest.prestation_period,
        prest.prestation_categorie_operation
      );
    });

    return result;
  }

  static async getAllPrestations(id) {
    var data = [];
    try {
      data = await dbQuery(
        "SELECT * from ab_prestations WHERE prestation_bank_id=(?)",
        [id]
      );
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    var result = data.map((prest) => {
      return new Prestation(
        prest.id_prestation,
        prest.prestation_bank_id,
        prest.prestation_categorie_id,
        prest.prestation_name,
        prest.prestation_type,
        prest.prestation_tarif,
        prest.prestation_period,
        prest.prestation_categorie_operation
      );
    });

    return result;
  }

  static async getPrestationById(id) {
    try {
      var data = await dbQuery(
        "SELECT * FROM ab_prestations WHERE id_prestation=(?)",
        [id]
      );
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    if (data.length == 0) {
      return null;
    } else {
      return new Prestation(
        data[0].id_prestation,
        data[0].prestation_bank_id,
        data[0].prestation_categorie_id,
        data[0].prestation_name,
        data[0].prestation_type,
        data[0].prestation_tarif,
        data[0].prestation_period,
        data[0].prestation_categorie_operation
      );
    }
  }

  static async getPrestationByName(id_bank, name, type) {
    try {
      var data = await dbQuery(
        "SELECT * FROM ab_prestations WHERE prestation_bank_id=(?) AND prestation_name=(?) AND prestation_type=(?)",
        [id_bank, name, type]
      );
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    if (data.length > 0) {
      return new Prestation(
        data[0].id_prestation,
        data[0].prestation_bank_id,
        data[0].prestation_categorie_id,
        data[0].prestation_name,
        data[0].prestation_type,
        data[0].prestation_tarif,
        data[0].prestation_period,
        data[0].prestation_categorie_operation
      );
    } else {
      return null;
    }
  }

  static async insertPrestation(prestation) {
    var data = [];
    try {
      const {
        bank_id,
        categorie_id,
        name,
        type,
        tarif,
        period,
        categorie_operation,
      } = prestation;

      data = await dbQuery(
        "INSERT INTO ab_prestations(prestation_bank_id,prestation_name,prestation_categorie_id,prestation_type,prestation_tarif,prestation_period,prestation_categorie_operation) VALUES (?,?,?,?,?,?,?)",
        [bank_id, name, categorie_id, type, tarif, period, categorie_operation]
      );
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    return data;
  }

  static async modifyPrestation(prestation) {
    const {
      id,
      bank_id,
      categorie_id,
      name,
      type,
      tarif,
      period,
      categorie_operation,
    } = prestation;
    try {
      var row = await dbQuery(
        "SELECT * FROM ab_prestations WHERE id_prestation=(?)",
        [id]
      );
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 502);
    }
    try {
      var data = await dbQuery(
        "UPDATE ab_prestations SET prestation_bank_id=(?), prestation_name=(?), prestation_categorie_id=(?), prestation_type=(?), prestation_tarif=(?), prestation_period=(?), prestation_categorie_operation=(?) WHERE id_prestation=(?)",
        [
          bank_id,
          name,
          categorie_id,
          type,
          tarif,
          period,
          categorie_operation,
          id,
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
      var dataToArchivePres = await dbQueryArchive(
        "INSERT INTO ab_prestations VALUES((?), (?), (?), (?), (?), (?), (?), (?), (?), (?), 'MODIFIED')",
        [
          null,
          row[0].id_prestation,
          row[0].prestation_bank_id,
          row[0].prestation_name,
          row[0].prestation_categorie_id,
          row[0].prestation_type,
          row[0].prestation_tarif,
          row[0].prestation_period,
          row[0].prestation_categorie_operation,
          "'" + year + "-" + month + "-" + day + "'",
        ]
      );
      return data;
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 501);
    }
  }

  static async deletePrestation(id) {
    try {
      var row = await dbQuery(
        "SELECT * FROM ab_prestations WHERE id_prestation=(?)",
        [id]
      );
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 502);
    }
    try {
      var data = await dbQuery(
        "DELETE FROM ab_prestations WHERE id_prestation=(?)",
        [id]
      );
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }
    try {
      var date = new Date();
      var day = date.getDay();
      var month = date.getMonth();
      var year = date.getFullYear();
      var dataToArchivePres = await dbQueryArchive(
        "INSERT INTO ab_prestations VALUES((?), (?), (?), (?), (?), (?), (?), (?), (?), '" +
          year +
          "-" +
          month +
          "-" +
          day +
          "', 'DELETED')",
        [
          null,
          row[0].id_prestation,
          row[0].prestation_bank_id,
          row[0].prestation_name,
          row[0].prestation_categorie_id,
          row[0].prestation_type,
          row[0].prestation_tarif,
          row[0].prestation_period,
          row[0].prestation_categorie_operation,
        ]
      );
      return data;
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 501);
    }
  }

  static async getAllTypes() {
    try {
      var data = await dbQuery(
        "SELECT DISTINCT prestation_type FROM ab_prestations"
      );
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    var result = data.map((type) => {
      return type.prestation_type;
    });

    return result;
  }

  static async getAllCategories() {
    try {
      var data = await dbQuery(
        "SELECT DISTINCT prestation_categorie_operation FROM ab_prestations"
      );
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    var result = data.map((categorie) => {
      return categorie.prestation_categorie_operation;
    });

    return result;
  }
}

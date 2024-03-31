import dbQuery from "../db/connect";
import ModelError from "@/lib/utils/ModelError";
import dbQueryArchive from "../db/connectArchiv";
import { errorMessages } from "@/lib/utils/errorMessages";

export default class Dg {
  constructor(
    id,
    bank_id,
    address,
    lat,
    lng,
    wilaya,
    phone,
    fax,
    location_link
  ) {
    this.id = id;
    this.bank_id = bank_id;
    this.address = address;
    this.lat = lat;
    this.lng = lng;
    this.wilaya = wilaya;
    this.phone = phone;
    this.fax = fax;
    this.location_link = location_link;
  }

  static async getAllDgs(id) {
    try {
      var data = await dbQuery("SELECT * FROM ab_dgs WHERE dg_bank_id=(?)", [
        id,
      ]);
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    var result = data.map((dg) => {
      return new Dg(
        dg.id_dg,
        dg.dg_bank_id,
        dg.dg_address,
        dg.dg_lat,
        dg.dg_lng,
        dg.dg_wilaya,
        dg.dg_phone,
        dg.dg_fax,
        dg.dg_location_link
      );
    });

    return result;
  }

  static async getDgById(id) {
    try {
      var dg = await dbQuery("SELECT * FROM ab_dgs WHERE id_dg=(?)", [id]);
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }
    if (dg.length == 0) {
      return null;
    } else {
      return new Dg(
        dg[0].id_dg,
        dg[0].dg_bank_id,
        dg[0].dg_address,
        dg[0].dg_lat,
        dg[0].dg_lng,
        dg[0].dg_wilaya,
        dg[0].dg_phone,
        dg[0].dg_fax,
        dg[0].dg_location_link
      );
    }
  }

  static async insertDg(dg) {
    const { bank_id, address, lat, lng, wilaya, phone, fax, location_link } =
      dg;
    try {
      var data = await dbQuery(
        "INSERT INTO ab_dgs(dg_bank_id,dg_address,dg_lat,dg_lng,dg_wilaya,dg_phone,dg_fax,dg_location_link) VALUES ((?),(?),(?),(?),(?),(?),(?),(?))",
        [bank_id, address, lat, lng, wilaya, phone, fax, location_link]
      );
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    return data;
  }

  static async modifyDg(dg) {
    const {
      id,
      bank_id,
      address,
      lat,
      lng,
      wilaya,
      phone,
      fax,
      location_link,
    } = dg;
    try {
      var row = await dbQuery("SELECT * FROM ab_dgs WHERE id_dg=(?)", [id]);
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 502);
    }

    try {
      var data = await dbQuery(
        "UPDATE ab_dgs SET dg_bank_id=(?),dg_address=(?),dg_lat=(?),dg_lng=(?),dg_wilaya=(?),dg_phone=(?),dg_fax=(?),dg_location_link=(?) WHERE id_dg=(?)",
        [bank_id, address, lat, lng, wilaya, phone, fax, location_link, id]
      );
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }
    try {
      if (row.length != 0) {
        var date = new Date();
        var day = date.getDay();
        var month = date.getMonth();
        var year = date.getFullYear();
        var dataToArchive = await dbQueryArchive(
          "INSERT INTO ab_dgs VALUES((?), (?), (?), (?), (?), (?), (?), (?), (?), (?),'" +
            year +
            "-" +
            month +
            "-" +
            day +
            "', 'MODIFIED')",
          [
            null,
            row[0].id_dg,
            row[0].dg_bank_id,
            row[0].dg_address,
            row[0].dg_lat,
            row[0].dg_lng,
            row[0].dg_wilaya,
            row[0].dg_phone,
            row[0].dg_fax,
            row[0].dg_location_link,
          ]
        );
      }
      return data;
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 501);
    }
  }
}

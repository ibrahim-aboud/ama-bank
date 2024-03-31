import dbQuery from "../db/connect";
import ModelError from "@/lib/utils/ModelError";
import { errorMessages } from "@/lib/utils/errorMessages";

export default class Categorie {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static async getAllCategories() {
    try {
      //HERE
      var data = await dbQuery("SELECT * FROM ab_categories");
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    var categories = data.map((element) => {
      return new Categorie(element.id_categorie, element.categorie_name);
    });

    return categories;
  }

  static async getCategorieById(id) {
    try {
      var data = await dbQuery(
        "SELECT * FROM ab_categories WHERE id_categorie=(?)",
        [id]
      );
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }
    if (data.length != 0) {
      return new Categorie(data[0].id_categorie, data[0].categorie_name);
    } else {
      return null;
    }
  }

  static async getCategorieByName(name) {
    try {
      var data = await dbQuery(
        "SELECT * FROM ab_categories WHERE categorie_name=(?)",
        [name]
      );
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    if (data.length == 0) {
      return null;
    } else {
      return new Categorie(data[0].id_categorie, data[0].categorie_name);
    }
  }

  static async insertCategorie(categorieName) {
    try {
      var tmp = await dbQuery(
        "INSERT INTO ab_categories(categorie_name) VALUES (?)",
        categorieName
      );

      var data = await dbQuery(
        "SELECT * FROM ab_categories WHERE id_categorie=(?) ",
        tmp.insertId
      );
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    return new Categorie(data[0].id_categorie, data[0].categorie_name);
  }

  static async deleteCategorie(categorie_id) {
    try {
      var data = await dbQuery(
        "DELETE FROM ab_categories WHERE id_categorie=(?)",
        [categorie_id]
      );
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    return data;
  }
}

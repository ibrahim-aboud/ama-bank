import FilesHelpers from "@/lib/utils/FilesHelpers";
import ModelError from "../../lib/utils/ModelError";
import dbQuery from "../db/connect";
import { errorMessages } from "@/lib/utils/errorMessages";

export default class WebsiteInfo {
  constructor(
    id,
    phone,
    email,
    fax,
    description,
    facebook_link,
    linkedin_link,
    instagram_link,
    twitter_link
  ) {
    this.id = id;
    this.phone = phone;
    this.email = email;
    this.fax = fax;
    this.description = description;
    this.facebook_link = facebook_link;
    this.linkedin_link = linkedin_link;
    this.instagram_link = instagram_link;
    this.twitter_link = twitter_link;

    this.logo = WebsiteInfo.#getLogoLink();
  }

  static #getLogoLink() {
    // try {
    //   const dirPath = "public/assets/logos";
    //   const logos = FilesHelpers.getAllDirectoryFiles(dirPath);

    //   const logo = logos.find((logo) => logo.split(".")[0] == "logo");
    //   return logo ? "/assets/logos/" + logo : "";
    // } catch (err) {
    //   throw new ModelError(errorMessages.serverError, 500);
    // }

    return "/assets/logos/logo.png";
  }

  static async getAllInfos() {
    try {
      var data = await dbQuery("SELECT * FROM ab_info");
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    var result = data.map((info) => {
      return new WebsiteInfo(
        info.id_info,
        info.phone,
        info.email,
        info.fax,
        info.description,
        info.facebook_link,
        info.linkedin_link,
        info.instagram_link,
        info.twitter_link
      );
    });

    return result;
  }

  static async getInfoById(id) {
    try {
      var data = await dbQuery("SELECT * FROM ab_info WHERE id_info=(?)", [id]);
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    if (data.length == 0) {
      return null;
    } else {
      return new WebsiteInfo(
        data[0].id_info,
        data[0].phone,
        data[0].email,
        data[0].fax,
        data[0].description,
        data[0].facebook_link,
        data[0].linkedin_link,
        data[0].instagram_link,
        data[0].twitter_link
      );
    }
  }

  static async updateInfo(info) {
    try {
      var data = await dbQuery(
        "UPDATE ab_info SET phone=(?), email=(?), fax=(?), description=(?), facebook_link=(?), linkedin_link=(?), instagram_link=(?), twitter_link=(?) WHERE id_info=(?)",
        [
          info.phone,
          info.email,
          info.fax,
          info.description,
          info.facebook_link,
          info.linkedin_link,
          info.instagram_link,
          info.twitter_link,

          info.id,
        ]
      );
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    return data;
  }
}

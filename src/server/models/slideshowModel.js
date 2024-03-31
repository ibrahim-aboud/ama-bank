import { errorMessages } from "@/lib/utils/errorMessages";
import ModelError from "@/lib/utils/ModelError";
import dbQuery from "../db/connect";
import FilesHelpers from "@/lib/utils/FilesHelpers";

export default class SlideShow {
  constructor(id, link) {
    this.id = id;
    this.link = link;
    this.path = SlideShow.#getPath(id);
  }

  static #getPath(id) {
    // try {
    //   const dirPath = "public/assets/images/slideshow";
    //   const images = FilesHelpers.getAllDirectoryFiles(dirPath);

    //   const image = images.find((image) => image.split(".")[0] == id);
    //   return image ? "/assets/images/slideshow/" + image : "";
    // } catch (err) {
    //   throw new ModelError(errorMessages.serverError, 500);
    // }

    return "/assets/logos/logo.png";
  }

  static async getAllSlideShows() {
    try {
      var data = await dbQuery("SELECT * from ab_slideshow");
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    var result = data.map((sld) => {
      return new SlideShow(sld.id_slideshow, sld.link_slideshow);
    });

    return result;
  }

  static async getSlideShowById(id) {
    try {
      var data = await dbQuery(
        "SELECT * from ab_slideshow WHERE slideshow_id=(?)",
        [id]
      );
    } catch (err) {
      throw new ModelError(errorMessages.serverError, 500);
    }

    if (data.length == 0) {
      return null;
    } else {
      return new SlideShow(data[0].slideshow_id, data[0].slideshow_link);
    }
  }
}

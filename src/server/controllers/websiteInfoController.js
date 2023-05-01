import multer from "multer";
import WebsiteInfo from "../models/websiteInfoModel";
import FilesHelpers from "@/lib/utils/FilesHelpers";
import { errorMessages } from "@/lib/utils/errorMessages";
import ModelError from "@/lib/utils/ModelError";
import isNotAdmin from "@/lib/utils/checkAdmin";
import websiteInfoValidator from "@/lib/validations/websiteInfoValidator";

export default class WebsiteInfoController {
  async get(req, res) {
    try {
      const infos = await WebsiteInfo.getAllInfos();
      res.status(200).json({ infos });
    } catch (err) {
      res.status(err.status).json({ error: err });
    }
  }

  async uploadLogo(req, res) {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./public/assets/logos");
      },
      filename: function (req, file, cb) {
        // delete the current logo
        FilesHelpers.deleteFilesInDirectory_IgnoreExtension(
          "logo.random_extension",
          "./public/assets/logos"
        );

        cb(null, "logo." + file.originalname.split(".").pop());
      },
    });

    const upload = multer({ storage: storage });
    const uploadFile = upload.single("file");

    try {
      uploadFile(req, res, (err) => {
        if (err) {
          throw new ModelError(err.message, 500);
        }
      });

      // File uploaded successfully
      res.status(201).send("ok");
      return;
    } catch (e) {
      res
        .status(500)
        .json({ error: new ModelError(errorMessages.serverError, 500) });
      return;
    }
  }

  async put(req, res) {
    try {
      if (await isNotAdmin(req, res)) {
        throw new ModelError(errorMessages.unauthorized, 401);
      }

      var { info } = req.body;

      if (info == undefined) {
        throw new ModelError(errorMessages.missingResource, 400);
      }

      var check = websiteInfoValidator(info);
      if (check.error) {
        throw new ModelError(check.errorList[0], 400);
      }

      var data = await WebsiteInfo.updateInfo(info);

      if (data.affectedRows == 1) {
        var result = await WebsiteInfo.getInfoById(info.id);
        res.status(200).json({ info: result });
      } else {
        throw new ModelError(errorMessages.inexistant, 404);
      }
    } catch (err) {
      res.status(err.status).json({ error: err });
    }
  }
}

import multer from "multer";
import Bank from "../../models/bankModel";
import FilesHelpers from "@/lib/utils/FilesHelpers";
import { errorMessages } from "@/lib/utils/errorMessages";
import ModelError from "@/lib/utils/ModelError";
import banks_logos_folder from "@/lib/utils/globals";
import banks_images_folder from "@/lib/utils/globals"


export default class BankController {
  async get(req,res){
    const {id} = req.query ;
    try {
        if (id==undefined){
            throw new ModelError(errorMessages.missingResource,400);
        }
        var data = await Bank.getBankById(id) ;
        if (data==null){ 
            throw new ModelError(errorMessages.wrongId,404) ;
        } else {
            res.status(200).json({bank: data})
        }
    } catch(err){
        res.status(err.status).json({error: err}) ;
    }
}

  async uploadLogo(req, res) {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, banks_logos_folder);
      },
      filename: function (req, file, cb) {
        // delete the current logo
        FilesHelpers.deleteFilesInDirectory_IgnoreExtension(
          file.originalname,
          banks_logos_folder
        );

        cb(null, file.originalname);
      },
    });

    const upload = multer({ storage: storage });
    const uploadFile = upload.single("file");

    try {
      uploadFile(req, res, (err) => {
        if (err) {
          throw new ModelError(err.message,500);
        }
      });

      // File uploaded successfully
      res.status(201).send("ok");
      return;
    } catch (e) {
      res.status(500).json({error: new ModelError(errorMessages.serverError,500)}) ;
      return;
    }
  }

  async uploadImage(req, res) {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, banks_images_folder);
      },
      filename: function (req, file, cb) {
        // delete the current logo
        FilesHelpers.deleteFilesInDirectory_IgnoreExtension(
          file.originalname,
          banks_images_folder
        );

        cb(null, file.originalname);
      },
    });

    const upload = multer({ storage: storage });
    const uploadFile = upload.single("file");

    try {
      uploadFile(req, res, (err) => {
        if (err) {
          throw new ModelError(err.message,500);
        }
      });

      // File uploaded successfully
      res.status(201).send("ok");
      return;
    } catch (e) {
      res.status(500).json({error: new ModelError(errorMessages.serverError,500)}) ;
      return;
    }
  }

}
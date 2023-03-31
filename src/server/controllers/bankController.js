import multer from "multer";
import Bank from "../models/bankModel";
import FilesHelpers from "@/lib/utils/FilesHelpers";

export default class BankController {
  async get(req, res) {
    const { id } = req.query;

    if (isNaN(id)) {
      res.status(404).send("La bank n'existe pas!");
      return;
    }

    try {
      const bank = await Bank.getBankById(id);

      res.status(200).json({ bank });
      return;
    } catch (e) {
      res.status(e.status || 500).send(e.message);
      return;
    }
  }

  async uploadLogo(req, res) {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./public/assets/logos/banks_logos");
      },
      filename: function (req, file, cb) {
        // delete the current logo
        FilesHelpers.deleteFilesInDirectory_IgnoreExtension(
          file.originalname,
          "./public/assets/logos/banks_logos"
        );

        cb(null, file.originalname);
      },
    });

    const upload = multer({ storage: storage });
    const uploadFile = upload.single("file");

    try {
      uploadFile(req, res, (err) => {
        if (err) {
          throw new Error(err.message);
        }
      });

      // File uploaded successfully
      res.status(201).send("ok");
      return;
    } catch (e) {
      res.status(500).send(e.message);
      return;
    }
  }
}

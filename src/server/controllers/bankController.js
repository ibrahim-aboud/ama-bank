import multer from "multer";
import Bank from "../models/bankModel";

export default class BankController {
  async get(req, res) {
    const { id } = req.query;

    try {
      const bank = await Bank.getBankById(id);

      res.status(200).json({ bank });
      return;
    } catch (e) {
      res.status(404).send(e.message);
      return;
    }
  }

  async uploadLogo(req, res) {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./public/assets/logos/banks_logos");
      },
      filename: function (req, file, cb) {
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
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
}

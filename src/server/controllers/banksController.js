import Bank from "../models/bankModel";

export default class BanksController {
  async get(req, res) {
    try {
      const banks = await Bank.getAllBanks();

      res.status(200).json({ banks });
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  async put(req, res) {}
}

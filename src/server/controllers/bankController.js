import Bank from "../models/bankModel";

export default class BankController {
  async get(req, res) {
    const { id } = req.query;

    try {
      const bank = await Bank.getBankById(id);

      res.status(200).json({ bank });
    } catch (e) {
      res.status(404).send(e.message);
    }
  }
}

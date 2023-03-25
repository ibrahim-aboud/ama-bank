import Bank from "../models/bankModel";

export default class BanksController {
  async get(req, res) {
    try {
      const banks = await Bank.getAllBanks();

      res.status(200).json({ banks });
      return;
    } catch (e) {
      res.status(500).send(e.message);
      return;
    }
  }

  async put(req, res) {
    const { bank: data } = req.body;

    const bank = new Bank(
      data.id,
      data.name,
      data.description,
      data.visitsCount,
      data.websiteLink,
      data.updateDate
    );

    try {
      const data = await Bank.updateBank(bank);

      res.status(201).json({ bank: data });
      return;
    } catch (e) {
      res.status(404).send(e.message);
      return;
    }
  }
}

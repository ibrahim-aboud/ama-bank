import Bank from "../models/bankModel";
import bankInfoValidator from "@/lib/validations/bankInfoValidator";

export default class BanksController {
  async get(req, res) {
    try {
      const banks = await Bank.getAllBanks();

      res.status(200).json({ banks });
      return;
    } catch (e) {
      res.status(e.status || 500).send(e.message);
      return;
    }
  }

  async put(req, res) {
    const { bank: data } = req.body;

    if (!data) {
      res.status(409).send("No bank to update");
      return;
    }

    const bank = new Bank(
      data.id,
      data.name,
      data.description,
      data.visitsCount,
      data.websiteLink,
      data.updateDate
    );

    if (!bank) {
      res.status(409).send("No bank to update");
      return;
    }

    const check = bankInfoValidator(bank);
    if (check.error) {
      res.status(400).send(check.errorList[0]);
      return;
    }

    try {
      const data = await Bank.updateBank(bank);

      res.status(201).json({ bank: data });
      return;
    } catch (e) {
      res.status(e.status || 500).send(e.message);
      return;
    }
  }
}

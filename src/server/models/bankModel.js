import dbQuery from "../db/connect";

export default class Bank {
  constructor(id, name, description, visitsCount, websiteLink, updateDate) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.visitsCount = visitsCount;
    this.websiteLink = websiteLink;
    this.updateDate = updateDate;
  }

  static async getAllBanks() {
    var data = null;

    try {
      data = await dbQuery("SELECT * FROM ab_banks");
    } catch (e) {
      throw new Error("Something went wrong!");
    }

    if (!data) {
      return [];
    }

    var banks = [];

    for (let i = 0; i < data.length; i++) {
      const bank = data[i];

      banks.push(
        new Bank(
          bank.id_bank,
          bank.bank_name,
          null, // description
          bank.bank_visits_count,
          bank.bank_website_link,
          bank.bank_update_date
        )
      );
    }

    return banks;
  }

  static async getBankById(id) {
    if (isNaN(id)) {
      res.status(404).send("La bank n'existe pas!");
    }

    var data = null;

    try {
      data = await dbQuery("SELECT * FROM ab_banks WHERE id_bank=(?)", [id]);
    } catch (e) {
      throw new Error("Something went wrong!");
    }

    if (!data || data.length === 0) {
      throw new Error("La bank n'existe pas!");
    }

    const bank = data[0];
    return new Bank(
      bank.id_bank,
      bank.bank_name,
      null, // description
      bank.bank_visits_count,
      bank.bank_website_link,
      bank.bank_update_date
    );
  }

  static async updateBank(bank) {
    const _bank = Bank.getBankById(bank.id);

    await dbQuery(
      "UPDATE ab_banks SET bank_name=(?), bank_visits_count=(?), bank_website_link=(?), bank_update_date=(?) WHERE id_bank=(?)",
      [bank.name, bank.visitsCount, bank.websiteLink, bank.updateDate, bank.id]
    );
  }
}

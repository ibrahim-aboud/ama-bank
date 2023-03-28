import FilesHelpers from "@/lib/utils/FilesHelpers";
import bankInfoValidator from "@/lib/validations/bankInfoValidator";
import dbQuery from "../db/connect";

export default class Bank {
  constructor(id, name, description, visitsCount, websiteLink, updateDate) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.visitsCount = visitsCount;
    this.websiteLink = websiteLink;
    this.updateDate = updateDate
      ? updateDate
      : new Date().toJSON().slice(0, 10);

    this.logoLink = Bank.#getLogoLink(id);
    this.imageLink = Bank.#getImageLink(id);
  }

  static #getLogoLink(id) {
    const dirPath = "public/assets/logos/banks_logos";
    const logos = FilesHelpers.getAllDirectoryFiles(dirPath);

    const logo = logos.find((logo) => logo.split(".")[0] == id);
    return logo ? "/assets/logos/banks_logos/" + logo : "";
  }

  static #getImageLink(id) {
    const dirPath = "public/assets/images/banks_images";
    const images = FilesHelpers.getAllDirectoryFiles(dirPath);

    const image = images.find((image) => image.split(".")[0] == id);
    return image ? "/assets/logos/banks_logos/" + image : "";
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
          bank.bank_description,
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
      bank.bank_description,
      bank.bank_visits_count,
      bank.bank_website_link,
      bank.bank_update_date
    );
  }

  static async updateBank(bank) {
    if (!bank) {
      throw new Error("No bank to update");
    }

    const check = bankInfoValidator(bank);
    if (check.error) {
      throw new Error(check.errorList[0]);
    }

    const _bank = await Bank.getBankById(bank.id);

    try {
      await dbQuery(
        "UPDATE ab_banks SET bank_name=(?), bank_description=(?), bank_visits_count=(?), bank_website_link=(?), bank_update_date=(?) WHERE id_bank=(?)",
        [
          bank.name,
          bank.description,
          bank.visitsCount,
          bank.websiteLink,
          bank.updateDate,

          bank.id,
        ]
      );
    } catch (e) {
      throw new Error("Ce nom de la banque existe déjà");
    }

    return {
      old: _bank,
      new: bank,
    };
  }
}

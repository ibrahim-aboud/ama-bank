import dbQuery from "@/server/db/adminDbConnect";
import userCredsValidator from "@/lib/validations/userCredsValidator";

export default class AdminController {
  async loginAdmin(username, password) {
    // validate user inputs
    const check = userCredsValidator(username, password);

    if (check.error) {
      throw new Error(check.errorList[0]);
    }

    // search for the admin in db
    var result = null;

    try {
      result = await dbQuery("SELECT * FROM ab_admins WHERE username=(?)", [
        username,
      ]);
    } catch (e) {
      throw new Error("Something went wrong!");
    }

    if (!result || result.length == 0) {
      throw new Error("L'utilisateur n'existe pas");
    }

    const user = result[0];

    // check if the password is correct
    if (user.password !== password) {
      throw new Error("Le mot de passe est incorrect. essayez à nouveau");
    }

    return user;
  }
}

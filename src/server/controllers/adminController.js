import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import userCredsValidator from "@/lib/validations/userCredsValidator";
import adminInfoValidator from "@/lib/validations/adminInfoValidator";
import Admin from "../models/adminModel";
import hashPassword from "@/lib/utils/hashPassword";

export default class AdminController {
  async loginAdmin(username, password) {
    // validate user inputs
    const check = userCredsValidator(username, password);
    if (check.error) {
      throw new Error(check.errorList[0]);
    }

    const user = await Admin.getAdminByUsername(username);

    // check if the password is correct
    if (user.password !== hashPassword(password)) {
      throw new Error("Le mot de passe est incorrect. essayez à nouveau");
    }

    delete user.password;
    return user;
  }

  async get(req, res) {
    const { id } = req.query;

    if (isNaN(id)) {
      res.status(404).send("L'admin n'existe pas!");
      return;
    }

    try {
      const admin = await Admin.getAdminById(id);
      delete admin.password; // don't send the password to the client

      res.status(200).json({ admin });
      return;
    } catch (e) {
      res.status(e.status || 500).send(e.message);
      return;
    }
  }

  async put(req, res) {
    // get the session and the new data from user's req
    const session = await getServerSession(req, res, authOptions);
    const { admin: data, oldPassword } = req.body;

    if (!data) {
      res.status(409).send("No admin to update");
      return;
    }

    // check if the admin who send the request to update his information
    if (session?.user?.id !== data?.id) {
      res.status(401).send("Access denied!");
      return;
    }

    const admin = new Admin(data.id, data.username, data.email, data.password);

    if (!admin) {
      res.status(409).send("No admin to update");
      return;
    }

    // check if the admin's info are valid
    const check = adminInfoValidator(admin);
    if (check.error) {
      res.status(400).send(check.errorList[0]);
      return;
    }

    // compare the old password before updating the admin
    const oldAdmin = await Admin.getAdminById(admin.id);
    if (oldAdmin.password !== hashPassword(oldPassword)) {
      res.status(401).send("Le mot de passe est incorrect");
      return;
    }

    // hash the password before updating the admin
    admin.password = hashPassword(admin.password);

    try {
      // update the admin
      const data = await Admin.updateAdmin(admin);
      delete data.old.password;
      delete data.new.password;

      res.status(201).json({ admin: data });
      return;
    } catch (e) {
      res.status(e.status || 500).send(e.message);
      return;
    }
  }
}

import dbQuery from "../db/adminDbConnect";
import ModelError from "../../lib/utils/ModelError";

export default class Admin {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = "admin";
  }

  static async getAdminById(id) {
    var data = null;

    try {
      data = await dbQuery("SELECT * FROM ab_admins WHERE id_admin=(?)", [id]);
    } catch (e) {
      throw new ModelError("Something went wrong!", 500);
    }

    if (!data || data.length === 0) {
      throw new ModelError("L'admin n'existe pas!", 404);
    }

    const admin = data[0];
    return new Admin(
      admin.id_admin,
      admin.admin_name,
      admin.admin_email,
      admin.admin_password
    );
  }

  static async getAdminByUsername(username) {
    var data = null;

    try {
      data = await dbQuery("SELECT * FROM ab_admins WHERE admin_name=(?)", [
        username,
      ]);
    } catch (e) {
      throw new ModelError("Something went wrong!", 500);
    }

    if (!data || data.length === 0) {
      throw new ModelError("L'admin n'existe pas!", 404);
    }

    const admin = data[0];
    return new Admin(
      admin.id_admin,
      admin.admin_name,
      admin.admin_email,
      admin.admin_password
    );
  }

  static async updateAdmin(admin) {
    const _admin = await Admin.getAdminById(admin.id);

    try {
      await dbQuery(
        "UPDATE ab_admins SET admin_name=(?), admin_email=(?), admin_password=(?) WHERE id_admin=(?)",
        [admin.username, admin.email, admin.password, admin.id]
      );
    } catch (e) {
      throw new ModelError("le nom d'utilisateur ou l'email existe déjà", 409);
    }

    return {
      old: _admin,
      new: admin,
    };
  }
}

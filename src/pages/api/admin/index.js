import AdminController from "@/server/controllers/adminController";
import isNotAdmin from "@/lib/utils/checkAdmin";
import { errorMessages } from "@/lib/utils/errorMessages";

export default async function handler(req, res) {

  if (await isNotAdmin(req,res)) {
    res.status(401).send(errorMessages.unauthorized);
    return;
  }

  const controller = new AdminController();

  if (req.method === "PUT") await controller.put(req, res);
  else {
    res.status(404).send("Not Found");
    return;
  }
}

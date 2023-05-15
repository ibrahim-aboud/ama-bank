import isNotAdmin from "@/lib/utils/checkAdmin";
import { errorMessages } from "@/lib/utils/errorMessages";
import AdminController from "@/server/controllers/adminController";

export default async function handler(req, res) {

  if (await isNotAdmin(req,res)) {
    res.status(401).send(errorMessages.unauthorized);
    return;
  }

  const controller = new AdminController();

  if (req.method === "GET") await controller.get(req, res);
  else {
    res.status(405).send(errorMessages.wrongMethod);
    return;
  }
}

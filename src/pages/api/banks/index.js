import BanksController from "@/server/controllers/banksController";
import isNotAdmin from "@/lib/utils/checkAdmin";
import { errorMessages } from "@/lib/utils/errorMessages";


export default async function handler(req, res) {

  const controller = new BanksController();

  if (req.method === "GET") await controller.get(req, res);
  else if (req.method === "PUT") {
    // securing the route
    if (isNotAdmin) {
      res.status(401).send("Access denied!");
      return;
    }

    await controller.put(req, res);
  } else {
    res.status(405).send(errorMessages.wrongMethod) ;
  }
}

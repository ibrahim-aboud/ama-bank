import BanksController from "@/server/controllers/banks/banksController";
import { errorMessages } from "@/lib/utils/errorMessages";


export default async function handler(req, res) {

  const controller = new BanksController();

  if (req.method === "GET") await controller.get(req, res);
  else if (req.method === "PUT") {
    await controller.modify(req, res);
  } else if (req.method=="POST") {
    await controller.add(req,res) ;
  } else {
    res.status(405).json({error: new ModelError(errorMessages.wrongMethod,405)})
  }
}

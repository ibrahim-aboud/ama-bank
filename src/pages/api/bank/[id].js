import BankController from "@/server/controllers/bankController";
import { errorMessages } from "@/lib/utils/errorMessages";

export default async function handler(req, res) {
  const controller = new BankController();

  if (req.method === "GET") await controller.get(req, res);
  else {
      res.status(405).send(errorMessages.wrongMethod) ;
  }
}


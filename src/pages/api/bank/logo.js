import isNotAdmin from "@/lib/utils/checkAdmin";
import BankController from "@/server/controllers/bankController";
import { errorMessages } from "@/lib/utils/errorMessages";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {

  if (isNotAdmin) {
    res.status(401).send("Access denied!");
    return;
  }

  const controller = new BankController();

  if (req.method === "POST") {
    await controller.uploadLogo(req, res);
  } else {
    res.status(405).send(errorMessages.wrongMethod) ;
  }
}

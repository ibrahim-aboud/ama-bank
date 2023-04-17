import isNotAdmin from "@/lib/utils/checkAdmin";
import BankController from "@/server/controllers/banks/bankController";
import { errorMessages } from "@/lib/utils/errorMessages";
import ModelError from "@/lib/utils/ModelError";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {

  if (await isNotAdmin(req,res)) {
    res.status(401).json({error: new ModelError(errorMessages.unauthorized,401)}) ;
    return;
  }

  const controller = new BankController();

  if (req.method === "POST") {
    await controller.uploadLogo(req, res);
  } else {
    res.status(405).json({error: new ModelError(errorMessages.wrongMethod,405)})
  }
}

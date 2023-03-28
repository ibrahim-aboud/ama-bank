import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import BankController from "@/server/controllers/bankController";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const isNotAdmin =
    !session ||
    !session.user ||
    !session.user.role ||
    session.user.role !== "admin";

  if (isNotAdmin) {
    res.status(401).send("Access denied!");
    return;
  }

  const controller = new BankController();

  if (req.method === "POST") {
    await controller.uploadLogo(req, res);
  } else {
    res.status(404).send("Not Found");
    return;
  }
}

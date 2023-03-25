import BanksController from "@/server/controllers/banksController";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const isNotAdmin =
    !session ||
    !session.user ||
    !session.user.role ||
    session.user.role !== "admin";

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
    res.status(404).send("Not Found");
    return;
  }
}

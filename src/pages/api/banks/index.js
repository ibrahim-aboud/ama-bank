import BanksController from "@/server/controllers/banksController";

export default async function handler(req, res) {
  const controller = new BanksController();

  if (req.method === "GET") await controller.get(req, res);
  else if (req.method === "PUT") await controller.put(req, res);
  else {
    res.status(404).send("Not Found");
  }
}

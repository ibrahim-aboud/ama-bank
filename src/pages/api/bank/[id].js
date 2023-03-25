import BankController from "@/server/controllers/bankController";

export default async function handler(req, res) {
  const controller = new BankController();

  if (req.method === "GET") await controller.get(req, res);
  else {
    res.status(404).send("Not Found");
    return;
  }
}

import WebsiteInfoController from "@/server/controllers/websiteInfoController";
import ModelError from "@/lib/utils/ModelError";
import { errorMessages } from "@/lib/utils/errorMessages";

export default async function handler(req, res) {
  const controller = new WebsiteInfoController();
  // here for some reason happened when opened the admin home page, it threw a 500 code error
  // also said "something went wrong !"
  if (req.method === "GET") await controller.get(req, res);
  else if (req.method === "PUT") await controller.put(req, res);
  else {
    res
      .status(405)
      .json({ error: new ModelError(errorMessages.wrongMethod, 405) });
  }
}

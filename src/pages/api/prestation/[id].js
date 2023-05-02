import prestationController from "@/server/controllers/prestations/prestationController";
import { errorMessages } from "@/lib/utils/errorMessages";
import ModelError from "@/lib/utils/ModelError";
export default async function handler(req,res){
    const controller = new prestationController() ;

    if (req.method=="GET") {
        await controller.get(req,res) ;
    } else {
        res.status(405).json({error: new ModelError(errorMessages.wrongMethod,405)})
    }
}
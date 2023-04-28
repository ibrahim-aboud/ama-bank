import PrestationsController from "@/server/controllers/prestations/prestationsController";
import { errorMessages } from "@/lib/utils/errorMessages";

export default async function handler(req,res){
    const controller = new PrestationsController() ;

    if (req.method=="GET"){
        await controller.get(req,res);
    } else if (req.method =="DELETE") {
        await controller.delete(req,res) ;
    }else {
        res.status(405).json({error: new ModelError(errorMessages.wrongMethod,405)})
    }
}
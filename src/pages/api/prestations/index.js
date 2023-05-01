import { errorMessages } from "@/lib/utils/errorMessages";
import PrestationsController from "@/server/controllers/prestations/prestationsController";

export default async function handler(req,res){
    
    const controller = new PrestationsController() ;
    
    if (req.method=="POST") {
        await controller.add(req,res) ;
    } else if (req.method=="PUT"){
        await controller.modify(req,res) ;
    } else if (req.method=="GET"){
        await controller.getAll(req,res) ;
    }else {
        res.status(405).json({error: new ModelError(errorMessages.wrongMethod,405)})
    }
}
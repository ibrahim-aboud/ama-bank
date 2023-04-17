import DgsController from "@/server/controllers/dgs/dgsController";
import { errorMessages } from "@/lib/utils/errorMessages";

export default async function handler(req,res){
    const controller = new DgsController() ;
    
    if (req.method =="POST") {
        await controller.add(req,res) ;
    } else if (req.method =="PUT"){
        await controller.modify(req,res) ;
    }else {
        res.status(405).json({error: new ModelError(errorMessages.wrongMethod,405)})
    }
}
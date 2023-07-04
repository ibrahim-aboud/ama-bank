import { errorMessages } from "@/lib/utils/errorMessages";
import PrestationsController from "@/server/controllers/prestations/prestationsController";

export default async function handler(req,res){
    
    const controller = new PrestationsController() ;
    
    if (req.method=="POST") {
        await controller.add(req,res) ;
    } else if (req.method=="PUT"){
        //HERE when modifing a prestation error 500
        await controller.modify(req,res) ;
    } else if (req.method=="GET"){
        //Here also when opening the prestation admin page periodicaly throwing erro 500
        await controller.getAll(req,res) ;
    }else {
        res.status(405).json({error: new ModelError(errorMessages.wrongMethod,405)})
    }
}
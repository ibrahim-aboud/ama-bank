import { errorMessages } from "@/lib/utils/errorMessages";
import PrestationsController from "@/server/controllers/prestations/prestationsController";

export default async function handler(req,res){
    
    const controller = new PrestationsController() ;
    
    if (req.method=="GET") {
        //here throwing error 500 periodically when having the page edit prestation of the admin open
       await controller.getCategories(req,res) ;
    }else {
        res.status(405).json({error: new ModelError(errorMessages.wrongMethod,405)})
    }
}
import { errorMessages } from "@/lib/utils/errorMessages";
import DgController from "@/server/controllers/dgs/dgController";

export default async function handler(req,res){
    const controller = new DgController() ;
    
    if (req.method=="GET"){
        await controller.get(req,res) ;
    } else {
        res.status(405).json({error: new ModelError(errorMessages.wrongMethod,405)})
    }
}
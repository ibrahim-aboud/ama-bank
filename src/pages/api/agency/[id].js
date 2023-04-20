import AgencyController from "@/server/controllers/agencies/agencyController";
import { errorMessages } from "@/lib/utils/errorMessages";

export default async function handler(req,res){
    const controller = new AgencyController() ;

    if (req.method=="GET") {
        await controller.get(req,res) ;
    } else {
        res.status(405).json({error: new ModelError(errorMessages.wrongMethod,405)})
    }

    return
}
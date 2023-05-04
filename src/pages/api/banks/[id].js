import ModelError from "@/lib/utils/ModelError";
import { errorMessages } from "@/lib/utils/errorMessages";
import BanksController from "@/server/controllers/banks/banksController";


export default async function handler(req,res){
    const controller = new BanksController() ;
    if (req.method=="DELETE") {
        await controller.delete(req,res) ;
    } else {
        res.status(405).json({error: new ModelError(errorMessages.wrongMethod,405)})
    }
}
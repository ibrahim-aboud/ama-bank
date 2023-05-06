import { errorMessages } from "@/lib/utils/errorMessages";
import SlideShowController from "@/server/controllers/slideshowController";

export default async function handler(req,res){
    
    const controller = new SlideShowController() ;
    
    if (req.method=="GET") {
        await controller.get(req,res) ;
    } else {
        res.status(405).json({error: new ModelError(errorMessages.wrongMethod,405)})
    }
}
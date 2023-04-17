import Prestation from "@/server/models/prestationModel";
import ModelError from "@/lib/utils/ModelError";
import { errorMessages } from "@/lib/utils/errorMessages";

export default class prestationController{
    
    async get(req,res){
        const {id} = req.query ;
        try {
            if (id==undefined){
                throw new ModelError(errorMessages.missingResource,400);
            }
            var data = await Prestation.getPrestationById(id) ;
            if (data==null){ 
                throw new ModelError(errorMessages.wrongId,404) ;
            } else {
                res.status(200).json({prestation: data})
            }
        } catch(err){
            res.status(err.status).json({error: err}) ;
        }
    }
}
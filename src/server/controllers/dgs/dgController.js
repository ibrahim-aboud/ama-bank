import Dg from "@/server/models/dgModel";
import ModelError from "@/lib/utils/ModelError";
import { errorMessages } from "@/lib/utils/errorMessages";

export default class DgController{
    async get(req,res){
        const {id} = req.query ;
        try {
            if (id==undefined){
                throw new ModelError(errorMessages.missingResource,400);
            }

            var dg = await Dg.getDgById(id) ;

            if (dg==null){
                throw new ModelError(errorMessages.wrongId,404)
            }
            
            res.status(200).json({dg}) ;
        } catch(err){
            res.status(err.status).json({error:err}) ;
        }
    }
}
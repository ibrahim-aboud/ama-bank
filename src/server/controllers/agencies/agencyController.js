import ModelError from "@/lib/utils/ModelError";
import { errorMessages } from "@/lib/utils/errorMessages";
import Agency from "@/server/models/agencyModel";

export default class AgencyController {
    async get(req,res){
        const {id} = req.query ;
        try {
            if (id==undefined){
                throw new ModelError(errorMessages.missingResource,400);
            }
            var agency = await Agency.getAgencyById(id) ;
            if (agency==null){
                throw new ModelError(errorMessages.wrongId,404)
            }
            res.status(200).json({agency}) ;
        } catch(err){
            res.status(err.status).json({error: err}) ;
        }
    }
}
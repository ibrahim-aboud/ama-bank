import ModelError from "@/lib/utils/ModelError";
import isNotAdmin from "@/lib/utils/checkAdmin";
import { errorMessages } from "@/lib/utils/errorMessages";
import agencyInfoValidator from "@/lib/validations/agencyInfoValidator";
import Agency from "@/server/models/agencyModel";

export default class AgenciesController{
    async get(req,res){
        const {id} = req.query ;
        try {
            var agencies = await Agency.getAllAgencies(id) ;
            res.status(200).json({agencies}) ;
        } catch(err){
            res.status(err.status).json({error: err}) ;
        }
    }

    async add(req,res){
        try {

            if (await isNotAdmin(req,res)){
                throw new ModelError(errorMessages.unauthorized,401) ;
            }
    
            const {agency} = req.body ;

            if (agency==undefined){
                throw new ModelError(errorMessages.missingResource,400);
            }

            var check = agencyInfoValidator(agency) ;
    
            if (check.error){
                throw new ModelError(check.errorList[0],400) ;
            }

            //add something to check wether the agency exists or not---
            
            //////////////////////////////////////////////////////////
            var data = await Agency.insertAgency(agency) ;
            var result = await Agency.getAgencyById(data.insertId) ;

            res.status(200).json({agency: result}) ;

        } catch(err){
            res.status(err.status).json({error: err}) ;
        }
    }

    async modify(req,res){
        
        try {
            if (await isNotAdmin(req,res)){
                throw new ModelError(errorMessages.unauthorized,401) ;
            }
    
            const {agency} = req.body ; 

            if (agency==undefined){
                throw new ModelError(errorMessages.missingResource,400);
            }
    
            var check = agencyInfoValidator(agency) ;
    
            //additional check
            if (!("id" in agency)){
                throw new ModelError(errorMessages.missingID,400)
            } else if (check.error){
                throw new ModelError(check.errorList[0],400) ;
            } 

            var data = await Agency.modifyAgency(agency) ;

            if (data.affectedRows==1){
                var result = await Agency.getAgencyById(agency.id) ;
                res.status(200).json({agency: result}) ;
                return ;
            } else {
                throw new ModelError(errorMessages.inexistant,400) ;
            }
        } catch(err){
            res.status(err.status).json({error: err}) ;
            return ;
        }
    }

    async delete(req,res){
        
        const {id} = req.query ;
        try {
            if (await isNotAdmin(req,res)){
                throw new ModelError(errorMessages.unauthorized,401);
            }

            if (isNaN(id)){
                throw new ModelError(errorMessages.wrongId, 404) ;
            }

            const agency = await Agency.getAgencyById(id) ;

            if (agency!=null){
                await Agency.deleteAgency(id) ;
                res.status(200).json({agency}) ;
            } else {
                throw new ModelError(errorMessages.wrongId,404) ;
            }

        } catch(err){
            res.status(err.status).json({error: err}) ;
        }
        
        return ;
    }
}
import isNotAdmin from "@/lib/utils/checkAdmin";
import { errorMessages } from "@/lib/utils/errorMessages";
import prestationInfoValidator from "@/lib/validations/prestationInfoValidator";
import Prestation from "@/server/models/prestationModel";
import ModelError from "@/lib/utils/ModelError";

export default class PrestationsController {

    async getAll(req,res){
        try {
            var data = await Prestation.getEverything() ;
            res.status(200).json({prestations: data}) ;
        }catch(err){
            res.status(err.status).json({error: err}) ;
        }
    }

    async get(req,res){
        const {id} = req.query ;
        try {
            var data = await Prestation.getAllPrestations(id) ;
            res.status(200).json({prestations: data}) ;
            return ;
        } catch(err){
            res.status(err.status).json({error: err}) ;
        }

    }

    async add (req,res){
        
        try {
            if (await isNotAdmin(req,res)){
                throw new ModelError(errorMessages.unauthorized,401) ;
            }
            
            const {prestation} = req.body ; 
            
            if (prestation==undefined){
                throw new ModelError(errorMessages.missingResource,400);
            }
            
            var check = prestationInfoValidator(prestation) ;
            
            if (check.error){
                throw new ModelError(check.errorList[0],400) ;
            }
            
            //Aditional check (just to optimize) if the bank id really exists

            var data = await Prestation.getPrestationByName(prestation.bank_id, prestation.name, prestation.type) ;


            if (data!=null){
                throw new ModelError(errorMessages.existant, 409) ;
            }
            
            data = await Prestation.insertPrestation(prestation) ;

            var result = await Prestation.getPrestationById(data.insertId) ;

            res.status(200).json(result) ;
        } catch(err){
            res.status(err.status).json({error: err}) ;
        }

        return ;

    }

    async modify(req,res){
        
        try {
            if (await isNotAdmin(req,res)){
                throw new ModelError(errorMessages.unauthorized,401) ;
            }
    
            const {prestation} = req.body ; 

            if (prestation==undefined){
                throw new ModelError(errorMessages.missingResource,400);
            }
    
            var check = prestationInfoValidator(prestation) ;
    
            //additional check
            if (!("id" in prestation)){
                throw new ModelError(errorMessages.missingID,400) ;
            } else if (check.error){
                throw new ModelError(check.errorList[0],400) ;
            } 
            
            //we don't actually need to verify wether it exists or not cuz it may cause some problems and it's meaningless

            var data = await Prestation.modifyPrestation(prestation) ;
            
            if (data.affectedRows==1){
                var result = await Prestation.getPrestationById(prestation.id) ;
                res.status(200).json({prestation: result}) ;
                return ;
            } else {
                throw new ModelError(errorMessages.inexistant,404) ;
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
                throw new ModelError(errorMessages.unauthorized,401) ;
            }
            
            if (isNaN(id)){
                throw new ModelError(errorMessages.wrongId, 404) ;
            }
            var prestation = await Prestation.getPrestationById(id) ;

            if (prestation!=null){
                await Prestation.deletePrestation(id) ;
                res.status(200).json({prestation}) ;
            } else {
                throw new ModelError(errorMessages.wrongId,404) ;
            }
            
        } catch(err){
            res.status(err.status).json({error: err}) ;
        }
    
        return ;
    }

    async getTypes(req,res){
        try {
            var types = await Prestation.getAllTypes() ;
            res.status(200).json({types}) ;
        } catch(err){
            res.status(err.status).json({error:err}) ;
        }
    }

    async getCategories(req,res){
        try {
            var categories = await Prestation.getAllCategories() ;
            res.status(200).json({categories}) ;
        } catch(err){
            res.status(err.status).json({error:err}) ;
        }
    }
    
}
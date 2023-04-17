import ModelError from "@/lib/utils/ModelError";
import isNotAdmin from "@/lib/utils/checkAdmin";
import { errorMessages } from "@/lib/utils/errorMessages";
import dgInfoValidator from "@/lib/validations/dgInfoValidator";
import Dg from "@/server/models/dgModel";

export default class DgsController{
    async get(req,res){
        const {id} = req.query ;
        try {
            var dgs = await Dg.getAllDgs(id) ;
            res.status(200).json({dgs}) ;
        } catch(err){
            res.status(err.status).send(err.message) ;
        }
    }

    async add(req,res){
        
        try {
            if (await isNotAdmin(req,res)){
                throw new ModelError(errorMessages.unauthorized,401) ;
            }
    
            const {dg} = req.body ;
    
            if (dg==undefined){
                throw new ModelError(errorMessages.missingResource,400) ;
            }
    
            var check = dgInfoValidator(dg) ;
    
            if (check.error){
                throw new ModelError(check.errorList[0],400) ;
            }
            //add something to check wether the dg exists or not---
            ////////////////////////////////////////////////
            var data = await Dg.insertDg(dg) ;
            var result = await Dg.getDgById(data.insertId) ;

            res.status(200).json({dg: result}) ;

            
        } catch(err){
            res.status(err.status).json({error: err}) ;
        }
    }

    async modify(req,res){
        
        try {
            if (await isNotAdmin(req,res)){
                throw new ModelError(errorMessages.unauthorized,401) ;
            }
    
            const {dg} = req.body ;
    
            if (dg==undefined){
                throw new ModelError(errorMessages.missingResource,400) ;
            }
    
            var check = dgInfoValidator(dg) ;
    
            //additional check
            if (!("id" in dg)){
                throw new ModelError(errorMessages.missingID,400) ;
            } else if (check.error){
                throw new ModelError(check.errorList[0],400) ;
            }

            var data = await Dg.modifyDg(dg) ;

            if (data.affectedRows==1){
                var result = await Dg.getDgById(dg.id) ;
                res.status(200).json({dg: result}) ;
                return ;
            } else {
                throw new ModelError(errorMessages.inexistant,404) ;
            }
        } catch(err){
            res.status(err.status).json({error: err}) ;
            return ;
        }
    }   
}
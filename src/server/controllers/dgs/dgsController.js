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
        if (isNotAdmin){
            res.status(401).send(errorMessages.unauthorized) ;
            return ;
        }

        const {dg} = req.body ;
        var check = dgInfoValidator(dg) ;

        if (check.error){
            res.status(400).send(check.errorList[0]) ;
            return ;
        }

        try {
            //add something to check wether the dg exists or not---
            var data = await Dg.insertDg(dg) ;
            var result = await Dg.getDgById(data.insertId) ;

            res.status(200).json({dg: result}) ;

            
        } catch(err){
            res.status(err.status).send(err.message) ;
        }
    }

    async modify(req,res){
        if (isNotAdmin){
            res.status(401).send(errorMessages.unauthorized) ;
            return ;
        }

        const {dg} = req.body ;

        var check = dgInfoValidator(dg) ;

        //additional check
        if (!("id" in dg)){
            res.status(409).send("id not present in dg") ;
            return
        } else if (check.error){
            res.status(409).send(check.errorList[0]) ;
            return ;
        } 

        try {
            var data = await Dg.modifyDg(dg) ;

            console.log(data); 

            if (data.affectedRows==1){
                var result = await Dg.getDgById(dg.id) ;
                console.log(result) ;
                res.status(200).json({dg: result}) ;
                return ;
            } else {
                throw new ModelError("N'existe pas",409) ;
            }
        } catch(err){
            res.status(err.status).send(err.message) ;
            return ;
        }
    }   
}
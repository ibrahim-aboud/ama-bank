import Categorie from "../../models/categorieModel";
import categorieInfoValidator from "@/lib/validations/categorieInfoValidator";
import isNotAdmin from "@/lib/utils/checkAdmin";
import ModelError from "@/lib/utils/ModelError";
import { errorMessages } from "@/lib/utils/errorMessages";

export default class CategoriesController {

    async get(req,res){
        try {
            var categories = await Categorie.getAllCategories() ;
            res.status(200).json({categories}) ;
        } catch (err) {
            res.status(err.status).json({error: err}) ;
        }
        
    }

    async add(req,res){
        try {
            if (await isNotAdmin(req,res)){
                throw new ModelError(errorMessages.unauthorized,401) ;
            }

            const {categorie} = req.body ;

            if (categorie==undefined){
                throw new ModelError(errorMessages.missingResource,400);
            }
            
            var check = categorieInfoValidator(categorie) ;
            
            if (check.error){
                throw new ModelError(check.errorList[0],400) ;
            }
            
            //Checking if the categorie already exists :
            var result = await Categorie.getCategorieByName(categorie) ;

            if (result!=null){
                throw new ModelError(errorMessages.existant,409) ;
            }
            var data = await Categorie.insertCategorie(categorie) ; 

            res.status(200).json({categorie:data}) ;
        } catch (err) {
            res.status(err.status).json({error: err}) ;
        }
        
    }

    async delete(req,res){
        
            try {
                if (await isNotAdmin(req,res)){
                    throw new ModelError(errorMessages.unauthorized,500)
                } 
                const {id} = req.query ;
            
                if (isNaN(id)){
                    throw new ModelError(errorMessages.wrongId, 404) ;
                }
                
                var categorie = await Categorie.getCategorieById(id) ;
                
                if (categorie!=null){
                    await Categorie.deleteCategorie(id) ;
                    res.status(200).json({categorie}) ;
                } else {
                    throw new ModelError(errorMessages.wrongId,404) ;
                }
            } catch(err){
                res.status(500).json({error:err}) ;
            }
    }
    

}
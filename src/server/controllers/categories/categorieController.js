import Categorie from "../../models/categorieModel";
import ModelError from "@/lib/utils/ModelError";
import { errorMessages } from "@/lib/utils/errorMessages";

export default class CategorieController{
    
    async get(req,res){
        const {id} = req.query ;
        try {
            if (id==undefined){
                throw new ModelError(errorMessages.missingResource,400);
            }
            var data = await Categorie.getCategorieById(id) ;
            if (data==null){ 
                throw new ModelError(errorMessages.wrongId,404) ;
            } else {
                res.status(200).json({categorie: data})
            }
        } catch(err){
            res.status(err.status).json({error: err}) ;
        }
    }
}
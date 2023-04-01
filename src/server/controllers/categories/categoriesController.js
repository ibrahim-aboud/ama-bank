import Categorie from "../../models/categorieModel";
import categorieInfoValidator from "@/lib/validations/categorieInfoValidator";
import isNotAdmin from "@/lib/utils/checkAdmin";

export default class CategoriesController {

    async get(req,res){
        try {
            const categories = await Categorie.getAllCategories() ;
            res.status(200).json({categories}) ;
        } catch (err) {
            res.status(err.status).send(err.message) ;
        }
        
    }

    async post(req,res){
        if (isNotAdmin){
            res.status(403).send("Access Denied") ;
        } else {
            const {categorie} = req.body ;
    
            var check = categorieInfoValidator(categorie) ;
    
            if (check.error){
                res.status(201).send(check.errorList[0]) ;
            }
            
            //Checking if the categorie already exists :
            var result = [] ;
            try {
                result = await Categorie.getCategorieByName(categorie) ;
    
            } catch(err){
                console.log("suiii") ;
                res.status(400).send(err.message) ;
            }
    
            if (result.length!=0){
                res.status(400).send("Catégorie déja existante") ;
                return ;
            }
            
            try {
                const data = await Categorie.insertCategorie(categorie) ; 
                res.status(200).json({data}) ;
            } catch (err) {
                console.log("azert");
                res.status(500).send(err.message) ;
            }
        }
    }

    async delete(req,res){
        if (isNotAdmin){
            res.status(403).send("Access Denied") ;
        } else {
            const {id} = req.query ;
            if (isNaN(id)){
                res.status(400).send("Wrong id") ;
                return;
            }
            try {
                const state = await Categorie.deleteCategorie(id) ;
                if (state.data.affectedRows!=0){
                    let result = new Categorie(state.categorie.id_categorie, state.categorie.categorie_name) ;
                    res.status(200).json(result) ;
                } else {
                    res.status(200).send("Wrong id") ;
                    return ;
                }
            } catch(err){
                res.status(500).send("err.message") ;
            }
        }
    }

}
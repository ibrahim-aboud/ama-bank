import Categorie from "../../models/categorieModel";

export default class CategorieController{
    
    async get (req,res){
        const {id} = req.query ;
        
        if (isNaN(id)) {
            res.status(404).send("Invalid ID") ;
            return ;
        }

        try {
            const data = await Categorie.getCategorieById(id)
            res.status(200).json({data}) ;
        } catch(err) {
            res.status(500).send(err.message) ;
        }
    }

    // async post (req,res){
    //     const {categorie} = req.body ;
        
    //     const check = categorieInfoValidator(categorie) ;

    //     if (check.error){
    //         throw new Error(check.errorList[0]) ;
    //     }

    //     try{
    //         const data = await Categorie.insertCategorie(categorie) ;
    //         res.status(200).json({data}) ;
    //     } catch(err) {
    //         res.status(500).send(err.message) ;
    //     }
    // }
}
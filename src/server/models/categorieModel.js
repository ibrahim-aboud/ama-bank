import categorieInfoValidator from "@/lib/validations/categorieInfoValidator";
import dbQuery from "../db/connect";
import ModelError from "@/lib/utils/ModelError";


export default class Categorie{
    constructor (id,name){
        this.id = id ;
        this.name = name ;
    }

    static async getAllCategories(){
        
        try {
            var data = await dbQuery("SELECT * FROM ab_categories") ;
        } catch (err){
            throw new ModelError("Something went wrong !", 500) ;
        }

        var categories = data.map(element=>{
                return new Categorie(element.id_categorie,element.categorie_name)
        }) ;

        return categories ;
    }

    static async getCategorieById(id){
        try {
            var data = await dbQuery("SELECT * FROM ab_categories WHERE id_categorie=(?)",[id]) ;

        } catch(err){
            throw new ModelError("Something went wrong !",500) ;
        }

        return data ;
    }

    static async getCategorieByName(name){
        var data = [] ;
        try {
            data = dbQuery("SELECT * FROM ab_categories WHERE categorie_name=(?)",[name]) ;
        } catch (err){
            console.log("qdsfqfd");
            throw new ModelError("Something went wrong", 500) ;
        }

        return data ;
    }

    static async insertCategorie(categorieName){
        var data = [] ;
        try {
            await dbQuery("INSERT INTO ab_categories(categorie_name) VALUES (?)",categorieName) ;

            data = await dbQuery("SELECT * FROM ab_categories WHERE categorie_name=(?) ",categorieName) ;

            console.log(data) ;

        } catch(err){
            throw new ModelError("Something went wrong !",500) ;
        }

        return new Categorie(data[0].id_categorie,data[0].categorie_name) ;

    }

    static async deleteCategorie(categorie_id){
        try {
            var categorie = await dbQuery("SELECT * FROM ab_categories WHERE id_categorie=(?)",[categorie_id]) ;
            

            var data = await dbQuery("DELETE FROM ab_categories WHERE id_categorie=(?)",[categorie_id]) ;
    
        } catch (err){
            throw new ModelError("Something went wrong !",500) ;
        }

        return {
            categorie:categorie[0] ,
            data: data
        } ;
        
    }
}
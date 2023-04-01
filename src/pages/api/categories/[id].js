import CategoriesController from "@/server/controllers/categories/categoriesController" ;


export default async function handler(req,res){
    
    const controller = new CategoriesController() ;

    if (req.method=="DELETE"){
        
        controller.delete(req,res) ;
    }
}
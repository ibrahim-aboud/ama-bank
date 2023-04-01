import CategorieController from "@/server/controllers/categories/categorieController";

export default async function handler(req,res){
    const controller = new CategorieController() ;

    if (req.method=="GET"){
        await controller.get(req,res) ;
    }
}
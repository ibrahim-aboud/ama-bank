import CategoriesController from "@/server/controllers/categories/categoriesController" ;
import { errorMessages } from "@/lib/utils/errorMessages";

export default async function handler(req, res) {

    const controller = new CategoriesController() ;

    if (req.method=='GET') await controller.get(req,res) ;
    else if (req.method=="POST"){
        await controller.add(req,res) ;
    }
    else if (req.method=="DELETE") {
        await controller.delete(req,res) ;
    } else {
        res.status(405).json({error: new ModelError(errorMessages.wrongMethod,405)})
    }
    
}  
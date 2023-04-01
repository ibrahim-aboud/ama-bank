import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import CategoriesController from "@/server/controllers/categories/categoriesController" ;


export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    const isNotAdmin =
        !session ||
        !session.user ||
        !session.user.role ||
        session.user.role !== "admin";

    const controller = new CategoriesController() ;

    if (req.method=='GET') controller.get(req,res) ;
    else if (req.method=="POST"){
        
        // if (isNotAdmin){
        //     res.status(404).send("Acces Denied") ;
        //     return ;
        // } 
        controller.post(req,res) ;
    }
    else if (req.method=="DELETE") {
        // if (isNotAdmin){
        //     res.status(404).send("Acces Denied") ;
        //     return ;
        // }
        controller.delete(req,res) ;
    }
    
}  
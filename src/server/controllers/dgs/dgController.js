import Dg from "@/server/models/dgModel";

export default class DgController{
    async get(req,res){
        const {id} = req.query ;
        try {
            var dg = await Dg.getDgById(id) ;
            res.status(200).json({dg}) ;
        } catch(err){
            res.status(err.status).send(err.message) ;
        }
    }
}
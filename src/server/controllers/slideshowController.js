import SlideShow from "../models/slideshowModel";

export default class SlideShowController {
    async get(req,res){
        try {
            var data = await SlideShow.getAllSlideShows() ;
            res.status(200).json({slides: data}) ;
        } catch(err){
            res.status(err.status).json({error: err}) ;
        }
    }

    async post(req,res){

    }
    
}
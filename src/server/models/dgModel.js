import dbQuery from "../db/connect";

export default class Dg{
    
    constructor(id , bank_id ,address ,lat ,lng ,wilaya ,phone ,fax ,location_link){
        this.id = id ;
        this.bank_id = bank_id ;
        this.address = address ;
        this.lat =lat ; 
        this.lng = lng ;
        this.wilaya = wilaya ;
        this.phone = phone ;
        this.fax = fax ;
        this.location_link = location_link ;
    }

    static async getAllDgs(id){
        try {
            var data = await dbQuery("SELECT * FROM ab_dgs WHERE dg_bank_id=(?)",[id]) ;
        } catch(err){
            throw new ModelError(errorMessages.serverError,500) ;
        }

        var result = data.map(dg=>{
            return new Dg(
                dg.id_dg, 
                dg.dg_bank_id,
                dg.dg_address,
                dg.dg_lat,
                dg.dg_lng,
                dg.dg_wilaya,
                dg.dg_phone,
                dg.dg_fax,
                dg.dg_location_link   
            )
        })

        return result ;
    }

    static async getDgById(id){
        
        try {
            var data = await dbQuery("SELECT * FROM ab_dgs WHERE id_dg=(?)",[id]) ;
        } catch(err){
            throw new ModelError(errorMessages.serverError,500) ;
        }

        return data ;
    }

    static async insertDg(dg){
        
        const {bank_id ,address ,lat ,lng ,wilaya ,phone ,fax ,location_link} = dg ;
        try {
            
            var data = await dbQuery("INSERT INTO ab_dgs(dg_bank_id,dg_address,dg_lat,dg_lng,dg_wilaya,dg_phone,dg_fax,dg_location_link) VALUES ((?),(?),(?),(?),(?),(?),(?),(?))",[bank_id ,address ,lat ,lng ,wilaya ,phone ,fax ,location_link]) ;
            
        } catch(err){
            throw new ModelError(errorMessages.serverError,500) ;
        }

        return data ;

    }

    static async modifyDg(dg){
        const {id,bank_id ,address ,lat ,lng ,wilaya ,phone ,fax ,location_link} = dg ;

        try {
            var data = await dbQuery("UPDATE ab_dgs SET dg_bank_id=(?),dg_address=(?),dg_lat=(?),dg_lng=(?),dg_wilaya=(?),dg_phone=(?),dg_fax=(?),dg_location_link=(?) WHERE id_dg=(?)",[bank_id ,address ,lat ,lng ,wilaya ,phone ,fax ,location_link,id])
        } catch(err){
            throw new ModelError(errorMessages.serverError,500) ; 
        }

        return data ;
    }
}
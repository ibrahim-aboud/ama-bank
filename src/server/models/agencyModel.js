import ModelError from "@/lib/utils/ModelError";
import dbQuery from "../db/connect";
import { errorMessages } from "@/lib/utils/errorMessages";

export default class Agency {
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
    
    static async getAllAgencies(id){
        try {
            var data = await dbQuery("SELECT * FROM ab_agencies WHERE agency_bank_id=(?)",[id]) ;
        } catch(err){
            throw new ModelError(errorMessages.serverError,500) ;
        }

        var result = data.map(agency=>{
            return new Agency(
                agency.id_agency, 
                agency.agency_bank_id,
                agency.agency_address,
                agency.agency_lat,
                agency.agency_lng,
                agency.agency_wilaya,
                agency.agency_phone,
                agency.agency_fax,
                agency.agency_location_link   
            )
        })

        return result ;
    }

    static async getAgencyById(id){
        
        try {
            var data = await dbQuery("SELECT * FROM ab_agencies WHERE id_agency=(?)",[id]) ;
        } catch(err){
            throw new ModelError(errorMessages.serverError,500) ;
        }

        if (data.length==0){
            return null ;
        } else {
            return new Agency(
                data[0].id_agency, 
                data[0].agency_bank_id,
                data[0].agency_address,
                data[0].agency_lat,
                data[0].agency_lng,
                data[0].agency_wilaya,
                data[0].agency_phone,
                data[0].agency_fax,
                data[0].agency_location_link    
            ) ;
        }
    }

    static async insertAgency(agency){

        
        const {bank_id ,address ,lat ,lng ,wilaya ,phone ,fax ,location_link} = agency ;
        try {
            
            var data = await dbQuery("INSERT INTO ab_agencies(agency_bank_id,agency_address,agency_lat,agency_lng,agency_wilaya,agency_phone,agency_fax,agency_location_link) VALUES ((?),(?),(?),(?),(?),(?),(?),(?))",[bank_id ,address ,lat ,lng ,wilaya ,phone ,fax ,location_link]) ;
            
        } catch(err){
            throw new ModelError(errorMessages.serverError,500) ;
        }

        return data ;

    }

    static async modifyAgency(agency){
        const {id,bank_id ,address ,lat ,lng ,wilaya ,phone ,fax ,location_link} = agency ;

        try {
            var data = await dbQuery("UPDATE ab_agencies SET agency_bank_id=(?),agency_address=(?),agency_lat=(?),agency_lng=(?),agency_wilaya=(?),agency_phone=(?),agency_fax=(?),agency_location_link=(?) WHERE id_agency=(?)",[bank_id ,address ,lat ,lng ,wilaya ,phone ,fax ,location_link,id])
        } catch(err){
            throw new ModelError(errorMessages.serverError,500) ; 
        }

        return data ;
    }

    static async deleteAgency(id){
        try {
            var data = dbQuery("DELETE FROM ab_agencies WHERE id_agency=(?)",[id]) ;

        } catch(err){
            throw new ModelError(errorMessages.serverError,500) ;
        }

        return data ;
    }
}
import bankInfoValidator from "@/lib/validations/bankInfoValidator";
import Bank from "@/server/models/bankModel";
import ModelError from "@/lib/utils/ModelError";
import isNotAdmin from "@/lib/utils/checkAdmin";
import { errorMessages } from "@/lib/utils/errorMessages";
import FilesHelpers from "@/lib/utils/FilesHelpers";
import {globals} from "@/lib/utils/globals"

export default class BanksController {
  async get(req, res) {
    try {
      var banks = await Bank.getAllBanks();      
      res.status(200).json({ banks });

    } catch (err) {
      res.status(err.status).json({error: err}) ;
    }
  }

  async add (req,res){
        
    try {
        if (await isNotAdmin(req,res)){
            throw new ModelError(errorMessages.unauthorized,401) ;
        }
        
        const {bank} = req.body ; 

        if (bank==undefined){
            throw new ModelError(errorMessages.missingResource,400);
        }

        // var check = bankInfoValidator(bank) ;
        
        // if (check.error){
        //     throw new ModelError(check.errorList[0],400) ;
        // }

        // Aditional check (just to optimize) if the bank id really exists

        var data = await Bank.getBankByName(bank.name) ;
        
        if (data!=null){
            throw new ModelError(errorMessages.existant, 409) ;
        }
        
        data = await Bank.insertBank(bank) ;

        var result = await Bank.getBankById(data.insertId) ;

        res.status(200).json(result) ;
    } catch(err){
        res.status(err.status).json({error: err}) ;
    }

    return ;

}

  async modify(req,res){
        
  try {
      if (await isNotAdmin(req,res)){
          throw new ModelError(errorMessages.unauthorized,401) ;
      }

      const {bank} = req.body ; 

      if (bank==undefined){
          throw new ModelError(errorMessages.missingResource,400);
      }

      var check = bankInfoValidator(bank) ;
        
        if (check.error){
            throw new ModelError(check.errorList[0],400) ;
        }

      //additional check
      if (!("id" in bank)){
          throw new ModelError(errorMessages.missingID,400) ;
      }

      var data = await Bank.updateBank(bank) ;
      
      if (data.affectedRows==1){
          var result = await Bank.getBankById(bank.id) ;
          res.status(200).json({bank: result}) ;
          return ;
      } else {
          throw new ModelError(errorMessages.inexistant,404) ;
      }
    } catch(err){
        res.status(err.status).json({error: err}) ;
    }
    return
  }

  async delete(req,res){
    const {id} = req.query ;
    const {banks_images_folder, banks_logos_folder} = globals;
    try {
        if (await isNotAdmin(req,res)){
            throw new ModelError(errorMessages.unauthorized,401) ;
        }
        
        if (isNaN(id)){
            throw new ModelError(errorMessages.wrongId, 404) ;
        }

        var bank = await Bank.getBankById(id) ;

        if (bank!=null){
            await Bank.deleteBank(id) ;
            FilesHelpers.deleteFilesInDirectory_IgnoreExtension(`${id}.png`,banks_images_folder);
            FilesHelpers.deleteFilesInDirectory_IgnoreExtension(`${id}.png`,banks_logos_folder);
            res.status(200).json({bank}) ;
        } else {
            throw new ModelError(errorMessages.wrongId,404) ;
        }
        
    } catch(err){
        res.status(err.status).json({error: err}) ;
    }

    return ;
}

}
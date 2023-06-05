import {globals} from "../utils/globals";

export default function agencyInfoValidator(agency){
    let error = false ;
    var ArrayError = []

    var {requiredKeys} = globals ;

    var abscentKeys = [] ;
    requiredKeys.agency.forEach(item=>{
        if (!(item in agency)){
            abscentKeys.push(item) ;
        }
    })

    if (abscentKeys.length>0){
        ArrayError.push(`"${abscentKeys.join(", ")}" are not present in "agency"`) ;
        error = true ;
    }

    return {
        error,
        errorList: ArrayError,
    }

}
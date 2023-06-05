import {globals} from "../utils/globals";

export default function dgInfoValidator(dg){
    let error = false ;
    var ArrayError = []

    var {requiredKeys} = globals ;

    var abscentKeys = [] ;
    requiredKeys.dg.forEach(item=>{
        if (!(item in dg)){
            abscentKeys.push(item) ;
        }
    })

    if (abscentKeys.length>0){
        ArrayError.push(`"${abscentKeys.join(", ")}" are not present in "dg"`) ;
        error = true ;
    }

    return {
        error,
        errorList: ArrayError,
    }

}
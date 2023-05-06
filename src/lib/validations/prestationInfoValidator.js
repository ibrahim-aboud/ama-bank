import  {globals} from "../utils/globals";

export default function prestationInfoValidator(prestation){
    let error = false ;
    var ArrayError = []
    
    var {requiredKeys,possibleOperations} = globals ;
    var abscentKeys = [] ;
    requiredKeys.prestation.forEach(item=>{
        if (!(item in prestation)){
            abscentKeys.push(item) ;
        }
    })

    if (abscentKeys.length>0){
        ArrayError.push(`"${abscentKeys.join(", ")}" are not present in "prestation"`) ;
        error = true ;
    }

    if (!error){
        var  res = false ;
        for (var i=0;i<possibleOperations.length;i++){
            if (possibleOperations[i]==prestation.categorie_operation){
                res = true ;
                break ;
            }
        }
        if (!res){
            ArrayError.push(`"${prestation.categorie_operation}" n'est pas une valide categorie`) ;
        error = true ;   
        }
    }


    return {
        error,
        errorList: ArrayError,
    }

}

export default function categorieInfoValidator(categorieName){
    let error = false ;
    var ArrayError = [] ;

    if (categorieName==""){
        ArrayError.push("Le nom de la categorie n'a pas été spécifié") ;
        error = true ;
    }
    
    return {
        error: error ,
        errorList: ArrayError
    }
}
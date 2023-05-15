import axios from "axios";

export default async function createCategoriesMap(prests){
    var map = new Map() ;
    for (var i =0; i<prests.length ; i++){
      if (!(map.has(prests[i].categorie_id))){
        try {
          var response = await axios.get(
            process.env.NEXT_PUBLIC_API_URL + `/categorie/${prests[i].categorie_id}`
          ) ;
          map.set(prests[i].categorie_id,response.data.categorie.name) ;
        } catch(err){
          console.log(err) ;
          continue ;
        }
      }
    }
    return map ;
} 
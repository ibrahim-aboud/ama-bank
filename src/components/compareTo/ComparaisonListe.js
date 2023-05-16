import React, {useState, useEffect} from "react"
//import prestationsData from "../../../public/data/prestationsData.json"
import ComparaisonListeRow from "./ComparaisonListeRow.js"
import ListePrestationsLogos from "./ListePrestationsLogos.js"
import Image from "next/image"
import emptyBox from "public/assets/comparaisonPage/emptyBox.png"

function ComparaisonListe({bank1, bank2 , prestationsBank1, prestationsBank2}){

    // let prestationsBank1, prestationsBank2
    let prestationsData = {
/*      bank1Name : "Natixis Algérie",
        bank2Name : "BNP Paribas",  */  
        bank1Name : bank1.name,
        bank2Name : bank2.name,
        data : []
    }
    const [prestationsDataJSX, setPrestationsDataJSX] = useState([])
    const [errStyle, setErrStyle] = useState({display : "none"})
    function period(integer){
        if(integer == 1){
            return "/Jr"
        } else if(integer == 7){
            return "/Sem"
        } else if (integer == 30){
            return "/M"
        } else if(integer == 90){
            return "/Trim"
        } else if(integer == 135){
            return"/Semstre"
        } else if(integer == 360){
            return "/An"
        } else {
            return ""
        }
    }

    function tarifConverter(tarif){
        if(tarif === 0){
            return "GRATUIT"
        } else {
            return tarif.toString() + "DA"
        }
    }

    useEffect(() => {
        // axios.get(process.env.NEXT_PUBLIC_API_URL + `/prestations/${/*  props.object.bank1ID */1}`)
        // .then(response =>{
        //     prestationsBank1 = response.data.prestations
            
        //     return axios.get(process.env.NEXT_PUBLIC_API_URL + `/prestations/${/* props.object.bank2ID */2}`)
        //     })
        // .then(response =>{
        //     prestationsBank2 = response.data.prestations

            prestationsBank1.sort((a, b) =>{
                if (a.categorie_operation + a.name + a.type < b.categorie_operation + b.name + b.type) {
                    return -1;
                    } else if (a.categorie_operation + a.name + a.type > b.categorie_operation + b.name + b.type) {
                    return 1;
                    } else {
                    return 0;
                    }
            })
            prestationsBank2.sort((a, b) =>{
                if (a.categorie_operation + a.name + a.type < b.categorie_operation + b.name + b.type) {
                    return -1;
                    } else if (a.categorie_operation + a.name + a.type > b.categorie_operation + b.name + b.type) {
                    return 1;
                    } else {
                    return 0;
                    }
            })
            let cpt1 = 0, cpt2 = 0
            while(cpt1 < prestationsBank1.length && cpt2 < prestationsBank2.length){
                let word1 = prestationsBank1[cpt1].categorie_operation + prestationsBank1[cpt1].name + prestationsBank1[cpt1].type
                let word2 = prestationsBank2[cpt2].categorie_operation + prestationsBank2[cpt2].name + prestationsBank2[cpt2].type
                if(word1 === word2){
                    let obj = null

                    if (prestationsBank1[cpt1].tarif === 0 && prestationsBank2[cpt2].tarif === 0) {
                        obj = {
                            nom_prestation : prestationsBank1[cpt1].name + " " + prestationsBank1[cpt1].type,
                            tarifBanque0 : tarifConverter(prestationsBank1[cpt1].tarif)  + period(prestationsBank1[cpt1].period), 
                            tarifBanque1 : tarifConverter(prestationsBank2[cpt2].tarif) + period(prestationsBank2[cpt2].period),
                            lowerPrice : 1,
                            higherPrice : 1
                        }

                    } else
                    if(prestationsBank1[cpt1].period === 0 && prestationsBank2[cpt2].period !== 0){
                        obj = {
                            nom_prestation : prestationsBank1[cpt1].name + " " + prestationsBank1[cpt1].type,
                            tarifBanque0 : tarifConverter(prestationsBank1[cpt1].tarif) + period(prestationsBank1[cpt1].period), 
                            tarifBanque1 : tarifConverter(prestationsBank2[cpt2].tarif) + period(prestationsBank2[cpt2].period),
                            lowerPrice : 1,
                            higherPrice : 0
                        }
                    }else if(prestationsBank1[cpt1].period !== 0 && prestationsBank2[cpt2].period === 0){
                        obj = {
                            nom_prestation : prestationsBank1[cpt1].name + " " + prestationsBank1[cpt1].type,
                            tarifBanque0 : tarifConverter(prestationsBank1[cpt1].tarif)  +  period(prestationsBank1[cpt1].period), 
                            tarifBanque1 : tarifConverter(prestationsBank2[cpt2].tarif) + period(prestationsBank2[cpt2].period),
                            lowerPrice : 0,
                            higherPrice : 1
                        }
                    }else
                    if((prestationsBank1[cpt1].tarif /(prestationsBank1[cpt1].period + 1) )  > (prestationsBank2[cpt2].tarif /(prestationsBank2[cpt2].period + 1) ) ){
                            obj = {
                                nom_prestation : prestationsBank1[cpt1].name + " " + prestationsBank1[cpt1].type,
                                tarifBanque0 : tarifConverter(prestationsBank1[cpt1].tarif)  +  period(prestationsBank1[cpt1].period), 
                                tarifBanque1 : tarifConverter(prestationsBank2[cpt2].tarif) + period(prestationsBank2[cpt2].period),
                                lowerPrice : 0,
                                higherPrice : 1
                            }
                    } else {
                        if((prestationsBank1[cpt1].tarif /(prestationsBank1[cpt1].period + 1) )  < (prestationsBank2[cpt2].tarif /(prestationsBank2[cpt2].period + 1) ) ){

                            obj = {
                                nom_prestation : prestationsBank1[cpt1].name + " " + prestationsBank1[cpt1].type,
                                tarifBanque0 : tarifConverter(prestationsBank1[cpt1].tarif) + period(prestationsBank1[cpt1].period), 
                                tarifBanque1 : tarifConverter(prestationsBank2[cpt2].tarif) + period(prestationsBank2[cpt2].period),
                                lowerPrice : 1,
                                higherPrice : 0
                            }
                        }
                        else{
                            obj = {
                                nom_prestation : prestationsBank1[cpt1].name + " " + prestationsBank1[cpt1].type,
                                tarifBanque0 : tarifConverter(prestationsBank1[cpt1].tarif)  + period(prestationsBank1[cpt1].period), 
                                tarifBanque1 : tarifConverter(prestationsBank2[cpt2].tarif) + period(prestationsBank2[cpt2].period),
                                lowerPrice : 1,
                                higherPrice : 1
                            }
                        }
                    }
                    prestationsData.data.push(obj)
                    cpt1++
                    cpt2++
                } else {
                    if( word1 < word2 ){
                        cpt1++
                    } else {
                        cpt2++
                    }
                }
            }
            if(cpt1 == 0 || cpt2 == 0){
                setErrStyle({
                    display : "flex", 
                    gap : "10px",
                    justifyContent : "center",
                    alignItems : "center",
                    fontFamily : `"Nunito", sans-serif`,
                    fontSize : "25px"
                })
            } else {
                setErrStyle({display : "none"})
            }
            let greyBackground = true;
            setPrestationsDataJSX(prestationsData.data.map((prestation,index) =>{
                greyBackground = !greyBackground;
                 return <ComparaisonListeRow key={index} object={prestation} style={{greyBackground}} />}
            ))
    // })
    // .catch(error => {
    //     console.log(error.response || error.message)
    // })


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prestationsBank1,prestationsBank2]) 

    return(
        <div className="listePrestations">
            <ListePrestationsLogos object={prestationsData} img1Name={bank1.logoLink} img2Name={bank2.logoLink} />
            <div> {prestationsDataJSX.length != 0 && prestationsDataJSX}</div>
            <div style={errStyle}>
                <Image src={emptyBox} alt="icon" style={{ height: '2em', width: 'auto' }} />
                <span >Liste vide!</span>
             </div>
        </div>
    )
}

export default ComparaisonListe
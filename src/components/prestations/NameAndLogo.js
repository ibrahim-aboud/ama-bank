import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "@/styles/NameLogo.module.css"
import axios from "axios";

const NameAndLogo = ({bank_id}) => {

    const [bank, setBank] = useState() ;

    useEffect(()=>{
        if (!bank_id){
            setBank(null) ;
            return ;
        }
        axios.get(
            process.env.NEXT_PUBLIC_API_URL + `/bank/${bank_id}`
        ).then(response=>{
            setBank(response.data.bank) ;
        }).catch(err=>{
            setBank(null) ;
            return ;
        })
    },[bank_id]) ;
    
    return (
        <div className={styles.nameLogo}>
            {bank && (
                <>
                    <Image src={bank.logoLink} width={150} height={150} alt="bank_logo" ></Image>
                    <h1>{bank.name}</h1>
                </>
            )}
        </div>
     );
}
 
export default NameAndLogo;
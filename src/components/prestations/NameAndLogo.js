import Image from "next/image";
import { useEffect, useState } from "react";
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
        <div className="flex justify-center">
            {bank && (
                <div className="flex items-center">
                    <Image className="w-[120px] h-[120px] border rounded-bl-md rounded-tl-md" src={bank.logoLink} width={150} height={150} alt="bank_logo" ></Image>
                    <h1 className="font-bold flex px-5 rounded-tr-md rounded-br-md border flex-col justify-center items-center text-xl bg-gray-100 h-[120px]">{bank.name}</h1>
                </div>
            )}
        </div>
     );
}
 
export default NameAndLogo;
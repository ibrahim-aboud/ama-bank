import { MdDeleteForever, MdOutlineAddBox } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Fail from "@/components/common/feedback_popups/fail.js";
import Success from "@/components/common/feedback_popups/success.js";

function DeletePrestation({ isVisible, setIsVisible, prestation ,deletePrestation}) {
    
    const router = useRouter();
    const [message,setMessage]=useState("");
    const [feedbackVisible,setIsFeedbackVisible]=useState(false);
    const [isSuccessful,setIsSuccessful]=useState(false);

    // once confirmed, the service is deleted from data base (maybe !)
    async function onDelete(event) {

        event.preventDefault();
        const res = await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/prestations/${prestation.id}`, { prestation: prestation }); 
        res.data.json;
        setIsVisible(!isVisible);
        deletePrestation(prestation);
        setIsSuccessful(true);
        setIsFeedbackVisible(true);
        setMessage("Prestation supprimée avec succée");

        setTimeout(() => {setIsSuccessful(false); setIsFeedbackVisible(false);setMessage("")}, 2000);
    }
 
    if (!isVisible) return (
        <div>
            <Fail message={message} isVisible={feedbackVisible} isSuccessful={isSuccessful} />
            <Success message={message} isVisible={feedbackVisible} isSuccessful={isSuccessful} />
        </div>
    );
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
            <form onSubmit={onDelete} className="w-[350px] sm:w-[500px]">
                <div className="py-4 rounded-t-md bg-[#da4b38] text-white flex justify-center items-center">
                <MdDeleteForever size={25} className="mr-3" />
                <h2>Suppression d{"'"}une prestation</h2>
                </div>
                <div className="bg-white rounded-b-md pt-4 sm:pt-8 flex flex-col justify-center items-center">
                <h2 className="mb-8 font-semibold">Voulez-vous supprimer cette prestation?</h2>
                <div className="w-full">
                    <button className="w-1/2 bg-gray-200 p-2 rounded-bl-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium" onClick={onDelete}>
                        Confirmer
                    </button>
                    <button className="w-1/2 bg-gray-200 p-2 rounded-br-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium" onClick={() => {setIsVisible(!isVisible)}}>
                        Annuler
                    </button>
                </div>
                </div>
            </form>
        </div>
    )
}
export default DeletePrestation;
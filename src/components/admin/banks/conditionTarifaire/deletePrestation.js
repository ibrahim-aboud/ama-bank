import { MdDeleteForever, MdOutlineAddBox } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

function DeletePrestation({ isVisible, setIsVisible, prestation }) {
    

    async function onDelete(event) {

        event.preventDefault();
        const res = await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/prestations/${prestation.id}`, { prestation: prestation }); 
        res.data.json;
        setIsVisible(!isVisible);
    }

    if (!isVisible) return null;
    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
                <form onSubmit={onDelete} className="bg-white rounded flex flex-col items-center w-[700px]">
                    <div className="bg-[#df2e38] text-white w-full flex justify-center items-center py-4 rounded-t mb-5">
                        <MdDeleteForever size={25} />
                        <h2 className="text-lg font-medium ml-2">Confirmation de suppression de prestation</h2>
                    </div>
                    <div>
                        Vous allez supprimer definitivement cette prestation
                    </div>
                    <div className="flex mb-5 mt-5">
                        <button className="p-2 rounded border hover:bg-[#df2e389a] hover:ease-in-out duration-100" onClick={onDelete}>Supprimer</button>
                        <button className="p-2 ml-4 rounded border hover:bg-black-100 hover:ease-in-out duration-100" onClick={() => {setIsVisible(!isVisible);}}>Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DeletePrestation;
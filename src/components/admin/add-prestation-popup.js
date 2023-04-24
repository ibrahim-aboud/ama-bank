
import { MdOutlineClose } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AddPrestPopup({ isVisible, setIsVisible, bankId, prestationn, setPrestationn }) {

    const [prestation, setPrestation] = useState();
    const [categories, setCategories] = useState([]);
    const [prestations, setPrestations] = useState();

    useEffect(() => {
        setPrestation(
            {
                name: "",
                type: "",
                tarif: 0,
                period: 365,
                bank_id: 0,
                categorie_id: 0,
                categorie_operation: ""
            }
        );
        const fetchData = async () => {
            const response1 = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/categories");
            setCategories(response1.data.categories);
            //const response2 = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/prestations");
        }
        fetchData();

    }, []);

    async function onAdd() {
        
        const prestationToSend = {...prestation, bank_id: bankId};

        //await axios.post(process.env.NEXT_PUBLIC_API_URL + "/prestations", {prestation: prestationToSend});

        setIsVisible(!isVisible);
    }


    if (!isVisible) return null;
    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center ">
                <form onSubmit={onAdd} className="bg-white rounded flex flex-col items-center w-[700px]">
                    <div className="bg-green-100 w-full flex justify-center py-4 rounded-t mb-4">
                        <h2 className="text-lg font-medium">Ajouter une nouvelle prestation</h2>
                    </div>
                    <div className="flex flex-col">
                        <select
                            id="categorie"
                            name="categorie"
                            required
                            className="rounded bg-gray-100 outline-none border w-[350px] pl-3 py-2"
                            onChange={(event) => {setPrestation({...prestation, categorie_id: parseInt(event.target.value)}); setPrestation({...prestation, categorie_operation: categories[parseInt(event.target.value)]})}}
                        >
                            <option value="">--- Catégorie prestation ---</option>
                            {categories.map((item, index) => (
                                <option value={index}>{item.name}</option> // in case you forget, here you need to get the data from the db first, so replace this later
                            ))}
                        </select>

                        <select
                            id="nom_prestation"
                            name="nom_prestation"
                            required
                            className="rounded bg-gray-100 outline-none border w-[350px] pl-3 py-2 mt-2"
                            onChange={(event) => {setPrestation({...prestation, name: event.target.value})}} 
                        >
                            <option value="">--- Nom prestation ---</option>
                            <option value="Ouverture compte">Ouverture compte</option>  {/* in case you forget, here you need to get the data from the db first, so replace this later */}
                            <option value="Fermeture compte">Fermeture compte</option>
                            <option value="Autre prestation">Autre prestation</option>
                            <option value="Autre prestation 2">Autre prestation 2</option>
                        </select>
                        
                        <div className="flex justify-between my-2">
                            <select
                                id="type_prestation"
                                name="type_prestation"
                                required
                                className="rounded bg-gray-100 outline-none border w-[170px] pl-3 py-2"
                                onChange={(event) => {setPrestation({...prestation, type: event.target.value})}}
                            >
                                <option value="">--- Type ---</option>
                                <option value="Particuliers">Particuliers</option>
                                <option value="Professionnels">Professionnels</option>
                                <option value="Entreprise">Entreprise</option>
                            </select>

                            <select
                                id="nom_prestation"
                                required
                                name="nom_prestation"
                                className="rounded bg-gray-100 outline-none border w-[170px] pl-3 py-2"
                                onChange={(event) => {setPrestation({...prestation, period: parseInt(event.target.value)})}}
                            >
                                <option value="">--- Périodicité ---</option>
                                <option value="0">Non-périodique</option>
                                <option value="30">Par mois</option>
                                <option value="90">Par trimestre</option>
                                <option value="180">Par semestre</option>
                                <option value="360">Par an</option>
                            </select>
                        </div>

                        <input 
                            id="tarif"
                            name="tarif"
                            type="number"
                            min="0" 
                            max="1000000"
                            step="1"
                            required
                            placeholder="Tarif (gratuit par defaut)"
                            className="rounded bg-gray-100 outline-none border pl-5 py-2"
                            onChange={(event) => {setPrestation({...prestation, tarif: parseInt(event.target.value)})}}
                        />
                    </div>
                    <div className="flex mb-5 mt-4">
                        <button className="p-2 rounded border hover:bg-[#40916d9a] hover:ease-in-out duration-100">Ajouter</button>
                        <button className="p-2 ml-4 rounded border hover:bg-red-100 hover:ease-in-out duration-100" onClick={() => {setIsVisible(!isVisible)}}>Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
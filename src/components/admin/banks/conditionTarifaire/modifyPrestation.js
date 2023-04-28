import { MdOutlineAddBox } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { BiPencil } from "react-icons/bi";
import { useRouter } from "next/router";

export default function AddPrestPopup({ isVisible, setIsVisible, prestation , editPrestation}) {

    const [categorieOperations,setCategorieOperations] = useState(
        [
            {
                "id":1,
                "name":"Gestion et tenue de compte"
            },
            {
                "id":2,
                "name":"Opération de paiement"
            },
            {
                "id":3,
                "name":"Monétique"
            }
        ]
    );

    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [personalisedPrest, setPersonalisedPrest] = useState(false);
    const [prestations,setPrestations] = useState(prestation);
    const categorie_operation = ["Gestion et tenue de compte","Opération de paiement","Monétique"];
    useEffect(() => {
        const fetchData = async () => {
            const response1 = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/categories");
            setCategories(response1.data.categories);
            //const response2 = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/prestations");
        }
        fetchData();

    }, []);

    async function onAdd(event) {
        event.preventDefault();
        var prestationToSend = {...prestations};
        prestationToSend = {...prestationToSend};
        console.log("debug hi yes") ;
        console.log(prestationToSend)
        await axios
            .put(process.env.NEXT_PUBLIC_API_URL + "/prestations", {prestation: prestationToSend})
            .then((response) => {
                //console.log(response.data.token);
                return response.data.token;
            })
            .catch((error) => {
                console.log(error);
            });

        setIsVisible(!isVisible);
        setPersonalisedPrest(false);
        editPrestation(prestation)
    }

    if (!isVisible) return null;
    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
                <form onSubmit={onAdd} className="bg-white rounded flex flex-col items-center w-[700px]">
                    <div className="bg-[#40916de3] text-white w-full flex justify-center items-center py-4 rounded-t mb-5">
                        <BiPencil size={25}/>
                        <h2 className="text-lg font-medium ml-2">Modifier la prestation</h2>
                    </div>
                    <div className="flex flex-col">
                        <select
                            id="categorie"
                            name="categorie"
                            required
                            className="rounded bg-gray-100 outline-none border w-[450px] pl-3 py-2"
                            onChange={(event) => {setPrestations({...prestations, categorie_operation: event.target.value})}}
                        >
                            <option value="">{categorieOperations.find(item => item.name === prestation.categorie_operation).name}</option>
                            {categorieOperations.map((item) => (
                                <option key={item.id} value={item.name}>{item.name}</option>
                            ))}
                        </select>


                        <select
                            id="sousCategorie"
                            name="sousCategorie"
                            required
                            className="rounded bg-gray-100 outline-none border w-[450px] pl-3 py-2 mt-4"
                            onChange={(event) => {setPrestations({...prestations, categorie_id: parseInt(event.target.value)})}}
                        >
                            <option value="">{categories.find(item => item.id === prestation.categorie_id).name}</option>
                            {categories.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>

                        {personalisedPrest && (
                            <input 
                                id="nom_prest_custom"
                                name="nom_prest_custom"
                                type="text"
                                required={personalisedPrest}
                                placeholder="Nouvelle prestation"
                                className={`rounded bg-gray-100 outline-none border w-[450px] px-5 py-2 mt-3 ${personalisedPrest ? "" : "hidden"}`}
                                onChange={(event) => {setPrestations({...prestations, name: event.target.value})}}
                            />
                        )}

                        <select
                            id="nom_prestation"
                            name="nom_prestation"
                            required={!personalisedPrest}
                            className={`rounded bg-gray-100 outline-none border w-[450px] pl-3 py-2 mt-3 ${personalisedPrest ? "hidden" : ""}`}
                            onChange={(event) => {
                                if (event.target.value == "#NEW_CUSTOM") setPersonalisedPrest(true);
                                setPrestations({...prestations, name: event.target.value});
                            }} 
                        >
                            <option value="">{prestation.name}</option>
                            <option value="#NEW_CUSTOM">Nouvelle prestation personnalisée</option>

                            <option value="Ouverture compte">Ouverture compte</option>  {/* in case you forget, here you need to get the data from the db first, so replace this later */}
                            <option value="Fermeture compte">Fermeture compte</option>
                            <option value="Autre prestation">Autre prestation</option>
                            <option value="Autre prestation 2">Autre prestation 2</option>
                        </select>
                        
                        <div className="flex justify-between my-3">
                            <select
                                id="type_prestation"
                                name="type_prestation"
                                required
                                className="rounded bg-gray-100 outline-none border w-[220px] pl-3 py-2"
                                onChange={(event) => {setPrestations({...prestations, type: event.target.value})}}
                            >
                                <option value="">{prestation.type}</option>
                                <option value="particulier">Particuliers</option>
                                <option value="professionnel">Professionnels</option>
                                <option value="entreprise">Entreprise</option>
                            </select>

                            <select
                                id="nom_prestation"
                                required
                                name="nom_prestation"
                                className="rounded bg-gray-100 outline-none border w-[215px] pl-3 py-2"
                                onChange={(event) => {setPrestations({...prestations, period: parseInt(event.target.value)})}}
                            >
                                <option value="">{prestation.period}</option>
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
                            placeholder={`Tarif Actuel : ${prestation.tarif}`}
                            className="rounded bg-gray-100 outline-none border px-5 py-2"
                            onChange={(event) => {setPrestations({...prestations, tarif: parseInt(event.target.value)})}}
                        />
                    </div>
                    <div className="flex mb-5 mt-5">
                        <button className="p-2 rounded border hover:bg-[#40916d9a] hover:ease-in-out duration-100" onClick={onAdd}>Modifier</button>
                        <button className="p-2 ml-4 rounded border hover:bg-red-100 hover:ease-in-out duration-100" onClick={() => {setIsVisible(!isVisible); setPersonalisedPrest(false)}}>Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
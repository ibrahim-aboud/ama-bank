import { MdOutlineClose } from "react-icons/md";

export default function FilterElement({ prestation, typeCompte, type, value1, value2, onDelete }) {
    const typeMap = {
      0: "Inférieure à",
      1: "Égale à",
      2: "Supérieure à",
      3: "Comprise entre",
    };
    const typeCompteList = ["Particuliers", "Professionnel", "Entreprise"];
  
    return (
      <div className="flex items-center my-4">
        <div className="flex border p-2 rounded mr-2">
          <h2 className=" text-gray-400 mr-3">Prestation</h2>
          <h2>{prestation}</h2>
        </div>
        <div className="flex border p-2 rounded mr-2">
          <h2 className=" text-gray-400 mr-3">Type de compte</h2>
          <h2>{typeCompteList[typeCompte]}</h2>
        </div>
        <div className="flex border p-2 rounded mr-2">
          <h2 className="text-gray-400">{typeMap[type]}</h2>
          <h2 className="mr-2 ml-3">{value1}</h2><h2 className="text-gray-400">DA</h2>
        </div>
        <div
          className={`flex border p-2 rounded mr-2 ${
            type != 3 ? "hidden" : "visible"
          }`}
        >
          <h2 className="mr-2">{value2}</h2>
          <h2 className="text-gray-400">DA</h2>
        </div>
        <div>
          <button
            className="text-white place-self-end bg-[#EA5455] hover:ease-in-out duration-100 rounded-full"
            onClick={onDelete}
          >
            <MdOutlineClose size={15} />
          </button>
        </div>
      </div>
    );
  }
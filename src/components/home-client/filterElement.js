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
      <div className="flex flex-col lg:flex-row items-center my-4 border py-5 lg:py-0 lg:border-none">
        <div className="flex border p-2 rounded mr-2">
          <h2 className=" text-gray-400 mr-3">Prestation</h2>
          <h2>{prestation}</h2>
        </div>
        <div className="flex border p-2 rounded mr-2 my-3 lg:my-0">
          <h2 className=" text-gray-400 mr-3">Type de compte</h2>
          <h2>{typeCompteList[typeCompte]}</h2>
        </div>
        <div className="flex border p-2 rounded mr-2 mb-3 lg:mb-0">
          <h2 className="text-gray-400">{typeMap[type]}</h2>
          <h2 className="mr-2 ml-3">{value1}</h2><h2 className="text-gray-400">DA</h2>
        </div>
        <div
          className={`flex border p-2 rounded mr-2 mb-3 lg:mb-0 ${
            type != 3 ? "hidden" : "visible"
          }`}
        >
          <h2 className="mr-2">{value2}</h2>
          <h2 className="text-gray-400">DA</h2>
        </div>
        <div className="relative lg:static">
          <button
            className="text-white place-self-end bg-[#EA5455] hover:ease-in-out duration-100 rounded lg:rounded-full p-2 lg:p-0 absolute lg:static top-1 -right-3"
            onClick={onDelete}
          >
            <MdOutlineClose size={15} />
          </button>
        </div>
      </div>
    );
  }
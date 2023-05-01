import { BiFilterAlt } from "react-icons/bi";

const Search = ({searchQuery,setSearchQuery,isVisible,setIsVisible}) => {
    return ( 
        <div className="flex items-center justify-center mb-5 md:mb-8 w-full sm:w-[95%]">
            <div className=" mb-4 w-full lg:w-[800px] lgx:w-[1000px]">
                <h2 className="p-1 text-[1rem]">Nom de la banque</h2>
                <div className="px-3 md:px-7 py-1 sm:px-4 sm:py-2 rounded-md border shadow-sm flex items-center w-full bg-gray-100">
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="Rechercher une banque..."
                            className="border-none outline-none w-full text-md bg-gray-100 p-2 rounded-md border"
                            onChange={(event) => {
                            setSearchQuery(event.target.value);
                            }}
                            value={searchQuery}
                        />
                    </div>
                </div>
            </div>
            <div>
                <button
                    className="rounded-xl p-3 lg:px-8 sm:p-4 mt-4 ml-2 md:ml-10 font-semibold bg-gray-100 border border-gray-300 text-gray-600 hover:text-white hover:bg-[#40916C] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300"
                    onClick={() => {
                    setIsVisible(!isVisible);
                    }}
                >
                    <h2 className="smx:hidden">Filtrer</h2>
                    <BiFilterAlt size={23} className="lg:ml-2" />
                </button>
            </div>
        </div> 
    );
}
 
export default Search;
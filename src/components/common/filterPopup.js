import FilterElement from "./filterElement";
import { MdOutlineClose, MdDeleteForever, MdAdd } from 'react-icons/md';
import { BiFilterAlt } from "react-icons/bi";
import { useState } from "react";

export default function FilterPopup({ isVisible, setIsVisible, filters, setFilters }) {
    const [isAdding, setIsAdding] = useState(false);
    const typeList = ["Inférieure à", "Égale à", "Supérieure à", "Comprise entre"];
    const typeCompteList = ["Particuliers", "Professionnel", "Entreprise"];
  
    const [filter, setFilter] = useState({
      prestation: "",
      typeCompte: 0,
      type: 0,
      value1: 0,
      value2: 0
    })
  
    if (!isVisible) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center ">
        <div className="w-[1200px]">
          <div className="bg-white rounded p-12 flex flex-col items-center">
            <div className={`flex w-full items-center px-2 ${filters.length == 0 ? "" : "mb-10"}`}>
              <button
                className="text-white py-1 px-2 bg-[#40916C] hover:bg-[#4fb487] hover:ease-in-out duration-100 rounded-lg flex items-center"
                onClick={() => {setIsAdding(!isAdding)}}
              >
                Ajouter un filtre
                <MdAdd size={25} />
              </button>
              <button
                className="text-white ml-2 py-1 px-2 bg-[#EA5455] hover:bg-[#f76565] hover:ease-in-out duration-100 rounded-lg flex items-center"
                onClick={() => {setFilters([])}}
              >
                Supprimer tous les filtres
                <MdDeleteForever size={25} />
              </button>
              <button
                className="text-black ml-auto hover:text-white place-self-end hover:bg-[#EA5455] hover:ease-in-out duration-100 rounded-lg"
                onClick={() => {
                  if (isAdding) setIsAdding(!isAdding);
                  setIsVisible(!isVisible);
                }}
              >
                <MdOutlineClose size={28} />
              </button>
            </div>
            <div>
              {isAdding && (
                <div className="flex items-center my-4 px-10">
                  <div className="flex border p-2 rounded mr-2">
                    <label className=" text-gray-400 mr-3 font-bold" htmlFor="prestation">Prestation</label>
                    <select
                      id="prestation" 
                      name="prestation"
                      className="outline-none "
                      onChange={(event) => {setFilter({...filter, prestation: event.target.value})}}
                    >
                      <option value="">Selectionner</option>
  
                      {/* Smail, put here a map that iterates over the list of prestations */}
                      <option value="Ouverture compte">Ouverture compte</option>
                      <option value="Fermeture compte">Fermeture compte</option>
                      <option value="Autre prestation">Autre prestation</option>
                      <option value="Autre prestation 2">Autre prestation 2</option>
                    </select>
                  </div>
                  <div className="flex border p-2 rounded mr-2">
                    <label className=" text-gray-400 mr-3 font-bold" htmlFor="typeCompte">Type de compte</label>
                    <select
                      id="typeCompte" 
                      name="typeCompte"
                      className="outline-none "
                      onChange={(event) => {setFilter({...filter, typeCompte: parseInt(event.target.value)})}}
                    >
                      <option value="">Selectionner</option>
                      {typeCompteList.map((item, index) => (
                        <option key={index} value={index}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex border p-2 rounded mr-2">
                    <select 
                      id="type"
                      name="type"
                      className="outline-none"
                      onChange={(event) => {setFilter({...filter, type: parseInt(event.target.value)})}}
                    >
                      <option value="">Selectionner</option>
                      {typeList.map((item, index) => (
                        <option key={index} value={index}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex border p-2 rounded mr-2">
                    <input
                      className="mr-2 outline-none w-[50px]"
                      id="value1"
                      name="value1"
                      placeholder="Gratuit" // attention men hadi @Smail
                      onChange={(event) => {setFilter({...filter, value1: parseInt(event.target.value)})}}
                    />
                    <h2 className="text-gray-400 font-bold">DA</h2>
                  </div>
                  <div className={`flex border p-2 rounded mr-2 ${filter.type != 3 ? "hidden" : "visible"}`}>
                  <input
                      className="mr-2 outline-none w-[50px]"
                      id="value2"
                      name="value2"
                      placeholder="Gratuit" // attention men hadi @Smail
                      onChange={(event) => {setFilter({...filter, value2: parseInt(event.target.value)})}}
                    />
                    <h2 className="text-gray-400 font-bold">DA</h2>
                  </div>
                  <div>
                    <button
                      className="text-white place-self-end bg-[#40916C] hover:bg-[#4fb487] hover:ease-in-out duration-100 rounded-full"
                      onClick={() => {
                        setFilters([...filters, filter])
                        setIsAdding(!isAdding);
                      }}
                    >
                      <MdAdd size={15} />
                    </button>
                  </div>
                </div>
              )}
              
              {filters.map((filter, index) => (
                <FilterElement
                  key={index}
                  prestation={filter.prestation}
                  typeCompte={filter.typeCompte}
                  type={filter.type}
                  value1={filter.value1}
                  value2={filter.value2}
                  onDelete={() => {
                    const temp = [...filters];
                    temp.splice(index, 1);
                    setFilters(temp);
                  }}
                />
              ))}
            </div>
            <div>
              <button
                className={`${filters.length == 0 ? "hidden" : ""} rounded-xl p-2 lg:p-2 sm:p-4 mt-4 ml-2 font-semibold bg-gray-100 border border-gray-300 text-gray-600 hover:text-white hover:bg-[#40916C] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300`}
                onClick={() => {setIsVisible(!isVisible)}}
              >
                Filtrer
                <BiFilterAlt size={15} className="lg:ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
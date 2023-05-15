import FilterElement from "./filterElement";
import { MdOutlineClose, MdDeleteForever, MdAdd } from 'react-icons/md';
import { BiFilterAlt } from "react-icons/bi";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function FilterPopup({ isVisible, setIsVisible, filters, setFilters, prestations,categories, banks,setFilteredBanks, typeCompteList }) {
    const [isAdding, setIsAdding] = useState(false);
    const typeList = ["Inférieure à", "Égale à", "Supérieure à", "Comprise entre"];
    // const typeCompteList = ["Particuliers", "Professionnel", "Entreprise"];
  
    const [filter, setFilter] = useState({
      prestation: "",
      typeCompte: 0,
      type: -1,
      value1: 0,
      value2: 0
    })

    const settings = {
      dots: true,
      arrows: false,
      infinite: true,
      autoplay: false,
      autoplaySpeed: 5000,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  
    if (!isVisible) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center ">
        <div className="w-[360px] lg:w-[1200px]">
          <div className="bg-white rounded py-5 px-3 lg:p-8 lg:flex lg:flex-col lg:items-center text-sm lg:text-base">
            <div className={`flex w-full items-center px-2 ${filters.length == 0 ? "" : "lg:mb-10"}`}>
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
                <h2 className="hidden lg:block">Supprimer tous les filtres</h2>
                <h2  className="lg:hidden">Supprimer tout</h2>
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
                <div className="lg:flex items-center my-4 hidden">
                  <div className="flex border p-2 rounded mr-2">
                    <label className=" text-gray-400 mr-3 font-bold" htmlFor="prestation">Prestation</label>
                    <select
                      id="prestation" 
                      name="prestation"
                      className="outline-none"
                      onChange={(event) => {setFilter({...filter, prestation: event.target.value})}}
                    >
                      <option value="">Selectionner</option>
                      {categories.map((c,index)=>(
                        <option value={c.name} key={index} >{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex border p-2 rounded mr-2">
                    <label className=" text-gray-400 mr-3 font-bold" htmlFor="typeCompte">Type de compte</label>
                    <select
                      id="typeCompte" 
                      name="typeCompte"
                      className="outline-none"
                      onChange={(event) => {setFilter({...filter, typeCompte: parseInt(event.target.value)})}}
                    >
                      <option value="">Selectionner</option>
                      {typeCompteList.map((item, index) => (
                        <option key={index} value={index}>{item[0].charAt(0).toUpperCase() + item.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex border p-2 rounded mr-2 ">
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
                <div className="hidden lg:block" key={index}>
                  <FilterElement
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
                </div>

              ))}
              <div className="lg:hidden mb-4">
                <Slider {...settings}>
                  {isAdding && (
                    <div className="flex flex-col items-center justify-center my-4 border py-3 px-11">
                      <div className="flex border p-2 rounded mr-2 w-[250px]">
                        <label className=" text-gray-400 mr-3 font-bold" htmlFor="prestation">Prestation</label>
                        <select
                          id="prestation" 
                          name="prestation"
                          className="outline-none"
                          onChange={(event) => {setFilter({...filter, prestation: event.target.value})}}
                        >
                          <option value="">Selectionner</option>
                          {categories.map((c,index)=>(
                            <option value={c.name} key={index} >{c.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex border p-2 rounded mr-2 w-[250px] my-3">
                        <label className=" text-gray-400 mr-3 font-bold" htmlFor="typeCompte">Type de compte</label>
                        <select
                          id="typeCompte" 
                          name="typeCompte"
                          className="outline-none w-[117px]"
                          onChange={(event) => {setFilter({...filter, typeCompte: parseInt(event.target.value)})}}
                        >
                          <option value="">Selectionner</option>
                          {typeCompteList.map((item, index) => (
                            <option key={index} value={index}>{item[0].charAt(0).toUpperCase() + item.slice(1)}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex border p-2 rounded mr-2 w-[250px]">
                        <select 
                          id="type"
                          name="type"
                          className="outline-none w-full"
                          onChange={(event) => {setFilter({...filter, type: parseInt(event.target.value)})}}
                        >
                          <option value="">Selectionner</option>
                          {typeList.map((item, index) => (
                            <option key={index} value={index}>{item}</option>
                          ))}
                        </select>
                      </div>
                      <div className={`flex border p-2 rounded mr-2 w-[250px] mt-3 ${filter.type != 3 ? "mb-5" : "mb-3"}`}>
                        <input
                          className="mr-2 outline-none w-[200px]"
                          id="value1"
                          name="value1"
                          placeholder="Gratuit" // attention men hadi @Smail
                          onChange={(event) => {setFilter({...filter, value1: parseInt(event.target.value)})}}
                        />
                        <h2 className="text-gray-400 font-bold">DA</h2>
                      </div>
                      <div className={`flex border p-2 rounded mr-2 w-[250px] mb-5 ${filter.type != 3 ? "hidden" : "visible"}`}>
                        <input
                          className="mr-2 outline-none w-[200px]"
                          id="value2"
                          name="value2"
                          placeholder="Gratuit" // attention men hadi @Smail
                          onChange={(event) => {setFilter({...filter, value2: parseInt(event.target.value)})}}
                        />
                        <h2 className="text-gray-400 font-bold">DA</h2>
                      </div>
                      <div className="relative lg:static">
                        <button
                          className="text-white place-self-end bg-[#40916C] hover:bg-[#4fb487] hover:ease-in-out duration-100 rounded p-2 lg:p-0 absolute lg:static -top-1 right-[44%] lg:rounded-full"
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
                    <div key={index}>
                      <FilterElement
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
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
import { getSession } from "next-auth/react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { BiFilterAlt } from "react-icons/bi";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  MdOutlineCompareArrows,
  MdOutlineClose,
  MdDeleteForever,
  MdAdd,
} from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import Scrollbar from "@/components/common/scrollbar";

function BankListElement(props) {

  return (
    <div>
      <div className="flex justify-center items-center mb-5 md:mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center w-[150px] sm:w-[400px]">
          <Image
            src={props.logo_src}
            alt={`${props.name} logo`}
            width={400}
            height={400}
            className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px] shadow-lg"
          />
          <h2 className="font-bold sm:pl-[5%] sm:text-md smx:mt-2 lg:text-2xl">
            {props.name}
          </h2>
        </div>

        <div className="flex smx:flex-col items-center">
          <button className="rounded-xl px-5 lg:mr-5 smx:mb-1 smx:py-2 py-3 font-semibold bg-[#40916C] text-white shadow-md hover:bg-[#51b186] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300">
            <h2 className="smx:hidden">Comparer avec une autre banque</h2>
            <h2 className="lg:hidden text-[0.7rem]">Comparer</h2>
            <MdOutlineCompareArrows size={23} className="ml-2 smx:hidden" />
            <MdOutlineCompareArrows size={17} className="ml-2 lg:hidden" />
          </button>

          <Link
            href={`/bank/${props.id}`}
            className="rounded-xl px-5 smx:py-2 py-3 font-semibold bg-[#40916C] text-white shadow-md hover:bg-[#51b186] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300"
          >
            <h2 className="smx:hidden">Plus de details</h2>
            <h2 className="lg:hidden text-[0.7rem]">Details</h2>
            <TbListDetails size={23} className="ml-2 smx:hidden" />
            <TbListDetails size={17} className="ml-2 lg:hidden" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Slide(props) {
  return (
    <Link href={props.url} target={`${props.url !== "" ? "_blank" : ""}`}>
      <div
        className="pb-[50%] bg-cover bg-center"
        style={{ backgroundImage: `url(${props.imgUrl})` }}
      />
    </Link>
  );
}

function Slideshow() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  {
    /* add more slides here */
  }
  const idToUrl = {
    1: "https://www.example.com",
    2: "https://www.google.com",
    3: "https://www.github.com",
    4: "",
    5: "",
    6: "",
    7: "",
  };

  return (
    <div>
      <Slider {...settings}>
        {Object.keys(idToUrl).map((id) => (
          <div key={id}>
            <Slide
              url={idToUrl[id]}
              imgUrl={`/assets/images/slideshow/${id}.png`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

function FilterPopup({ isVisible, setIsVisible, filters, setFilters }) {
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

function FilterElement({ prestation, typeCompte, type, value1, value2, onDelete }) {
  const typeMap = {
    0: "Inférieure à",
    1: "Égale à",
    2: "Supérieure à",
    3: "Comprise entre",
  };
  const typeCompteList = ["Particuliers", "Professionnel", "Entreprise"];

  return (
    <div className="flex items-center my-4 px-10">
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

export default function Home({ banks }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredList = banks.filter((bank) =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const router = useRouter();
  const { id } = router.query;

  function _getDefaultBankId() {
    if (
      id !== null &&
      id !== undefined &&
      !isNaN(id) &&
      id >= 0 &&
      Number.isInteger(parseInt(id))
    ) {
      return parseInt(id);
    }

    // return banks && banks.length > 0 ? banks[0].id : null;
    return null;
  }
  const [isVisible, setIsVisible] = useState(false);

  const [filters, setFilters] = useState([]);

  return (
    <div>
      <div className="mt-1">
        <Slideshow />
      </div>

      <div>
        <div className="flex flex-col items-center my-14 py-[1%] px-[10%]">
          <div className="flex items-center mb-5 md:mb-16">
            <div className=" mb-4 xs:w-[300px] sm:w-[500px] lg:w-[800px] lgx:w-[1000px]">
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
                className="rounded-xl p-3 lg:px-8 sm:p-4 mt-4 ml-2 font-semibold bg-gray-100 border border-gray-300 text-gray-600 hover:text-white hover:bg-[#40916C] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300"
                onClick={() => {
                  setIsVisible(!isVisible);
                }}
              >
                <h2 className="smx:hidden">Filtrer</h2>
                <BiFilterAlt size={23} className="lg:ml-2" />
              </button>
            </div>
          </div>

          <div className="w-[340px] xs:w-[400px] sm:w-[600px] md:w-[700px] lg:w-[1000px] lgx:w-[1200px] h-[540px]">
            <Scrollbar>
              <div className="w-full bg-[#d9d9d928] py-10 md:py-16 rounded-md">
                {filteredList.map((bank) => (
                  <BankListElement
                    key={bank.id}
                    id={bank.id}
                    name={bank.name}
                    logo_src={bank.logo_src}
                  />
                ))}
              </div>
            </Scrollbar>
          </div>
        </div>
      </div>

      <FilterPopup isVisible={isVisible} setIsVisible={setIsVisible} filters={filters} setFilters={setFilters} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  var banks = [];

  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/banks"
    );

    banks = response.data.banks;
  } catch (e) {
    console.error(e.message);
  }

  return {
    props: { banks },
  };
}

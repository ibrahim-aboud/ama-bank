import { getSession } from "next-auth/react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { BiFilterAlt } from "react-icons/bi";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slideshow from "@/components/common/slideshow";
import FilterPopup from "@/components/common/filterPopup";
import { MdOutlineCompareArrows } from "react-icons/md";
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

        <div className="flex flex-col md:flex-row items-center">
          <button className="rounded-xl px-5 md:mr-2 lg:mr-5 mb-1 md:mb-0 smx:py-2 py-3 font-semibold bg-[#40916C] text-white shadow-md hover:bg-[#51b186] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300">
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


export default function Home({ banks }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredList = banks.filter((bank) =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [isVisible, setIsVisible] = useState(false);

  const [filters, setFilters] = useState([]);

  return (
    <div>
      <div className="mt-[1px]">
        <Slideshow />
      </div>

      <div>
        <div className="flex flex-col items-center my-14 py-[1%] px-[3%] lg:px-[10%]">
          <div className="flex items-center justify-center mb-5 md:mb-16 w-full sm:w-[95%]">
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

          <div className="w-full lg:w-[1000px] lgx:w-[1200px] h-[500px] md:h-[660px]">
            <Scrollbar>
              <div className="w-full bg-[#d9d9d928] py-10 md:py-16 rounded-md">
                {filteredList.map((bank) => (
                  <BankListElement
                    key={bank.id}
                    id={bank.id}
                    name={bank.name}
                    logo_src={bank.logoLink}
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

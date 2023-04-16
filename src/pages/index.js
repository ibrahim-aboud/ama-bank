import { getSession } from "next-auth/react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { MdAddCircle } from "react-icons/md";
import { BiFilterAlt } from "react-icons/bi";
import Image from "next/image";
import SearchBox from "@/components/common/searchBox";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Home({ banks }) {
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

  const [selectedBankId, setSelectedBankId] = useState(_getDefaultBankId());

  return (
    <div>
      <section className="">
        <Slideshow />
      </section>

      <section>
        <div className="flex flex-col items-center h-screen mt-14">
          <div className="flex items-center mb-20">
            <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
              <h2 className="p-1 text-lg">Nom de la banque</h2>
              <div className="bg-[#ffffff6e] px-4 py-2 rounded-md border shadow-sm flex items-center w-full">
                <div className="w-full">
                  <SearchBox
                    items={banks}
                    selectedId={selectedBankId}
                    setSelectedId={setSelectedBankId}
                    searchField="name"
                  />
                  {console.log(banks)}
                </div>
              </div>
            </div>
            <div>
              <Link
                href="/admin/banks/add-bank"
                className="rounded-xl px-10 py-4 mt-4 ml-2 font-semibold bg-black text-white shadow-xl hover:bg-[#40916C] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300"
              >
                Filtrer
                <BiFilterAlt size={23} className="ml-2" />
              </Link>
            </div>
          </div>

          <div className="w-full px-[20%]">
            <div className="w-full bg-[#d9d9d928] py-16 rounded-md">
              {banks.map((bank) => (
                <BankListElement 
                  name={bank.name}
                  logo_src={bank.logo_src}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function BankListElement(props) {
  const [isGstBanksHidden, setIsGstBanksHidden] = useState(true);

  return (
    <div>
      <div className="flex justify-center items-center mb-10">
        <Image
          src={props.logo_src}
          alt="amaBank logo"
          width={400}
          height={400}
          className="w-[80px] h-[80px] shadow-lg"
        />
        <h2 className="font-bold pl-8 text-2xl pr-[450px]">{props.name}</h2>

        <div
          className="flex justify-center items-center gap-2 relative cursor-pointer rounded-xl bg-green-600 hover:bg-green-700 text-white  shadow-md py-3 px-5 mr-3 hover:ease-in-out duration-300"
          onClick={() => setIsGstBanksHidden(!isGstBanksHidden)}
        >
          <span>Modifier les informations</span>
          {isGstBanksHidden ? (
            <FaAngleDown />
          ) : (
            <FaAngleDown className="rotate-180" />
          )}
          <div
            className={`${
              isGstBanksHidden ? "hidden" : "flex"
            } absolute z-40 bg-green-600 text-white flex-col justify-center items-center top-12 px-6 py-2 rounded-xl animate-fade-in`}
          >
            <Link
              href="/admin/banks/general"
              className="w-48 text-center py-1 hover:bg-green-700 hover:rounded-xl"
            >
              Informations Générales
            </Link>
            <Link
              href="/admin/banks/agencies"
              className="w-48 text-center py-1 hover:bg-green-700 hover:rounded-xl"
            >
              Agencies
            </Link>
            <Link
              href="/admin/banks/prestations"
              className="w-48 text-center py-1 hover:bg-green-700 hover:rounded-xl"
            >
              Conditions Tarifaires
            </Link>
          </div>
        </div>

        <button className="rounded-xl px-5 py-3 font-semibold bg-red-600 text-white shadow-md hover:bg-red-700 disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300">
          Supprimer la banque
          <MdDeleteForever size={23} className="ml-2" />
        </button>
      </div>
    </div>
  );
}

function Slide() {
    return (
      <div>

      </div>
    )
}

function Slideshow() {
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
      <Slider {...settings}>
        <div className="relative h-0 pb-[56.25%]">
          <Image
            className="absolute inset-0 w-full h-full object-cover"
            src="/assets/images/slideshow/i1.png"
            layout="fill"
            objectFit="cover"
            alt="Image"
          />
        </div>
        <div className="relative h-0 pb-[56.25%]">
          <Image
            className="absolute inset-0 w-full h-full object-cover"
            src="/assets/images/slideshow/i1.png"
            layout="fill"
            objectFit="cover"
            alt="Image"
          />
        </div>
      
      </Slider>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  var banks = [];

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

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
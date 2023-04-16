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
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'

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

function Slide(props) {
    return (
      <div className="relative pb-[56.25%] bg-cover bg-center h-screen" style={{ backgroundImage: `url(${props.url})` }}>
        <div className={`${props.showbutton ? '' : 'hidden'}`}>
          <button className={`p-4 bg-[#${props.colorhex}] font-bold text-2xl rounded-full shadow-md absolute right-[20%] top-[50%]`}>
            <h2>{props.buttontext}</h2>
          </button>
        </div>
      </div>
    )
}

// function NextArrow({ onClick }) {
//   return (
//     <div className="absolute right-3 top-[600px]">
//       <button className="rounded-full p-3 bg-[#111111e0] text-white grid place-items-center cursor-pointer" onClick={onClick}>
//         <FaChevronRight />
//       </button>
//     </div>
//   )
// }

// function PrevArrow({ onClick }) {
//   return (
//     <div className="absolute right-3 top-[700px]">
//       <button className="rounded-full p-3 bg-[#111111e0] text-white" onClick={onClick}>
//         <FaChevronLeft />
//       </button>
//     </div>
//   )
// }

function Slideshow() {
  
  const settings = {
    dots: true,
    arrows: true,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        
        <Slide url="/assets/images/slideshow/1.png" buttontext="Comparer les banques" colorhex="40916C"/>
        <Slide url="/assets/images/slideshow/2.png" buttontext="Consulter les banques" colorhex="40916C" showbutton="1"/>
        <Slide url="/assets/images/slideshow/3.jpg" buttontext="Choisir votre banque" colorhex="40916C"/>
        <Slide url="/assets/images/slideshow/4.png" buttontext="Explorer notre site" colorhex="40916C" showbutton="1"/>
        {/* add more slides here */}
      
      </Slider>
    </div>
  )
}

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
      <section className="h-screen shadow-2xl mb-[7%]">
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
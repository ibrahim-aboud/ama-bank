import { getSession } from "next-auth/react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { BiFilterAlt } from "react-icons/bi";
import Image from "next/image";
import SearchBox from "@/components/common/searchBox";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdOutlineCompareArrows } from 'react-icons/md';
import { TbListDetails } from 'react-icons/tb';

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
        <h2 className="font-bold pl-8 text-2xl w-[35%]">{props.name}</h2>

        <button className="rounded-xl px-5 py-3 font-semibold bg-[#40916C] mr-2 text-white shadow-md hover:bg-[#51b186] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300">
          Comparer avec une autre banque
          <MdOutlineCompareArrows size={23} className="ml-2" />
        </button>

        <button className="rounded-xl px-5 py-3 font-semibold bg-[#40916C] text-white shadow-md hover:bg-[#51b186] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300">
          Plus de details
          <TbListDetails size={23} className="ml-2" />
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

function Slideshow() {
  
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
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
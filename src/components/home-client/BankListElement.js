import Image from "next/image";
import { MdOutlineCompareArrows } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import Link from "next/link";

function BankListElement(props) {

  const handleClick= ()=>{
    window.open(`/comparer?first=${props.id}`,"_blank") ;
  }
  
    return (
      <div>
        <div className="flex justify-center items-center mb-5 md:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center w-[150px] sm:w-[400px]">
            <Image
              src={props.logo_src}
              alt={`${props.name} logo`}
              width={400}
              height={400}
              className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px] shadow-lg rounded-md"
            />
            <h2 className="font-bold sm:pl-[5%] sm:text-md smx:mt-2 lg:text-lg">
              {props.name}
            </h2>
          </div>
  
          <div className="flex flex-col md:flex-row items-center">
            <button className="rounded-xl px-5 md:mr-2 lg:mr-5 mb-1 md:mb-0 smx:py-2 py-3 font-semibold bg-[#40916C] text-white shadow-md hover:bg-[#51b186] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300" onClick={handleClick}>
              <h2 className="smx:hidden">Comparer avec une autre banque</h2>
              <h2 className="lg:hidden text-[0.7rem]">Comparer</h2>
              <MdOutlineCompareArrows size={23} className="ml-2 smx:hidden" />
              <MdOutlineCompareArrows size={17} className="ml-2 lg:hidden" />
            </button>
  
            <Link
              href={`/bank/${props.id}#top`}
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

export default BankListElement ;
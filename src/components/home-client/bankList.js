import Scrollbar from "@/components/common/scrollbar";
import BankListElement from "./BankListElement";

const BankList = ({filteredList}) => {
  return ( 
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
  );
}
 
export default BankList;
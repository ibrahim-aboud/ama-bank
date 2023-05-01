import { getSession } from "next-auth/react";
import axios from "axios";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slideshow from "@/components/common/slideshow";
import FilterPopup from "@/components/common/filterPopup";
import Search from "@/components/home-client/Search";
import BankList from "@/components/home-client/bankList";


export default function Home({ banks }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredList = banks.filter((bank) =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  filteredList.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  });

  const [isVisible, setIsVisible] = useState(false);

  const [filters, setFilters] = useState([]);

  return (
    <div>
      <div className="mt-[1px]">
        <Slideshow />
      </div>
      <div className="flex flex-col items-center my-14 py-[1%] px-[3%] lg:px-[10%]">
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} isVisible={isVisible} setIsVisible={setIsVisible} />
        <BankList filteredList={filteredList}/>
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

import { getSession } from "next-auth/react";
import axios from "axios";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slideshow from "@/components/home-client/slideshow";
import FilterPopup from "@/components/home-client/filterPopup";
import Search from "@/components/home-client/Search";
import BankList from "@/components/home-client/bankList";
import createCategoriesMap from "@/lib/utils/createCategoriesMap";


export default function Home({ banks, prestations, categories}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredList = banks.filter((bank) =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [isVisible, setIsVisible] = useState(false);

  const [filters, setFilters] = useState([]);

  const [filteredBanks, setFilteredBanks] = useState(banks) ;

  // var map = await createCategoriesMap(prestations) ;

  // var categorieNames = categories.map(c=>{
  //   return c.name ;
  // })


  // useEffect(()=>{
  //   var res=[] ;
  //   prestations.map(prst=>{
  //     if (map.get(prst.categorie_id) in categorieNames) {
  //       res.push(prst.bank_id)
  //     }
  //   })

  //   setFilteredBanks(filteredBanks.filter(bank=>{
  //     return bank.id in res
  //   }))
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },filters) ;

  return (
    <div>
      <div className="mt-[1px]">
        <Slideshow />
      </div>
      <div className="flex flex-col items-center my-14 py-[1%] px-[3%] lg:px-[10%]">
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} isVisible={isVisible} setIsVisible={setIsVisible} />
        <BankList filteredList={filteredList}/>
      </div>

      <FilterPopup isVisible={isVisible} setIsVisible={setIsVisible} filters={filters} setFilters={setFilters} prestations={prestations} categories={categories} banks={banks} setFilteredBanks={setFilteredBanks} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  var banks = [];
  var prestations = [] ;
  var categories = [] ;

  try {
    var response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/banks"
    );

    banks = response.data.banks;

    response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/prestations"
    )

    prestations = response.data.prestations

    response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/categories"
    )

    categories = response.data.categories 

  } catch (e) {
    console.error(e.message);
  }

  return {
    props: { banks, categories, prestations},
  };
}

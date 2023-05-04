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


export default function Home({ banks, prestations, categories, object  }) {
  const [searchQuery, setSearchQuery] = useState("");

  var map = new Map(Object.entries(object)) ;

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

  
  const [filteredBanks, setFilteredBanks] = useState(filteredList) ;

  var categorieNames = categories.map(c=>{
    return c.name ;
  })


  useEffect(()=>{
    var res=[] ;

    prestations.map(prst=>{
      filters.map(fltr=>{
        console.log(fltr.type)
        if ((prst.name==fltr.prestation)&&(prst.type.toLowerCase() ==fltr.typeCompte.toLowerCase())){
          switch (fltr.type){
            case 0: {
              if (prst.tarif<fltr.value1){
                res.push(prst) ;
              }
            } ;
            case 1: {
              if (prst.tarif==fltr.value1) {
                res.push(prst) ;
              }
            } ;
            case 2: {
              if (prst.tarif>fltr.value1) {
                res.push(prst) ;
              }
            } ;
            case 3: {
              if ((prst.tarif>=fltr.value1)&&(prst.tarif<=fltr.value2)){
                res.push(prst) ;
              }
            }
          }

        }
      })
        
    })

    console.log(res) ;
    // var bank_ids = [];
    // res.map(prst=>{
    //   if (!(prst.bank_id in bank_ids)){
    //     bank_ids.push(prst.bank_id) ;
    //   }
    // })
  
    // console.log(bank_ids) ;
  
    // setFilteredBanks(filteredBanks.filter(bank=>{
    //   return bank.id in res
    // }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]) ;



  return (
    <div>
      <div className="mt-[1px]">
        <Slideshow />
      </div>
      <div className="flex flex-col items-center my-14 py-[1%] px-[3%] lg:px-[10%]">
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} isVisible={isVisible} setIsVisible={setIsVisible} />
        <BankList filteredList={filteredBanks}/>
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

    var map = await createCategoriesMap(prestations) ;

    var object = Object.fromEntries(map) ;


  } catch (e) {
    console.error(e.message);
  }

  return {
    props: { banks, categories, prestations, object},
  };
}

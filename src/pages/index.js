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
import Slider from "react-slick";

export default function Home({
  banks,
  prestations,
  categories,
  object,
  types,
  slides,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  var map = new Map(Object.entries(object));

  const [isVisible, setIsVisible] = useState(false);

  const [filters, setFilters] = useState([]);

  var allBanks = banks.map((bank) => {
    return bank.id;
  });

  const [filteredBanks, setFilteredBanks] = useState(banks);

  const filteredList = filteredBanks.filter((bank) =>
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

  useEffect(() => {
    var final = allBanks;

    // setFilteredBanks(banks) ;
    for (var i = 0; i < filters.length; i++) {
      var res1 = prestations.filter((prst) => {
        return (
          map.get(`${prst.categorie_id}`).toLowerCase() ==
            filters[i].prestation.toLowerCase() &&
          prst.type.toLowerCase() == types[filters[i].typeCompte].toLowerCase()
        );
      });

      var res2 = res1.filter((prst) => {
        switch (filters[i].type) {
          case 0: {
            if (prst.tarif < filters[i].value1) {
              return true;
            } else {
              return false;
            }
          }
          case 1: {
            if (prst.tarif == filters[i].value1) {
              return true;
            } else {
              return false;
            }
          }
          case 2: {
            if (prst.tarif > filters[i].value1) {
              return true;
            } else {
              return false;
            }
          }
          case 3: {
            if (
              prst.tarif >= filters[i].value1 &&
              prst.tarif <= filters[i].value2
            ) {
              return true;
            } else {
              return false;
            }
          }
          default: {
            return true;
          }
        }
      });

      var res3 = res2.map((prst) => {
        return prst.bank_id;
      });

      var res4 = final.filter((id) => {
        return res3.includes(id);
      });

      final = res4;
      if (res4.length == 0) {
        break;
      }
    }

    var result = [];

    banks.map((bank) => {
      if (final.includes(bank.id)) {
        result.push(bank);
      }
    });

    setFilteredBanks(result);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <div>
      <div className="mt-[1px]">
        <Slideshow slides={slides} />
      </div>

      <div className="flex flex-col items-center my-14 py-[1%] px-[3%] lg:px-[10%]">
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
        <BankList filteredList={filteredList} />
      </div>

      <FilterPopup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        filters={filters}
        setFilters={setFilters}
        prestations={prestations}
        categories={categories}
        banks={banks}
        setFilteredBanks={setFilteredBanks}
        typeCompteList={types}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  var banks = [];
  var prestations = [];
  var categories = [];
  var types = [];
  var slides = [];

  try {
    var response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/banks");

    banks = response.data.banks;

    response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/prestations"
    );

    prestations = response.data.prestations;

    response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/categories");

    categories = response.data.categories;

    response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/prestations/types"
    );

    types = response.data.types;

    var map = await createCategoriesMap(prestations);

    var object = Object.fromEntries(map);

    response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/slideshow");

    slides = response.data.slides;
  } catch (e) {
    console.error(e.message);
  }

  if (object == undefined) {
    object = [];
  }

  return {
    props: { banks, categories, prestations, object, types, slides },
  };
}

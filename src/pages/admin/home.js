import AdminLayout from "@/layouts/adminLayout";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { TbHomeCog } from "react-icons/tb";
import { MdAddCircle, MdDeleteForever } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import Scrollbar from "@/components/common/scrollbar";
import SuccessFeedback from "@/components/common/feedback_popups/success";
import FailFeedback from "@/components/common/feedback_popups/fail";

function ConfirmDelete({ id, name, isDeleting, setIsDeleting, filteredList, setFilteredList, setIsSuccessful, setIsFeedbackVisible }) {
  async function deleteBank(id) {
    try {
      await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/banks/${id}`);
      setIsSuccessful(true);
      setIsFeedbackVisible(true);
      setTimeout(() => {setIsFeedbackVisible(false), setIsSuccessful(false)}, 3000);
    } catch (e) {
      console.log(e.message);
      setIsFeedbackVisible(true);
      setIsSuccessful(false);
      setTimeout(() => {setIsFeedbackVisible(false), setIsSuccessful(false)}, 3000);
    }
  }

  if (!isDeleting) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-[350px] sm:w-[500px]">
        <div className="py-4 rounded-t-md bg-red-500 text-white flex justify-center items-center">
          <RiDeleteBin6Line size={23} className="mr-3" />
          <h2>Suppression définitive d{"'"}une banque</h2>
        </div>
        <div className="bg-white rounded-b-md pt-4 sm:pt-8 flex flex-col justify-center items-center">
          <h2 className="mb-8 font-semibold">Voulez-vous supprimer {'"' + name + '"'}?</h2>
          <div className="w-full">
            <button className="w-1/2 bg-gray-200 p-2 rounded-bl-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium" onClick={async () => {
                await deleteBank(id);
                const filtered = filteredList.filter((bank) => {return bank.id !== id});
                setFilteredList(filtered);
                setIsDeleting(!isDeleting);
            }}>
                Confirmer
            </button>
            <button className="w-1/2 bg-gray-200 p-2 rounded-br-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium" onClick={() => {setIsDeleting(!isDeleting)}}>
                Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BankListElement({ id, name, logo_src, isDeleting, setIsDeleting, onDelete, isFeedbackVisible, isSuccessful }) {
  const [isGstBanksHidden, setIsGstBanksHidden] = useState(true);

  return (
    <div>
      <div className="flex justify-center items-center mb-5 md:mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center w-[150px] sm:w-[400px] lgx:w-[550px]">
          <Image
            src={logo_src}
            alt={`${name} logo`}
            width={400}
            height={400}
            className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px] shadow-lg rounded-md"
          />
          <h2 className="font-bold sm:pl-[5%] sm:text-md smx:mt-2 lg:text-lg">{name}</h2>
        </div>

        <div
          className="flex justify-center items-center gap-2 relative cursor-pointer rounded-xl bg-[#40916C] hover:bg-[#46a078] text-white hover:shadow-md p-3 sm:p-4 lg:py-3 lg:px-4 mr-3 hover:ease-in-out duration-300"
          onClick={() => setIsGstBanksHidden(!isGstBanksHidden)}
        >
          <span className="smx:hidden">Modifier les informations</span>
          {isGstBanksHidden ? (
            <FaAngleDown />
          ) : (
            <FaAngleDown className="rotate-180" />
          )}
          <div
            className={`${
              isGstBanksHidden ? "hidden" : "flex"
            } absolute z-40 bg-[#57a381fa] text-white flex-col justify-center items-center top-12 rounded-b-xl animate-fade-in hover:shadow-md`}
          >
            <Link
              href={`/admin/banks/general?id=${id}`}
              className="w-full text-center py-1 px-6 hover:bg-gray-100 hover:text-black"
            >
              Informations Générales
            </Link>
            <Link
              href={`/admin/banks/agencies?id=${id}`}
              className="w-full text-center py-1 px-6 hover:bg-gray-100 hover:text-black"
            >
              Agences
            </Link>
            <Link
              href={`/admin/banks/prestations?id=${id}`}
              className="w-full text-center py-1 px-6 hover:bg-gray-100 hover:text-black hover:rounded-b-xl"
            >
              Conditions Tarifaires
            </Link>
          </div>
        </div>

        <button className="rounded-xl p-2 sm:p-3 lg:px-4 lg:py-3 font-semibold bg-[#EA5455] text-white hover:shadow-md hover:bg-[#ff5c5c] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300" onClick={() => {
          onDelete();
          setIsDeleting(!isDeleting);
        }
        }>
          <h2 className="smx:hidden">Supprimer la banque</h2>
          <MdDeleteForever size={23} className="lg:ml-2" />
        </button>
      </div>
      <SuccessFeedback message={"Suppression avec succès"} isVisible={isFeedbackVisible} isSuccessful={isSuccessful} />
      <FailFeedback message={"Échec"} isVisible={isFeedbackVisible} isSuccessful={isSuccessful} />
    </div>
  );
}

function Home({ banks }) {
  const [searchQuery, setSearchQuery] = useState("");

  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    const temp = banks;
    temp.sort((bank1, bank2) => {
      if (bank1.name.toLowerCase() < bank2.name.toLowerCase()) return -1;
      else if (bank1.name.toLowerCase() > bank2.name.toLowerCase()) return 1;
      else return 0;
    })
    setFilteredList(temp.filter((bank) =>
      bank.name.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery])

  const [isDeleting, setIsDeleting] = useState(false);
  const [idToDelete, setIdToDelete] = useState(0);
  const [nameToDelete, setNameToDelete] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

  return (
    <div className="flex flex-col items-center h-screen mt-5 sm:mt-14">
      <div className="py-6 lg:mx-16 flex items-center justify-center lg:gap-14 w-full">
        <div className="hidden lg:block h-[2px] bg-black w-[25%]" />

        <div className="flex items-center justify-center gap-4 text-2xl md:text-3xl">
          <TbHomeCog className=" font-bold" />
          <h3 className="font-bold">Acceuil Administrateur</h3>
        </div>

        <div className="hidden lg:block h-[2px] bg-black w-[25%]" />
      </div>
      
        <div className="flex flex-col items-center md:my-14 py-[1%] lgx:px-[10%]">
          <div className="flex items-center justify-center mb-5 md:mb-16 w-full">
            <div className="mb-4 sm:mr-6 w-[85%] lg:w-[800px] lgx:w-[1000px]">
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
            <Link
              href="/admin/banks/add-bank"
              className="rounded-xl p-3 lg:px-4 sm:p-4 mt-4 ml-2 font-semibold bg-[#111111] text-white hover:text-white hover:bg-[#40916C] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300"
            >
              <h2 className="smx:hidden">Ajouter une banque</h2>
              <MdAddCircle size={22} className="lg:ml-2" />
            </Link>
          </div>

          <div className="w-[340px] xs:w-[400px] sm:w-[600px] md:w-[700px] lg:w-[1000px] lgx:w-[1200px] h-[400px] sm:h-[540px] md:mb-32">
            <Scrollbar>
              <div className="w-full bg-[#d9d9d928] py-16 rounded-md">
                {filteredList.map((bank) => (
                  <BankListElement
                    key={bank.id}
                    id={bank.id}
                    name={bank.name}
                    logo_src={bank.logoLink}
                    isDeleting={isDeleting}
                    setIsDeleting={setIsDeleting}
                    isFeedbackVisible={isFeedbackVisible}
                    isSuccessful={isSuccessful}
                    onDelete={() => {
                      setIdToDelete(bank.id);
                      setNameToDelete(bank.name);
                    }}
                  />
                ))}
              </div>
            </Scrollbar>
          </div>
        </div>
        <ConfirmDelete id={idToDelete} name={nameToDelete} isDeleting={isDeleting} setIsDeleting={setIsDeleting} filteredList={filteredList} setFilteredList={setFilteredList} setIsSuccessful={setIsSuccessful} setIsFeedbackVisible={setIsFeedbackVisible} />
    </div>
  );
}

Home.getLayout = function PageLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  var banks = [];
  var banks = [];

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/banks"
    );

    banks = response.data.banks;
  } catch (e) {
    console.error(e.message);
  }

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
    props: { banks },
  };
}
export default Home;

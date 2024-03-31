import React, { useState, useEffect } from "react";
import Image from "next/image";
import adressIcon from "public/assets/modificationsPage/adressIcon.svg";
import telIcone from "public/assets/modificationsPage/telIcone.svg";
import faxIcone from "public/assets/modificationsPage/faxIcon.svg";
import localisationIcon from "public/assets/modificationsPage/localisationIcon.svg";
import modificationListeDescard from "public/assets/modificationsPage/modificationListeDescard.svg";
import styles from "src/styles/agenciesModificaitonStyles/modificaitonListe.module.css";
import InputBar from "./inputBar";
import FailFdBack from "src/components/common/feedback_popups/fail.js";
import SuccessFdBack from "src/components/common/feedback_popups/success.js";
import axios from "axios";
import ScrollBar from "react-perfect-scrollbar";

function ModificationListe(Props) {
  const [bankId, setBankId] = useState(
    Props.record.message1 != "Sauvegarder les modifications"
      ? 0
      : Props.data.bank_id
  );
  const [wilaya, setWilaya] = useState(
    Props.record.message1 != "Sauvegarder les modifications"
      ? 0
      : Props.data.wilaya
  );
  const [adresse, setAdresse] = useState(
    Props.record.message1 != "Sauvegarder les modifications"
      ? null
      : Props.data.address
  );
  const [phone, setPhone] = useState(
    Props.record.message1 != "Sauvegarder les modifications"
      ? null
      : Props.data.phone
  );
  const [fax, setFax] = useState(
    Props.record.message1 != "Sauvegarder les modifications"
      ? null
      : Props.data.fax
  );
  const [localisation, setLocalisation] = useState(
    Props.record.message1 != "Sauvegarder les modifications"
      ? null
      : Props.data.location_link
  );
  const [bankList, setBankList] = useState(null);
  const [banks, setBanks] = useState([]);
  const [error, setError] = useState([]);
  const [errStyle, setErrStyle] = useState(false);
  const wilayas = [
    "01 - Adrar",
    "02 - Chlef",
    "03 - Laghouat",
    "04 - Oum El Bouaghi",
    "05 - Batna",
    "06 - Béjaïa",
    "07 - Biskra",
    "08 - Béchar",
    "09 - Blida",
    "10 - Bouira",
    "11 - Tamanghasset",
    "12 - Tébessa",
    "13 - Tlemcen",
    "14 - Tiaret",
    "15 - Tizi Ouzou",
    "16 - Alger",
    "17 - Djelfa",
    "18 - Jijel",
    "19 - Sétif",
    "20 - Saïda",
    "21 - Skikda",
    "22 - Sidi Bel Abbès",
    "23 - Annaba",
    "24 - Guelma",
    "25 - Constantine",
    "26 - Médéa",
    "27 - Mostaganem",
    "28 - M'Sila",
    "29 - Mascara",
    "30 - Ouargla",
    "31 - Oran",
    "32 - El Bayadh",
    "33 - Illizi",
    "34 - Bordj Bou Arréridj",
    "35 - Boumerdès",
    "36 - El Tarf",
    "37 - Tindouf",
    "38 - Tissemsilt",
    "39 - El Oued",
    "40 - Khenchela",
    "41 - Souk Ahras",
    "42 - Tipaza",
    "43 - Mila",
    "44 - Aïn Defla",
    "45 - Naama",
    "46 - Aïn Témouchent",
    "47 - Ghardaïa",
    "48 - Relizane",
  ];

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + `/banks`)
      .then((response) => {
        setBanks(response.data.banks);
        console.log(banks);
        setBankList(
          response.data.banks.map((element) => {
            return (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            );
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [banks]);

  const handleInputs = (val, which) => {
    switch (which) {
      case "Adresse *":
        setAdresse(val);
        break;
      case "Numéro de téléphone":
        setPhone(val);
        break;
      case "Fax":
        setFax(val);
        break;
      case "Localisation":
        setLocalisation(val);
        break;
    }
  };

  const verifyData = () => {
    return new Promise((resolve, reject) => {
      let errMsg = [];
      if (bankId == 0) {
        errMsg.push(" Choisir une banque!");
      }
      if (wilaya == 0) {
        errMsg.push(
          " Choisir la wilaya de l'agence que vous souhaitez ajouter."
        );
      }
      if (adresse == null || adresse.length < 5) {
        errMsg.push(" L'adresse contient moins de 5 caractères.");
      }
      if (phone == "INVALID_VALUE") {
        errMsg.push(" Introduire un numéro de téléphone valide!");
      }
      if (fax == "INVALID_VALUE") {
        errMsg.push(" Introduire un numéro de fax valide!");
      }
      if (localisation == "INVALID_VALUE") {
        errMsg.push(" Introduire un lien de localisation valide!");
      }
      if (errMsg.length > 0) {
        reject(errMsg);
      } else {
        resolve();
      }
    });
  };

  const handleButtonClick = () => {
    verifyData()
      .then(() => {
        let objToSend = {
          agency: {
            id: null,
            bank_id: bankId,
            address: adresse,
            lat: null,
            lng: null,
            wilaya: wilaya,
            phone: phone,
            fax: fax,
            location_link: localisation,
          },
        };
        if (Props.record.message1 != "Sauvegarder les modifications") {
          axios
            .post(process.env.NEXT_PUBLIC_API_URL + "/agencies", objToSend)
            .then((response) => {
              console.log(response);
            })
            .catch((err) => {
              console.log(err.message);
            });
        } else {
          if (Props.idAgency < 0) {
            objToSend = {
              dg: {
                id: -Props.idAgency,
                bank_id: bankId,
                address: adresse,
                lat: null,
                lng: null,
                wilaya: wilaya,
                phone: phone,
                fax: fax,
                location_link: localisation,
              },
            };

            axios
              .put(process.env.NEXT_PUBLIC_API_URL + "/dgs", objToSend)
              .then((response) => {
                Props.handleUpdateScreen(objToSend, "EditDg");
                console.log(response);
              })
              .catch((err) => {
                console.log(err.message);
              });
          } else {
            objToSend.agency.id = Props.idAgency;
            axios
              .put(process.env.NEXT_PUBLIC_API_URL + "/agencies", objToSend)
              .then((response) => {
                Props.handleUpdateScreen(objToSend, "EditAgency");
                console.log(response);
              })
              .catch((err) => {
                console.log(err.message);
              });
          }
        }
        setError(["Opération bien éffectuée"]);
        setErrStyle(true);
      })

      .catch((errMsg) => {
        try {
          setError(errMsg);
        } catch (e) {
          setError(["Problème de connexion au serveur."]);
        }
        setErrStyle(true);
      });
  };

  return (
    <div className={styles.dataModification}>
      <form className={styles.dataInput}>
        <span className={styles.inputMessage}>Nom de la banque *</span>
        <select
          name="bankName"
          className={styles.inputBlock}
          required
          onChange={(e) => {
            setBankId(parseInt(e.target.value));
          }}
        >
          {Props.record.message1 == "Sauvegarder les modifications" ? (
            <>
              <option value={Props.data.bank_id}>
                {banks &&
                banks.find((element) => element.id == Props.data.bank_id) !=
                  undefined
                  ? banks.find((element) => element.id == Props.data.bank_id)
                      .name
                  : ""}
              </option>
              {banks
                .filter((element) => element.id != Props.data.bank_id)
                .map((element) => (
                  <option key={element.id} value={element.id}>
                    {element.name}
                  </option>
                ))}
            </>
          ) : (
            <>
              <option value="0">Sélectionner une banque</option>
              {banks.map((element) => (
                <option key={element.id} value={element.id}>
                  {element.name}
                </option>
              ))}
            </>
          )}
        </select>

        <span className={styles.inputMessage}>Wilaya *</span>
        <select
          name="wilaya"
          className={styles.inputBlock}
          required
          onChange={(e) => {
            setWilaya(parseInt(e.target.value));
          }}
        >
          {Props.record.message1 != "Sauvegarder les modifications" ? (
            <>
              <option value="0">Sélectionner la wilaya</option>
              <option value="16">16 - Alger</option>
              <option value="01">01 - Adrar</option>
              <option value="02">02 - Chlef</option>
              <option value="03">03 - Laghouat</option>
              <option value="04">04 - Oum El Bouaghi</option>
              <option value="05">05 - Batna</option>
              <option value="06">06 - Béjaïa</option>
              <option value="07">07 - Biskra</option>
              <option value="08">08 - Béchar</option>
              <option value="09">09 - Blida</option>
              <option value="10">10 - Bouira</option>
              <option value="11">11 - Tamanghasset</option>
              <option value="12">12 - Tébessa</option>
              <option value="13">13 - Tlemcen</option>
              <option value="14">14 - Tiaret</option>
              <option value="15">15 - Tizi Ouzou</option>
              <option value="17">17 - Djelfa</option>
              <option value="18">18 - Jijel</option>
              <option value="19">19 - Sétif</option>
              <option value="20">20 - Saïda</option>
              <option value="21">21 - Skikda</option>
              <option value="22">22 - Sidi Bel Abbès</option>
              <option value="23">23 - Annaba</option>
              <option value="24">24 - Guelma</option>
              <option value="25">25 - Constantine</option>
              <option value="26">26 - Médéa</option>
              <option value="27">27 - Mostaganem</option>
              <option value="28">28 - M{"'"}Sila</option>
              <option value="29">29 - Mascara</option>
              <option value="30">30 - Ouargla</option>
              <option value="31">31 - Oran</option>
              <option value="32">32 - El Bayadh</option>
              <option value="33">33 - Illizi</option>
              <option value="34">34 - Bordj Bou Arréridj</option>
              <option value="35">35 - Boumerdès</option>
              <option value="36">36 - El Tarf</option>
              <option value="37">37 - Tindouf</option>
              <option value="38">38 - Tissemsilt</option>
              <option value="39">39 - El Oued</option>
              <option value="40">40 - Khenchela</option>
              <option value="41">41 - Souk Ahras</option>
              <option value="42">42 - Tipaza</option>
              <option value="43">43 - Mila</option>
              <option value="44">44 - Aïn Defla</option>
              <option value="45">45 - Naama</option>
              <option value="46">46 - Aïn Témouchent</option>
              <option value="47">47 - Ghardaïa</option>
              <option value="48">48 - Relizane</option>
            </>
          ) : (
            <>
              <option value={Props.data.wilaya.toString()}>
                {wilayas[Props.data.wilaya - 1]}
              </option>
              {wilayas
                .filter((element, index) => index + 1 != Props.data.wilaya)
                .map((element, index) => (
                  <option key={index + 1} value={index + 1}>
                    {element}
                  </option>
                ))}
            </>
          )}
        </select>

        <InputBar
          record={{
            title: "Adresse *",
            placeHolder: "Ex: 99 route de Meftah16310 Alger",
            icone: adressIcon,
            type: "text",
            handleInputs: handleInputs,
          }}
          data={
            Props.record.message1 == "Sauvegarder les modifications"
              ? adresse
              : ""
          }
        />
        <InputBar
          record={{
            title: "Numéro de téléphone",
            placeHolder: "Ex: +213 21 98 53 99",
            icone: telIcone,
            type: "tel",
            handleInputs: handleInputs,
          }}
          data={
            Props.record.message1 == "Sauvegarder les modifications"
              ? phone
              : ""
          }
        />
        <InputBar
          record={{
            title: "Fax",
            placeHolder: "Ex: +213 21 98 53 99",
            icone: faxIcone,
            type: "tel",
            handleInputs: handleInputs,
          }}
          data={
            Props.record.message1 == "Sauvegarder les modifications" ? fax : ""
          }
        />
        <InputBar
          record={{
            title: "Localisation",
            placeHolder: "Ex: https://goo.gl/maps/onJ7hBd4oZ1fMpPj9",
            icone: localisationIcon,
            type: "url",
            handleInputs: handleInputs,
          }}
          data={
            Props.record.message1 == "Sauvegarder les modifications"
              ? localisation
              : ""
          }
        />
      </form>

      {error[0] !== "Opération bien éffectuée" ? (
        <FailFdBack
          message={
            <button
              onClick={() => {
                setErrStyle(false);
              }}
            >
              <ul style={{ textAlign: "start" }}>
                {error.map((element, index) => (
                  <li key={index} style={{ marginLeft: "5px" }}>
                    {element}
                  </li>
                ))}
              </ul>
            </button>
          }
          isSuccessful={false}
          isVisible={errStyle}
        />
      ) : (
        <SuccessFdBack
          message={
            <button
              onClick={() => {
                setErrStyle(false);
              }}
            >
              Success
            </button>
          }
          isSuccessful={true}
          isVisible={errStyle}
        />
      )}

      <div className={styles.dataValidation}>
        <button onClick={() => handleButtonClick()} className="shadow-xl">
          <span className={styles.modificationListeButtonsMessage}>
            {Props.record.message1}
          </span>
          <Image src={Props.record.icone} alt="icone"></Image>
        </button>
        <button onClick={Props.handleAddAgencyAnnuler} className="shadow-xl">
          <span className={styles.modificationListeButtonsMessage}>
            {Props.record.message2}
          </span>
          <Image src={modificationListeDescard} alt="icone"></Image>
        </button>
      </div>
    </div>
  );
}
export default ModificationListe;

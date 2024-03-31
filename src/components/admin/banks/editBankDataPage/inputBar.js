import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "src/styles/agenciesModificaitonStyles/inputBar.module.css";
import validator from "validator";
function InputBar(Props) {
  const [clicked, setClicked] = useState(false);
  const [style, setStyle] = useState(null);
  const [length, setLength] = useState(0);
  const [err, setErr] = useState(null);
  const [val, setVal] = useState(Props.data);
  let str;
  const verifyData = (data, typeData) => {
    return new Promise((resolve, reject) => {
      if (typeData == "Localisation" && validator.isURL(data)) {
        resolve(data);
        /*                 setStyleErr({dipslay : "inline", color : "red"})
                setErrBar("Ce n'est pas un lien de localisaiton!") */
      } else if (
        typeData == "Numéro de téléphone" &&
        /^[+\d- ]+$/.test(data) &&
        ((data.match(/\d/g).length == 12 && data[0] == "+") ||
          (data.match(/\d/g).length == 10 && data[0] == "0") ||
          (data.match(/\d/g).length == 11 && data[0] == "+") ||
          (data.match(/\d/g).length == 9 && data[0] == "0"))
      ) {
        resolve(data);
        /*                 setStyleErr({dipslay : "inline", color : "red"})
                setErrBar("Assurez-vous de fournir 10 chiffres dans le numéro ou 12 s'il commence par +213") */
      } else if (
        typeData == "Fax" &&
        /^[+\d- ]+$/.test(data) &&
        ((data.match(/\d/g).length == 11 && data[0] == "+") ||
          (data.match(/\d/g).length == 9 && data[0] == "0"))
      ) {
        resolve(data);
        /*                 setStyleErr({dipslay : "inline", color : "red"})
                setErrBar("Assurez-vous de fournir 9 chiffres dans le numéro ou 11 s'il commence par +213") */
      } else if (typeData == "Adresse *" && data.length > 5) {
        resolve(data);
        A;
      } else {
        if (data.length == 0) {
          resolve(null);
        } else {
          /* setStyleErr(null) */
          reject(data);
        }
      }
    });
  };
  const handleInput = (e) => {
    setStyle({ display: "none" });
    setLength(e.target.value.length);
    verifyData(e.target.value, Props.record.title)
      .then((resolve) => {
        setErr({ backgroundColor: "#beffbe" });
        Props.record.handleInputs(resolve, Props.record.title);
      })
      .catch((error) => {
        setErr({ backgroundColor: "#ffbebe" });
      });
    Props.record.handleInputs("INVALID_VALUE", Props.record.title);
  };

  useEffect(() => {
    if (clicked) {
      setStyle({ display: "none" });
    } else if (!length) {
      setStyle(null);
    }
    setErr(null);
  }, [clicked, length]);

  if (Props.record.title === "Adresse *") {
    if (Props.data != "") {
      str = (
        <input
          type={Props.record.type}
          onFocus={() => setClicked(!clicked)}
          onBlur={() => setClicked(!clicked)}
          style={err}
          placeholder={Props.record.placeHolder}
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            return handleInput(e);
          }}
          required
        />
      );
    } else {
      str = (
        <input
          type={Props.record.type}
          onFocus={() => setClicked(!clicked)}
          onBlur={() => setClicked(!clicked)}
          style={err}
          placeholder={Props.record.placeHolder}
          onChange={(e) => {
            setVal(e.target.value);
            return handleInput(e);
          }}
          required
        />
      );
    }
  } else {
    if (Props.data != "") {
      str = (
        <input
          type={Props.record.type}
          onFocus={() => setClicked(!clicked)}
          onBlur={() => setClicked(!clicked)}
          style={err}
          placeholder={Props.record.placeHolder}
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            return handleInput(e);
          }}
        />
      );
    } else {
      str = (
        <input
          type={Props.record.type}
          onFocus={() => setClicked(!clicked)}
          onBlur={() => setClicked(!clicked)}
          style={err}
          placeholder={Props.record.placeHolder}
          onChange={(e) => {
            setVal(e.target.value);
            return handleInput(e);
          }}
        />
      );
    }
  }

  return (
    <div className={styles.inputComponent}>
      <span className={styles.inputMessage}>{Props.record.title}</span>
      <span className={styles.inputBar}>
        <Image src={Props.record.icone} alt="Icone"></Image>
        {/* <span style={style}>{Props.record.placeHolder} </span> */}
        {str}
      </span>
    </div>
  );
}

export default InputBar;

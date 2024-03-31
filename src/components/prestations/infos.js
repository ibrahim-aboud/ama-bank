import Image from "next/image";
import styles from "@/styles/Infos.module.css";
const Infos = ({ website, id }) => {
  const handleClick = (link) => {
    window.open(link, "_blank");
  };

  return (
    <>
      <div className={styles.container}>
        <div
          className={`${styles.sub_container} hover:bg-[#4dac81]`}
          onClick={() => {
            handleClick(`/agences?id=${id}`);
          }}
        >
          <div className={styles.text}>
            Trouvez dès maintenant l’agence qui vous convient
          </div>
          <div className={styles.image}>
            <Image
              src={"/assets/icons/map.svg"}
              height={50}
              width={50}
              alt="image"
            />
          </div>
        </div>

        <div
          className={`${styles.sub_container} hover:bg-[#4dac81]`}
          onClick={() => {
            handleClick(`/comparer?first=${id}`);
          }}
        >
          <div className={styles.text}>Comparer avec une autre banque</div>
        </div>

        <div
          className={`${styles.sub_container} hover:bg-[#4dac81]`}
          onClick={() => {
            handleClick(website);
          }}
        >
          <div className={styles.text}>
            Consulter le site de la banque pour avoir plus de détails
          </div>
          <div className={styles.image}>
            <Image
              src={"/assets/icons/web.svg"}
              height={50}
              width={50}
              alt="image"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Infos;

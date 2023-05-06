import React from "react";
import Image from "next/image"
import crossImg from "public/assets/modificationsPage/crossDelete.svg"
import basketImg from "public/assets/modificationsPage/deleteIcon.svg"
import styles from "src/styles/agenciesModificaitonStyles/deleteConfirmation.module.css"
function deleteConfirmation({handleAnnuler, handleButtonDeleteAgency, agencyId}){
    return(
        <div className={styles.deletePopUpContainer}>
            <div className={styles.deleteHeader}>
                <div className={styles.deleteHeaderLeft}>
                    <Image src={basketImg} alt="Supprimer" className={styles.basketImg}/>
                    <span className={styles.headerDeleteMessage}>Confirmer la suppression</span>
                </div>
                <button className={styles.deleteHeaderRight} onClick ={handleAnnuler} >
                    <Image src={crossImg} className = {styles.crossImg} alt="icone"/>
                </button>
            </div>
            <div className = {styles.divMessage}>
                <span className={styles.spanMessage}>La suppression est définitive, et vous ne pouvez 
                                              en aucun cas récupérer les données supprimées</span>
            </div>
            <div  className={styles.deleteFooter}>
                <div className={styles.divDescard}>
                    <button className={styles.spanDiscard} onClick={handleAnnuler}>Annule</button>
                </div>
                <div className={styles.divDelete}>
                    <button className={styles.spanDelete} onClick={()=>handleButtonDeleteAgency(agencyId)} >Supprimer</button>
                </div>
            </div>
        </div>
    )
}

export default deleteConfirmation
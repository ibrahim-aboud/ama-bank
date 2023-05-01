import ListeCondition from "@/components/prestations/listeCondition";
import axios from "axios";
import { useEffect, useState } from "react";

function List({conditions}){
    
    return(
        <>
            <div className="list">
                <ListeCondition conditions={conditions}/>
            </div>
        </>
    )
}

export default List;
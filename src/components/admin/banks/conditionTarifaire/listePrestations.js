import ScrollBar from "react-perfect-scrollbar";
import LignePrestation from "./lignePrestation";

function ListePrestations({prestations,refresh}){
    let componentList=[];
    if(prestations!==null){
        let listSize=prestations.length;
        for(let i=0;i<listSize-listSize%2;i=i+2){
            componentList.push(<li key={prestations[i].id}><LignePrestation prestation1={prestations[i]} prestation2={prestations[i+1]} first={(i/2)%2==0 ? true : false} single={false} refresh={refresh}/></li>)
        }
        if(listSize%2!==0){
            componentList.push(<li key={prestations[listSize-1]}> <LignePrestation prestation1={prestations[listSize-1]} prestation2={null} first={((listSize/2)+1)%2===0 ? true : false} single={true} refresh={refresh}/></li>);
        }
    }
    
    
    return (
        <ScrollBar>
            <div className="flex px-[20%] flex-col items-center h-screen mt-14">
                <ul>
                    {componentList}
                </ul>
            </div>
        </ScrollBar>
        
        
    )
}
export default ListePrestations;
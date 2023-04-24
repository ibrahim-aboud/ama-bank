import LignePrestation from "./lignePrestation";

function ListePrestations({prestations}){
    let componentList=[];
    if(prestations!==null){
        let listSize=prestations.length;
        for(let i=0;i<listSize-listSize%2;i=i+2){
            componentList.push(<LignePrestation prestation1={prestations[i]} prestation2={prestations[i+1]} first={(i/2)%2==0 ? true : false} single={false}/>)
        }
        if(listSize%2!==0){
            componentList.push( <LignePrestation prestation1={prestations[listSize-1]} prestation2={null} first={((listSize/2)+1)%2===0 ? false : true} single={true} />);
        }
    }
    
    
    return (
        <div>
            {componentList}
        </div>
        
    )
}
export default ListePrestations;
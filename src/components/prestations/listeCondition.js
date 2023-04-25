import LigneCondition from "../common/ligneCondition";


function ListeCondition({conditions}){
    let componentList=[];
    let listSize=conditions.length;
    for(let i=0;i<listSize-listSize%2;i=i+2){
        componentList.push(<LigneCondition key={i} condition1={conditions[i]} condition2={conditions[i+1]} first={(i/2)%2==0 ? true : false} single={false}/>)
    }
    if(listSize%2!==0){
        componentList.push( <LigneCondition condition1={conditions[listSize-1]} condition2={null} first={((listSize/2)+1)%2===0 ? false : true} single={true} />);
    }
    return (
        <div>
            {componentList}
        </div>
        
    )
}
export default ListeCondition;
import LignePrestation from "./lignePrestation";

function ListePrestations({prestations,deletePrestation,editPrestation}){

    // renders a list of compoenent, each one being a line (two services per line)
    let componentList=[];
    if(prestations!==null){
        let listSize=prestations.length;
        for(let i=0;i<listSize-listSize%2;i=i+2){
        
                componentList.push(<li key={prestations[i].id}><LignePrestation prestation1={prestations[i]} prestation2={prestations[i+1]} first={(i/2)%2==0 ? true : false} single={false} deletePrestation={deletePrestation}  editPrestation={editPrestation}/></li>)

            
        }
        if(listSize%2!==0){
            componentList.push(<li key={prestations[listSize-1].id}> <LignePrestation prestation1={prestations[listSize-1]} prestation2={null} first={((listSize/2)+1)%2===0 ? true : false} single={true} deletePrestation={deletePrestation} editPrestation={editPrestation}/></li>);
        } 
    }
    
    
    return (
            <div className="flex px-[20%] flex-col items-center h-screen mt-14">
                <ul>
                    {componentList}
                </ul>
            </div>
        
        
    )
}
export default ListePrestations;
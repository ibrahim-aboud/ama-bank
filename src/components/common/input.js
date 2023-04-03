import { use, useState } from 'react';
import style from './../../styles/input.module.css';
import { RiPencilFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx"

function Input({info,setInfo,generatePopUp,isPassword,Icon}){
    const [showPopUp,setShowPopUp]=useState(false);
    const fixedPassword=info;

    function submitHandler(){
        e.preventDefault();
    }
    //if the component happens to contain a password
    const [initialPassword,setInitialPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [errorInitial,setErrorInitial]=useState(false);
    const [errorConfirm,setErrorConfirm]=useState(false);
    const [errorSame,setErrorSame]=useState(false);

    let inputType;
    if(isPassword){
        inputType="password";
    }
    else{
        inputType="text";
    }

    return(
        <div className={style.Input}>
            {
                showPopUp 
                && 
                <div className={style.popUp}>
                    <div className={style.overlay} 
                        onClick={ 
                            function(){
                                setShowPopUp(false);
                            }
                        }
                    >
                    </div>
                    <div className={style.square} >
                    <button className={style.xit} onClick={()=>{setShowPopUp(false)}}><RxCross2/></button>
                        <div className={style.passwordBoxes}>
                            
                            <h1>Mettre à jour votre mot de passe</h1>
                            <h2>Entrez votre mot de passe actuel et un nouveau mot de passe</h2>
                            
                            <div className={style.center}>
                                <div><p>Mot de passe actuel</p> {errorInitial && <p className={style.error}> - Mot de passe incorrect - </p>}</div>
                                <div><input type='password' value={initialPassword} className={style.box} onChange={(e)=>setInitialPassword(e.target.value)}/></div>
                            </div>
                            
                            <div className={style.center}>
                                <div><p>Nouveau mot de passe</p> {errorSame && <p className={style.error}> - Même mot de passe choisit - </p>}</div>
                                <div><input type='password' value={newPassword} className={style.box} onChange={(e)=>setNewPassword(e.target.value)}/></div>
                            </div>
                            
                            <div className={style.center}>
                                <div><p>Confirmer le nouveau mot de passe</p> {errorConfirm && <p className={style.error}> - Les mots de passe sont incohérents - </p>}</div>
                                <div><input type='password' value={confirmPassword} className={style.box} onChange={(e)=>setConfirmPassword(e.target.value)}/></div>
                            </div>
                            <div className={style.annulerConfirmer}>
                            <button onClick={()=>{setShowPopUp(false)}}>annuler</button>
                            <button 
                                onClick={
                                    ()=>{
                                        if(initialPassword!==info){
                                            setErrorInitial(true);
                                        }
                                        else{
                                            setErrorInitial(false);
                                        }
                                        if(newPassword!==confirmPassword){
                                            setErrorConfirm(true);
                                        }
                                        else{
                                            setErrorConfirm(false);
                                        }
                                        if(newPassword===initialPassword){
                                            setErrorSame(true);
                                        }
                                        else{
                                            setErrorSame(false);
                                        }
                                        if(initialPassword===info && newPassword!==initialPassword && newPassword===confirmPassword){
                                            setInfo(newPassword);
                                            setShowPopUp(false);
                                        }
                                        event.preventDefault();
                                    }
                                }
                            >
                                Confirmer
                            </button>
                        </div>
                        </div>
                        
                        
                        
                    </div>
                    
                </div>
            }
            <div className={style.inputCollection}>
                <div className={style.leftIcon}>{Icon}</div>
                {
                    isPassword 
                    && 
                    <input
                        type={inputType}
                        required
                        disabled
                        className={style.box}
                        value={info}
                        onChange={(e)=>setInfo(e.target.value)}
                    />

                    ||

                    !isPassword
                    &&
                    <input
                        type={inputType}
                        required
                        className={style.box}
                        value={info}
                        onChange={(e)=>setInfo(e.target.value)}
                    />
                }
                {
                    isPassword 
                    &&
                    <div 
                    className={style.rightIcon} 
                    onClick={function(){
                        if(generatePopUp){
                            setShowPopUp(true);
                            setErrorConfirm(false);
                            setErrorInitial(false);
                            setErrorSame(false);
                            setInitialPassword("");
                            setConfirmPassword("");
                            setNewPassword("");
                        }
                        else{
                            
                        }
                    }}
                    >
                        <RiPencilFill/>
                    </div>
                }
                
                
            </div>
            
        </div>
    )
}
export default Input;
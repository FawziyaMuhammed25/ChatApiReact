import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../contaxt/contaxt";
const Sidebar =()=>{

    const [extanded , setExtended] = useState(false)
    const { onSend , prevPrompts , setresentPrompt , newChat} = useContext(Context)
    const loadPrompt = async(prompt) =>{
        setresentPrompt(prompt)
       await onSend(prompt)
    }
    return(
        <div className="sidebar"> 
                     <div className="top">
                        <img onClick={()=> setExtended(prev => !prev)} className="menu" src={assets.menu_icon} alt="" />
                        <div onClick={() => newChat()} className="new_chat">
                            <img src={assets.plus_icon} alt="" />
                           {extanded ? <p>New Chat </p> : null } 
                        </div>
                        {
                            extanded ? 
                            <div className="recent">
                            <p className="recent_title">
                                Recent
                            </p>
                            {prevPrompts.map((item , index) =>{
                                return(
                                    <div onClick={() => loadPrompt(item)} className="recent_entry">
                                        <img src={assets.message_icon} alt="" />
                                        <p>{item.slice(0 , 18)}...</p>
                                     </div>
                                )

                            })
                        }
                          
                        </div> :
                        null
                        }
                        
                     </div>
                     <div className="bottom">
                          <div className="bottom_item recent_entry">
                            <img src={assets.question_icon} alt="" />
                           {extanded ? <p>Help</p> : null}
                          </div>
                          <div className="bottom_item recent_entry">
                            <img src={assets.history_icon} alt="" />
                           {extanded ? <p>Activity</p> : null}
                          </div>
                          <div className="bottom_item recent_entry">
                            <img src={assets.settings_icon} alt="" />
                           {extanded ? <p>Settings</p> : null}
                          </div>
                     </div>
        </div>
    )
}
export default Sidebar
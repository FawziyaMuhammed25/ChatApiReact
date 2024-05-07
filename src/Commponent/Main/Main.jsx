import React, { useContext } from "react";
import './Main.css'
import { assets } from "../../assets/assets";
import { Context } from "../../contaxt/contaxt";

const Main =() =>{
     
  
    const { onSend , resentPrompt ,showResult , loading , resultData, setInput , input , setresentPrompt}  = useContext(Context);
    const loadPrompt = async(prompt) =>{
        setresentPrompt(prompt)
       await onSend(prompt)
    }
  
    return ( 
        <div className="main">
           <div className="nav">
              <p>Gemini</p>
              <img src={assets.user_icon} alt="" />
           </div>
           <div className="main-container">
            {!showResult
                ? <>
                <div className="greet">
                    <p>
                        <span> Hello, Dev.</span>
                    </p>
                    <p>How can I help you today?</p>
                </div>
                <div className="cards">
              
                    <div className="card">
                     
                        <p onClick={() => loadPrompt()}> 
                           
                            Suggest beautiful places to see on an upcoming road trip
                         </p>                
                        <img src={assets.compass_icon} alt="" />
                    </div>
                    <div className="card">
                        <p onClick={() => loadPrompt()}>Briefly summarize this concept: urban planning</p>
                        <img src={assets.bulbe_icon} alt="" />
                    </div>
                    <div className="card">
                        <p onClick={() => loadPrompt()}>Brainstorm team bonding activities for our work retreat</p>
                        <img src={assets.message_icon} alt="" />
                    </div>
                    <div className="card">
                        <p onClick={() => loadPrompt()}>Tell me about React js and React native</p>
                        <img src={assets.code_icon} alt="" />
                    </div>
                </div>
                </>
                :<div className="result">
                         <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{resentPrompt}</p>
                         </div>
                         <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading    // loading not accure yet 
                            ?<div className="loader"> 
                                <hr />
                                <hr />
                                <hr />    
                            </div>
                            :     // loading is accure 
                            <p dangerouslySetInnerHTML={{__html : resultData}}></p>   
                            // {/* to show result in html documrnt */}
                            }
                           
                         </div>
                </div>
            }
                

                <div className="main-bottom">
                    <div className="search-box">
                        <input type="text" onChange={(e) => setInput(e.target.value)} value={input} placeholder="Enter a prompt here " />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                           {input ? <img src={assets.send_icon}  onClick={() => onSend()} alt="" /> : null}
                        </div>
                    </div>
                    <p className="bottom-info">
                         Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                    </p>
                </div>
           </div>
        </div>
    )
}
export default Main
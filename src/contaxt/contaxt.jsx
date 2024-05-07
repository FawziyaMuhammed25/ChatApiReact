import { createContext, useState } from "react";
import runChat from "../convect/gemini";

export const Context = createContext();

const ContextProvider =(props) =>{

    const [input , setInput] = useState("");
    const [resentPrompt , setresentPrompt] = useState("");
    const [prevPrompts , setprevPrompts] = useState([]);  // to show in menu 
    const[showResult , setShowResult] = useState(false)
    const [loading , setloading] = useState(false) // loading animation 
     const[resultData , setresultData] =useState("")  // we will show result in new page 

     const delayPara =(index , nextWord) =>{  // to delete * in paragraph
          setTimeout(function(){
              setresultData(prev => prev+nextWord)
          }, 75*index)
     }
     const newChat = ()=>{
        setloading(false)
        setShowResult(false)

     }

    const onSend = async (prompt) =>{
        setresultData("")
        setloading(true)
        setShowResult(true)
        let response ;
        if (prompt !== undefined) {
            response =   await  runChat(prompt)
            setresentPrompt(prompt)
        }else{
            setprevPrompts(prev =>[...prev , input])
           
            setresentPrompt(input)
            response = await runChat(input)
        }
    
    let responseArray = response.split("**");
    let newArray = "" ;
    for (let i = 0; i < responseArray.length; i++) {
        if (i ===0 || i%2 !==1) {
            newArray += responseArray[i]
        }
        else{
            newArray += "<b>"+responseArray[i]+"</b>"
        }
    }
    let newArray2 = newArray.split("*").join("</br>")
    // setresultData(newArray)
    let newResponseArray = newArray2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i , nextWord+" ")
        
    }
    setloading(false)
    setInput("")

    }
    // onSend("what is react ?")
    const contextValue ={
         prevPrompts,
         setprevPrompts,
         onSend,
         setresentPrompt,
         resentPrompt,
         showResult,
         loading,
         resultData,
         input,
         setInput,
         newChat,
        
        
    }
    return(
        <Context.Provider value={contextValue}>
            {props.children}

        </Context.Provider>
    )
}
export default ContextProvider


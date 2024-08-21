import { createContext, useState } from "react";
import run from "../config/ptg";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState(null);
    const delayPara =(index,nextWord) =>{
        setTimeout(function (){
            setResultData(prev=>prev+nextWord);
        }, 5*index)
    }

    // new chat click and new chat and remove and back
    // result scree hide and display  the bar section are  remove and display
    const newChat =()=>{
        setLoading(false)
        setShowResult(false)
    }

    // const onSent = async (prompt) => {
    //     setLoading(true); // Using the setLoading to indicate a loading state

    //     const response = await run(input);
    //     setResultData(response); // Save the result data
    //     setShowResult(true); // Show the result
    //     setRecentPrompt(input);
    //     setLoading(false); // Stop loading
    // };


    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response
        if ( prompt !== undefined){
            response =await run (prompt)
            setPrevPrompts(prompt)
        }
        else{
            setPrevPrompts(prev =>[...prev,input])
            setRecentPrompt(input)
            response=await run(input)
        }
 
        
        
        let responseArray = response.split("**")
        //  HIGHLIGHT  ALL MAIN PART
        let newResponse ="";
        for (let i=0; i<responseArray.length;i++)
        {
            if ( i===0 || i%2 !==1){
                newResponse +=responseArray[i];
            }
            else{
                newResponse += "<b>"+responseArray[i]+"</b>";
            }
        }

            // stare * ko chng kr ka break kr rha ha br tag sa
            // line by line  qusesion and response answer
        let newResponse2 =newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split("");
        for (let i=0;i<newResponseArray.length;i++)
        {
            const nextWord =newResponseArray[i];
            delayPara(i,nextWord+"")
        }
        // setResultData(newResponse2)
        setLoading(false)
        setInput("")
    }


    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        setRecentPrompt,
        recentPrompt,
        onSent,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;

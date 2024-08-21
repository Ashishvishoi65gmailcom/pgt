import React, { useContext, useState } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/Context'
const Sidebar = () => {

  const[ extended , setExtended] = useState(false)
  //chng
 const{ onSent,prevPrompts,setRecentPrompt, newChat} =useContext(Context)

 const loadPrompt = async(prompt)=> {
  setRecentPrompt(prompt)
  await onSent(prompt)
 };

  return (
    <div className='sidebar'>


        <div className='top'>
                    <img onClick={()=>setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt=''></img>
         {/* array funtion aplly new chate dipalay */}
         <div onClick={()=> newChat()} className='new-chat'>
                     <img  className='menu' src={assets.plus_icon} alt=''></img>
         {extended?<p> New chat</p> :null}
        </div>

        {/* //chng */}
        {extended
        ?
        <div className='recent'>
            <p className='recent-title'>Recent</p>
            {
              prevPrompts.map((item,index)=>{
                return(
                   
                 <div onClick={()=>loadPrompt(item)} className='recent-entry'>
                 <img  className='menu' src={assets.message_icon} alt=''></img>
                 <p>{item} ... </p>
             </div>
                )
              })
            }
                 
                
                                   
           </div>
           :null}
        </div>
        <div className='bottom'>
            <div className='bottom-item recent-entry'>
        <img  className='menu' src={assets.question_icon} alt=''></img>
        
        {extended?<p> Help</p> :null}
        </div>
        <div className='bottom-item recent-entry'>
        <img  className='menu' src={assets.history_icon} alt=''></img>
        {extended?<p> Activity</p> :null}
        </div>
        <div className='bottom-item recent-entry'>
        <img  className='menu' src={assets.setting_icon} alt=''></img>
        {extended?<p> Setting</p> :null}
        </div>
        
        </div>
        </div>

  )
}

export default Sidebar
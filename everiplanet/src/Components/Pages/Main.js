import React from "react"
import messages from '../../common/messages';

const MainPage = () => {
  return (
    <div>
        {messages.welcome}
        <div>
             This is Main<br></br>
             <a href="http://localhost:3000/factory">Factory</a><br></br>
             <a href="http://localhost:3000/Barrack">Barrack</a><br></br>
             <a href="http://localhost:3000/DnaFactory">DnaFactory</a><br></br>
             <a href="http://localhost:3000/Mine">Mine</a><br></br>
             <a href="http://localhost:3000/Testpage">Testpage</a><br></br>
         </div>
   </div>
  )
 
};

export default MainPage;
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Factory from './Pages/Factory';
import Mine from './Pages/Mine';
import Barrack from './Pages/Barrack';
import Main from './Pages/Main';
import Testpage from './Pages/Testpage';
import DnaFactory from './Pages/dnaFactory/DnaFactory';

function Routing() {
  //페이징: 메인, 광산, 공장, 병영, 유전자 공장, 테스트 페이지
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/mine' element={<Mine />}></Route>
        <Route path='/barrack' element={<Barrack />}></Route>
        <Route path='/dnafactory' element={<DnaFactory />}></Route>
        <Route path='/factory' element={<Factory />}></Route>
        <Route path='/testpage' element={<Testpage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;

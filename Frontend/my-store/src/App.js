import React from 'react';
import './App.css';
import MyContainer from './MyContainer';
import MyFooter from './MyFooter';
import MyHeader from './MyHeader';
import MyNavbar from './MyNavbar';  
      

function App() {
  return (
    <div className="App">
    <MyHeader></MyHeader>
    <MyNavbar></MyNavbar>
    <MyContainer></MyContainer>
    <MyFooter></MyFooter>
    </div>
  );
}

export default App;

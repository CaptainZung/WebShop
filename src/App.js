import logo from './logo.svg';
import './App.css';
import Head from './component/Layout/Head';
import Footer from './component/Layout/Footer';
import MenuLeft from './component/Layout/MenuLeft';
import { useLocation } from 'react-router-dom';
import MenuLeftAccount from './component/member/MenuLeftAccount';
import { useEffect, useState } from 'react';
import UserContext from './component/UserContext';
import API from './Config/api';
function App(props) {
  let params1 = useLocation();

   const [data,setData] = useState(0) //10
   const [qtyWL, setQtyWL] = useState(0)

  function getTongQty(getQty){
    console.log(getQty)
    setData(getQty)
  }
  function getQtyWL(qtyWL){
    setQtyWL(qtyWL)
  }
  

  return (
  <>
  <UserContext.Provider value={{data, getTongQty, qtyWL, getQtyWL}}>
    <Head/>
      <section>
          <div className='container'>
            <div className='row'>
                {(params1['pathname'].includes("account") || params1['pathname'].includes("my-product")) ? <MenuLeftAccount/> : <MenuLeft/> }
                {props.children}
            </div>

          </div>
      </section>
    <Footer/>
    </UserContext.Provider>
  </>
  );
}

export default App;

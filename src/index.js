import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Blog from './component/Blog/index';
import BlogDetail from './component/Blog/BlogDetail';
import LoginAndRegister from './component/member';
import Home from './component/Home';
import Account from './component/member/Account';
import AddProduct from './component/Add_product';
import MyProduct from './component/My_product';
import EditProduct from './component/Edit_product';
import ProductDetail from './component/Product_detail';
import Cart from './component/Cart';
import Wishlist from './component/WishList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/blog/list' element={<Blog/>}/>
          <Route path='/blog/detail/:id' element={<BlogDetail/>}/>
          <Route path='/login-register' element={<LoginAndRegister/>}/>
          <Route path='/account/update' element={<Account/>}/>
          <Route path='/add-product' element={<AddProduct/>}/>
          <Route path='/my-product' element={<MyProduct/>}/>
          <Route path='/user/product/:id' element={<EditProduct/>}/>
          <Route path='/product/detail/:id' element={<ProductDetail/>}/>
          <Route path='/product/cart' element={<Cart/>}/>
          <Route path='/product/wishlist' element={<Wishlist/>}/>
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory.jsx';
import Product from './Pages/Product.jsx';
import SignUp from './Pages/SignUp.jsx';
import Login from './Pages/Login.jsx';
import Cart from './Pages/Cart.jsx';
import Shop from './Pages/Shop.jsx';
import Footer from './Componants/Footer/Footer.jsx';
import men_banner from './Componants/Assets/banner_mens.png';
import women_banner from './Componants/Assets/banner_women.png';
import kids_banner from './Componants/Assets/banner_kids.png';
import ThankYou from './Pages/ThankYou.jsx';
import Profile from './Pages/Profile.jsx';
import ChangePassword from './Pages/ChangePassword.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Shop/>}/>
          <Route path = '/men' element = {<ShopCategory banner={men_banner} category="men"/>}/>
          <Route path = '/women' element = {<ShopCategory banner={women_banner} category="women"/>}/>
          <Route path = '/kids' element = {<ShopCategory banner={kids_banner} category="kid"/>}/>
          <Route path='/product' element = {<Product/>}>
            <Route path = ':productId' element = {<Product/>}/>
          </Route>
          <Route path = '/cart' element = {<Cart/>}/>
          <Route path = '/SignUp' element = {<SignUp/>}/>
          <Route path = '/Login' element = {<Login/>}/>
          <Route path = '/thank_you' element = {<ThankYou/>}/>
          <Route path = '/profile' element = {<Profile/>}/>
          <Route path = '/change_password' element = {<ChangePassword/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;

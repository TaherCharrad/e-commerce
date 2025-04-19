import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
    const [menu,setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);
    return(
        <div className="navbar">
            <div className="nav-logo">
                <img src = {logo} alt = ""/>
                <p>SHOPPER</p>
            </div>

            <ul className="nav-menu">
                <li onMouseEnter={() => {setMenu("shop")}} onMouseLeave={() => {setMenu("")}}><Link to='/' style={{textDecoration: 'none'}}>Shop</Link>{menu === "shop" ? <hr/> : <></>}</li>
                <li onMouseEnter={() => {setMenu("men")}} onMouseLeave={() => {setMenu("")}}><Link to='/men' style={{textDecoration: 'none'}}>Men</Link>{menu === "men" ? <hr/> : <></>}</li>
                <li onMouseEnter={() => {setMenu("women")}} onMouseLeave={() => {setMenu("")}}><Link to='/women' style={{textDecoration: 'none'}}>Women</Link>{menu === "women" ? <hr/> : <></>}</li>
                <li onMouseEnter={() => {setMenu("kids")}} onMouseLeave={() => {setMenu("")}}><Link to='/kids' style={{textDecoration: 'none'}}>Kids</Link>{menu === "kids" ? <hr/> : <></>}</li>
            </ul>

            <div className="nav-login-cart">
                <Link to='/Login'><button>Login</button></Link>
                <Link to='/cart'><img src = {cart_icon} alt = ""/></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    );
}
export default Navbar;
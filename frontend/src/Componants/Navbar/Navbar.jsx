import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import profile_icon from "../Assets/profile_icon.jpg";
import { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { ShopContext } from '../../Context/ShopContext';
import { UserContext } from '../../Context/UserContext';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const { user } = useContext(UserContext);

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>SHOPPER</p>
      </div>

      <ul className="nav-menu">
        <li onMouseEnter={() => setMenu("shop")} onMouseLeave={() => setMenu("")}>
          <Link to='/'>Shop</Link>{menu === "shop" && <hr />}
        </li>
        <li onMouseEnter={() => setMenu("men")} onMouseLeave={() => setMenu("")}>
          <Link to='/men'>Men</Link>{menu === "men" && <hr />}
        </li>
        <li onMouseEnter={() => setMenu("women")} onMouseLeave={() => setMenu("")}>
          <Link to='/women'>Women</Link>{menu === "women" && <hr />}
        </li>
        <li onMouseEnter={() => setMenu("kids")} onMouseLeave={() => setMenu("")}>
          <Link to='/kids'>Kids</Link>{menu === "kids" && <hr />}
        </li>
      </ul>

      <div className="nav-login-cart">
        <Link to='/Login'><button>Login</button></Link>
        <Link to='/cart'><img src={cart_icon} alt="cart" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>

        <Link to={user ? "/profile" : "/login"}>
          <img src={profile_icon} alt="profile" className="nav-profile-icon" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

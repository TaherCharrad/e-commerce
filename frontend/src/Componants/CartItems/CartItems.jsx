import { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import { Link } from "react-router-dom";

const CartItems = () => {
    const { cartItems, removeFromCart, getTotalCartAmount, clearCart } = useContext(ShopContext);
    
    const handleCheckout = () => {
        clearCart();
        window.scrollTo(0, 0);
    };
    
    return(
        <div className="cart-items">
            <div className="format-main">
                <p>PRODUCTS</p>
                <p>TITLE</p>
                <p>PRICE</p>
                <p>QUANTITY</p>
                <p>TOTAL</p>
                <p>REMOVE</p>
            </div>
            <hr/>
            {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`}>
                    <div className="cart-items-format format-main">
                        <img className="product_icon" src={item.image} alt={item.name}/>
                        <p>{item.name} ({item.size})</p>
                        <p>${item.new_price}</p>
                        <button className="quantity">
                            {item.quantity}
                        </button>
                        <p>${item.new_price * item.quantity}</p>
                        <div className="remove-container">
                            <img 
                                className="remove_icon" 
                                src={remove_icon} 
                                onClick={() => removeFromCart(item.id, item.size)} 
                                alt="Remove"
                            />
                        </div>
                    </div>
                    <hr/>
                </div>
            ))}
            <div className="cart-items-down">
                <div className="cart-items-total">
                    <h1>TOTAL : </h1>
                    <div>
                        <div className="total-item">
                            <p>SUBTOTAL : </p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr/>
                        <div className="total-item">
                            <p>SHIPPING FEE : </p>
                            <p>FREE</p>
                        </div>
                        <hr/>
                        <div className="total-item">
                            <h3>TOTAL : </h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <Link to="/"><button onClick={handleCheckout}>CHECKOUT</button></Link>
                </div>
                <div className="promocode">
                    <p>ENTER PROMO CODE HERE : </p>
                    <div className="promobox">
                        <input placeholder="promocode"/>
                        <button>SUBMIT</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CartItems;
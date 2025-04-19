import "./Offer.css";
import exclusive_image from "../Assets/exclusive_image.png";
const Offer = () => {
    return(
        <div className="offers">
            <div className="offers-left">
                <h1>EXCLUSIVE</h1>
                <h1>OFFERS FOR YOU !</h1>
                <p>ONLY ON BEST SELLERS</p>
                <button>CHECK NOW</button>
            </div>
            <div className="offers-right">
                <img src={exclusive_image} alt=""/>
            </div>
        </div>
    );
}
export default Offer;
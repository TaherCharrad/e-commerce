import "./Footer.css";
import footer_logo from "../Assets/logo_big.png";
import instagram_icon from "../Assets/instagram_icon.png";
import pintres_icon from "../Assets/pintester_icon.png";
import whatspp_icon from "../Assets/whatsapp_icon.png";

const Footer = () => {
    return(
        <footer>

            <div className="footer-logo">
                <img src = {footer_logo} alt = "" />
                <p>SHOPPER</p>
            </div>

            <ul className="footer-links">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>

            <div className="footer-social-icons">
                <div className="footer-icons-container">
                    <img src = {instagram_icon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src = {pintres_icon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src = {whatspp_icon} alt="" />
                </div>
            </div>

            <div className="footer-copyright">
                <hr/>
                <p>Copyright @2025 - All Rights Reserved</p>
            </div>

        </footer>
    );
}

export default Footer;
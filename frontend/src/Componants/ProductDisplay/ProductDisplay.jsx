import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from '../Assets/star_dull_icon.png';
import { useContext, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { UserContext } from '../../Context/UserContext';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const { user } = useContext(UserContext);
    const [selectedSize, setSelectedSize] = useState(null);

    const handleSizeSelect = (size) => {
        setSelectedSize(size === selectedSize ? null : size);
    };

    const handleAddToCart = () => {
        if (selectedSize && user) {
            addToCart({ ...product, size: selectedSize });
        }
    };

    return (
        <div className='productdisplay'>
            <div className="product-display-left">
                <div className="image-list">
                    <img src={product.image} alt='' />
                    <img src={product.image} alt='' />
                    <img src={product.image} alt='' />
                    <img src={product.image} alt='' />
                </div>
                <div className="product-display-image">
                    <img className='main-img' src={product.image} alt='' />
                </div>
            </div>

            <div className="product-display-right">
                <h1>{product.name}</h1>
                <div className="right-star">
                    <img src={star_icon} alt='' />
                    <img src={star_icon} alt='' />
                    <img src={star_icon} alt='' />
                    <img src={star_icon} alt='' />
                    <img src={star_dull_icon} alt='' />
                    <p>(123)</p>
                </div>
                <div className="right-prices">
                    <div className="old-price">${product.old_price}</div>
                    <div className="new-price">${product.new_price}</div>
                </div>
                <div className="right-description">{product.name}</div>
                <div className="right-size">
                    <h1>Select Size</h1>
                    <div className="right-size-sizes">
                        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                            <div
                                key={size}
                                className={`size-box ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeSelect(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    className={`add-to-cart-btn ${selectedSize && user ? 'active' : ''}`}
                    onClick={handleAddToCart}
                    disabled={!selectedSize || !user}
                >
                    {user ? 'ADD TO CART' : 'LOGIN TO ADD TO CART'}
                </button>
                <p className='right-category'><span> CATEGORY :</span> MEN, T-SHIRT</p>
                <p className='right-category'><span> TAGS :</span> MODERN, LATEST</p>
            </div>
        </div>
    );
};

export default ProductDisplay;

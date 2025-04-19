import { useContext } from "react";
import {ShopContext} from "../Context/ShopContext.jsx";
import {useParams} from "react-router-dom";
import Breadcrums from "../Componants/Breadcrums/Breadcrums.jsx";
import ProductDisplay from "../Componants/ProductDisplay/ProductDisplay.jsx";
import DescritionBox from "../Componants/DescriptionBox/DescriptionBox.jsx";
import Navbar from "../Componants/Navbar/Navbar.jsx";

const Product = () => {
    const {all_product} = useContext(ShopContext);
    const {productId} = useParams();
    const product = all_product.find((e) => e.id === Number(productId));
    
    return(
        <div>
            <Navbar/>
            <Breadcrums product={product}/>
            <ProductDisplay product={product}/>
            <DescritionBox/>
        </div>
    );
}
export default Product;
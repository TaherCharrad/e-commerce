import Hero from "../Componants/Hero/Hero.jsx";
import NewCollections from "../Componants/NewCollections/NewCollection.jsx";
import Offer from "../Componants/Offers/Offer.jsx";
import Popular from "../Componants/Popular/Popular.jsx";
import NewsLetter from "../Componants/NewsLetter/NewsLetter.jsx";
import Navbar from "../Componants/Navbar/Navbar.jsx"

const Shop = () => {
    return(
        <>
            <Navbar/>
            <Hero/>
            <Popular/>
            <Offer/>
            <NewCollections/>
            <NewsLetter/>
        </>
    );
}
export default Shop;
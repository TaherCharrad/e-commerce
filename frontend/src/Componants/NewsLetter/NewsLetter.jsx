import "./NewsLetter.css";

const NewsLetter = () => {
    return(
        <div className="news-letter">
            <h1>GET EXCLUSIVE OFFERS</h1>
            <p>SUBSCRIBE TO OUR NEWSLETTER</p>
            <div>
                <input type="email" placeholder="your email"/>
                <button>SUBSCRIBE</button>
            </div>
        </div>
    );
}
export default NewsLetter;
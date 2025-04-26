import { createContext, useState } from "react";
import all_product from "../Componants/Assets/all_product.js";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existingItemIndex = prev.findIndex(
                (item) => item.id === product.id && item.size === product.size
            );
            
            if (existingItemIndex !== -1){
                const updatedItems = [...prev];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + 1
                };
                return updatedItems;
            }
            
            return [...prev, { ...product, quantity: 1 }];
        });
    }

    const removeFromCart = (productId, size) => {
        setCartItems((prev) => {
            const existingItemIndex = prev.findIndex(
                (item) => item.id === productId && item.size === size
            );

            if (existingItemIndex !== -1) {
                const item = prev[existingItemIndex];
                if (item.quantity > 1) {
                    const updatedItems = [...prev];
                    updatedItems[existingItemIndex] = {
                        ...item,
                        quantity: item.quantity - 1
                    };
                    return updatedItems;
                } else {
                    return prev.filter((_, index) => index !== existingItemIndex);
                }
            }
            return prev;
        });
    }

    const clearCart = () => {
        setCartItems([]);
    }

    const getTotalCartAmount = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.new_price * item.quantity);
        }, 0);
    }

    const getTotalCartItems = () => {
        return cartItems.reduce((total, item) => {
            return total + item.quantity;
        }, 0);
    }

    const contextValue = {
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems,
        clearCart
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
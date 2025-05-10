import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = (import.meta.env.VITE_API_URL);
    const [token, setToken] = useState("");
    const [food_list, setFood_list] = useState([]);


    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        if (token) {
            await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }

        return totalAmount;
    }

    const fetchFood_list = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        setFood_list(response.data.food);
    }

    const loadCartData = async (token) => {
        try {
            const response = await axios.get(`${url}/api/cart/get`, {
                headers: { token }
            });
            //console.log(response.data.data);
            
            setCartItems(response.data.data || {}); // Default to empty object if undefined
        } catch (error) {
            console.error("Error loading cart data:", error);
            setCartItems({}); // Set empty object on error to prevent crashes
        }
    }
    //To prevent form loggin out on page refresh
    useEffect(() => {
        async function loadData() {
            await fetchFood_list();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, [])
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token, setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
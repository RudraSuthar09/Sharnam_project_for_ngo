import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/frontend_assets/assets";
export const StoreContext = createContext(null);
import axios from "axios";

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState(localStorage.getItem("token") || ""); // Load token on app start
  const[food_list, setFoodList]= useState([]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token); // Save token when updated
    }
  }, [token]); // Runs whenever `token` changes

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product.id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList= async()=>{
    const response= await axios.get(url+"/api/food/list");
    setFoodList(response.data.data);
    
  }

  useEffect(()=>{
  
    async function loadData(){
      await fetchFoodList()
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
      }

    }
    loadData();
  },[])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token, 
    setToken, 
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

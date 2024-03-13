import React, { createContext, useContext, useEffect, useState } from 'react'

// cart context that provides a value 
const CartContext = createContext(null)
// default cart initial state
const CART_KEY ='cart';
const EMPTY_CART = {
    items:[],
    totalPrice:0,
    totalCount:0,
};


// cart provider provides the value of a context for its children
export default function CartProvider({children}) {
    const initCart = getCartFromLocalStorage ();

//set cart items states
    const [cartItems, setCartItems] = useState(initCart.items);
    const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
    const [totalCount, setTotalCount] = useState(initCart.totalCount);


// to change the price and count of total cart items when updated
    useEffect( () => {
        const totalPrice = sum(cartItems.map(item => item.price));
        const totalCount = sum(cartItems.map(item => item.quantity));
        setTotalPrice(totalPrice);
        setTotalCount(totalCount);


        // setting the cart to the local storage
        if (cartItems && cartItems.length > 0) {
    localStorage.setItem(
        CART_KEY, 
        JSON.stringify({
        items: cartItems,
        totalPrice,
        totalCount,
    })
    );

    }}, [cartItems, totalPrice, totalCount]);

// checks whether ther is anything in the cart initial state from local storage and returns that, else returns an empty cart
    function getCartFromLocalStorage() {
        const storedCart = localStorage.getItem(CART_KEY);
        return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
    }
    const sum = items => {
        return items.reduce((prevValue, curValue) => prevValue + curValue, 0);
    }

// remove an item from the cart by filtering it out
    const removeFromCart = foodId => {
        const filteredCartItems = cartItems.filter(item => item.food.id !== foodId);
        setCartItems( filteredCartItems);
    }


    // to change the quantity of food items on the cart when updated
    const changeQuantity = (cartItem, newQuantity) => {
        const { food} = cartItem;

        const changedCartItem = {
            ...cartItem, quantity: newQuantity, price: food.price * newQuantity, 
        };


        // replace old cart item with the new cart item
        setCartItems(
            cartItems.map(item => (item.food.id === food.id ? changedCartItem : item))
        );
        };


// Adds items to cart, if the food already exists, the quantity is increased on the existing
const addToCart = food => {
    const cartItem = cartItems.find(item => item.food.id === food.id);
    if (cartItem) {
        changeQuantity(cartItem,cartItem.quantity +1); 
    }else {
        setCartItems([ ...cartItems, {food, quantity: 1, price: food.price }]);
    }
}




// returns the cart and all its functions
  return  <CartContext.Provider value={{cart: {items:cartItems,totalPrice, totalCount}
  ,removeFromCart,
   changeQuantity, 
   addToCart,

 }}
  > {children}
  </CartContext.Provider>;
}
// gets the value inside the children
export const useCart = () => useContext (CartContext);
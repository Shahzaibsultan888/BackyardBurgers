import { createReducer } from "@reduxjs/toolkit";
const initialState ={
    cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):{
      cheeseBurger:{
          quantity:0,
          price:350,
      },
      chapliBurger:{
          quantity:0,
          price:430,
      },
      chickenBurgerWithFries:{
          quantity:0,
          price:650,
      },
  },
  subTotal: localStorage.getItem("cartPrices")
    ? JSON.parse(localStorage.getItem("cartPrices")).subTotal
    : 0,
  tax: localStorage.getItem("cartPrices")
    ? JSON.parse(localStorage.getItem("cartPrices")).tax
    : 0,
  shippingCharges: localStorage.getItem("cartPrices")
    ? JSON.parse(localStorage.getItem("cartPrices")).shippingCharges
    : 0,
  total: localStorage.getItem("cartPrices")
    ? JSON.parse(localStorage.getItem("cartPrices")).total
    : 0,
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
}

export const cartReducer = createReducer(initialState,{
    cheeseBurgerIncrement: (state) => {
        state.cartItems.cheeseBurger.quantity += 1;
      },
      chapliBurgerIncrement: (state) => {
        state.cartItems.chapliBurger.quantity += 1;
      },
      chickenBurgerWithFriesIncrement: (state) => {
        state.cartItems.chickenBurgerWithFries.quantity += 1;
      },
      cheeseBurgerDecrement: (state) => {
        state.cartItems.cheeseBurger.quantity -= 1;
      },
      chapliBurgerDecrement: (state) => {
        state.cartItems.chapliBurger.quantity -= 1;
      },
      chickenBurgerWithFriesDecrement: (state) => {
        state.cartItems.chickenBurgerWithFries.quantity -= 1;
      },

      calculatePrice: (state) => {
        state.subTotal =
          state.cartItems.cheeseBurger.price *
            state.cartItems.cheeseBurger.quantity +
          state.cartItems.chapliBurger.price *
            state.cartItems.chapliBurger.quantity +
          state.cartItems.chickenBurgerWithFries.price *
            state.cartItems.chickenBurgerWithFries.quantity;
    
        state.tax = state.subTotal * 0.11;
        state.shippingCharges = state.subTotal > 1000 ? 0 : 200;
        state.total = state.subTotal + state.tax + state.shippingCharges;
      },
      emptyState: (state) => {
        state.cartItems = {
          cheeseBurger: {
            quantity: 0,
            price: 350,
          },
          chapliBurger: {
            quantity: 0,
            price: 430,
          },
          chickenBurgerWithFries: {
            quantity: 0,
            price: 650,
          },
        };
    
        state.subTotal = 0;
        state.shippingCharges = 0;
        state.tax = 0;
        state.total = 0;
      },


      addShippingInfo: (state, action) => {
        state.shippingInfo = {
          hNo: action.payload.hNo,
          email: action.payload.email,
          pinCode: action.payload.pinCode,
          phoneNo: action.payload.phoneNo,
          city: action.payload.city,
          area: action.payload.area,
          
          
        };
      },
})


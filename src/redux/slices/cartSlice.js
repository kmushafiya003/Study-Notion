import { createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-hot-toast';

const initialState = {

  //find the course in the cart
    cart : localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")) : [],

  //find the totalItems in the cart
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0 ,

  //find the total price of totalItems in the Cart
   totalPrice : localStorage.getItem("totalPrice") ? JSON.parse(localStorage.getItem("totalPrice")) : 0,

}


const cartSlice = createSlice({
    name : "cart" ,
    initialState : initialState ,
    reducers : {

      //add to cart
      addToCart : (state , value) => {

        const course = value.payload ;

        //find index for the given course is already present in the cart or not
        const index = state.cart.findIndex((item)=> item._id === course._id);

        //if yes
        if(index >= 0 ){
          toast.error("Course is already present in the cart !!!");
          return 0;
        }

        //if not

        // set in state
        state.cart.push(course);
        state.totalItems++ ;
        state.totalPrice = state.totalPrice + course.price;

        // also set in the localStorage

        localStorage.setItem("cart" , JSON.stringify(state.cart));
        localStorage.setItem("totalItems" , JSON.stringify(state.totalItems));
        localStorage.setItem("totalPrice" , JSON.stringify(state.totalPrice));

        toast.success("Course added in the cart");


      } ,


      //remove to cart
      removeFromCart : (state , value) => {

        const courseID = value.payload ;

        //find index for the given course is already present in the cart or not
        const index = state.cart.findIndex((item)=> item._id === courseID);

        if(index >= 0){

         
          state.totalItems -- ;
          state.totalPrice -= state.cart[index].price  ;
          state.cart.splice(index , 1);
          // state.cart.filter((item)=> item.id !== course.id); //also check with these

        }

          // also set in the localStorage

          localStorage.setItem("cart" , JSON.stringify(state.cart));
          localStorage.setItem("totalItems" , JSON.stringify(state.totalItems));
          localStorage.setItem("totalPrice" , JSON.stringify(state.totalPrice));
  
          toast.success("Course removed from the cart");
  
        

      },


      //resetCart

      resetCart : (state) => {

        state.cart = [];
        state.totalItems = 0;
        state.totalPrice = 0;

        localStorage.removeItem("cart");
        localStorage.removeItem("totalItems");
        localStorage.removeItem("totalPrice");
      }


    }

});

export const{addToCart , removeFromCart , resetCart} = cartSlice.actions ; 
export default cartSlice.reducer ;
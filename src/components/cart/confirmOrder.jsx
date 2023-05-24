// import React from 'react'
// import {motion} from "framer-motion"
// import { useEffect } from "react";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { createOrder, paymentVerification } from "../../redux/actions/order";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { server } from "../../redux/store";
// const ConfirmOrder = () => {


//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [disableBtn, setDisableBtn] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { cartItems, subTotal, tax, shippingCharges, total, shippingInfo } =
//     useSelector((state) => state.cart);
//   const { message, error } = useSelector((state) => state.order) || {}; 
//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setDisableBtn(true);

//     if (paymentMethod === "COD") {
//       dispatch(
//         createOrder(
//           shippingInfo,
//           cartItems,
//           paymentMethod,
//           subTotal,
//           tax,
//           shippingCharges,
//           total
//         )
//       );
//     } else {
      

//       const {
//         data: { order, orderOptions },
//       } = await axios.post(
//         `${server}/createorderonline`,
//         {
//           shippingInfo,
//           orderItems: cartItems,
//           paymentMethod,
//           itemsPrice: subTotal,
//           taxPrice: tax,
//           shippingCharges,
//           totalAmount: total,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       const options = {
//         key: "rzp_test_xifxK8eeUk29cZ",
//         amount: order.amount,
//         currency: "PKR",
//         name: "Backyard Burgers",
//         description: "Burger App",
//         order_id: order.id,
//         handler: function (response) {
//           const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
//             response;

//           dispatch(
//             paymentVerification(
//               razorpay_payment_id,
//               razorpay_order_id,
//               razorpay_signature,
//               orderOptions
//             )
//           );
//         },

//         theme: {
//           color: "#9c003c",
//         },
//       };
//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     }
//   };

//   useEffect(() => {
//     if (message) {
//       console.log("Message:", message);
//       toast.success(message);
//       dispatch({ type: "clearMessage" });
//       dispatch({ type: "emptyState" });
//       navigate("/paymentsuccess");
//     }
//     if (error) {
//       toast.error(error);
//       dispatch({ type: "clearError" });
//       setDisableBtn(false);
//     }
//   }, [dispatch, message, error, navigate]);
//   return (
//     <section className="confirmOrder">
//       <main>
//         <motion.h1 initial = {{x:"-100%",opacity:0}}animate={{ x:0,opacity:1}} transition={{delay:0.1}}>Confirm Order</motion.h1>

//         <form onSubmit={submitHandler}>
//           <motion.div initial = {{x:"-100%",opacity:0}}animate={{ x:0,opacity:1}} transition={{delay:0.3}}>
//             <label>Cash On Delivery</label>
//             <input  type="radio" name="payment" onChange={() => setPaymentMethod("COD")} required/>
//           </motion.div>
//           <motion.div initial = {{x:"-100%",opacity:0}}animate={{ x:0,opacity:1}} transition={{delay:0.5}}>
//             <label>Online</label>
//             <input  type="radio" requiredname="payment"  onChange={() => setPaymentMethod("Online")}/>
//           </motion.div>

//           <motion.button initial = {{x:"-100%",opacity:0}}animate={{ x:0,opacity:1}} transition={{delay:0.7}} disabled={disableBtn} type="submit">Place Order</motion.button>
//         </form>
//       </main>
//     </section>
//   )
// }



import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, paymentVerification } from '../../redux/actions/order';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../redux/store';

const ConfirmOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [disableBtn, setDisableBtn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, subTotal, tax, shippingCharges, total, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.order) || {}; // add null check with default empty object

  const submitHandler = async (e) => {
    e.preventDefault();
    setDisableBtn(true);

    if (paymentMethod === 'COD') {
      dispatch(createOrder(shippingInfo, cartItems, paymentMethod, subTotal, tax, shippingCharges, total));
      navigate('/paymentsuccess');
    } else {
      try {
        const {
          data: { order, orderOptions },
        } = await axios.post(
          `${server}/createorderonline`,
          {
            shippingInfo,
            orderItems: cartItems,
            paymentMethod,
            itemsPrice: subTotal,
            taxPrice: tax,
            shippingCharges,
            totalAmount: total,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        const options = {
          key: 'rzp_test_xifxK8eeUk29cZ',
          amount: order.amount,
          currency: 'PKR',
          name: 'Backyard Burgers',
          description: 'Burger App',
          order_id: order.id,
          handler: function (response) {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
            dispatch(paymentVerification(razorpay_payment_id, razorpay_order_id, razorpay_signature, orderOptions));
            dispatch({ type: "clearMessage" });
            dispatch({ type: "emptyState" });
            navigate('/paymentsuccess');
          },

          theme: {
            color: '#9c003c',
          },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (error) {
        console.log(error);
        setDisableBtn(false);
        toast.error('Error occurred while processing payment');
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
      setDisableBtn(false);
    }
  }, [dispatch, error]);

  return (
    <section className="confirmOrder">
      <main>
        <motion.h1 initial={{ x: '-100%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          Confirm Order
        </motion.h1>

        <form onSubmit={submitHandler}>
          <motion.div initial={{ x: '-100%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            <label>Cash On Delivery</label>
            <input required type="radio" name="payment" onChange={() => setPaymentMethod('COD')} />
          </motion.div>
          <motion.div initial = {{x:"-100%",opacity:0}}animate={{ x:0,opacity:1}} transition={{delay:0.5}}>
            <label>Online</label>
            <input  type="radio" required name="payment"  onChange={() => setPaymentMethod("Online")}/>
           </motion.div>

           <motion.button initial = {{x:"-100%",opacity:0}}animate={{ x:0,opacity:1}} transition={{delay:0.7}} disabled={disableBtn} type="submit">Place Order</motion.button>
         </form>
       </main>
     </section>
  )
}




export default ConfirmOrder











// ?? { message: '', error: '' }
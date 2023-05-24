import React from 'react'
import { Link } from "react-router-dom";
import {motion,animate} from "framer-motion"

const paymentSuccess = () => {
  return (
    <section className="paymentsuccess">
    <main>
      <motion.h1 initial = {{y:"-100%",opacity:0}} animate={{ y:0,opacity:1}} transition={{delay:0.2}}>Order Confirmed</motion.h1>
      <p>Order Placed Successfully, You can check order status below</p>
      <Link to="/myorders">Check Status</Link>
    </main>
  </section>
  )
}

export default paymentSuccess
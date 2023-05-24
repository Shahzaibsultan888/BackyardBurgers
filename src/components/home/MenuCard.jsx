import React from 'react'
import { motion } from "framer-motion"
const MenuCard = ({itemNum,burgerSrc,price,title,handler,delay}) => {
  return <motion.div className='menucard'
  initial={{
    x:"-100%",
    opacity:0
  }}whileInView={{
    x:0,
    opacity:1
  }}
  transition={{
    delay,
  }}>
    <div>Item {itemNum}</div>
    <main>
        <img src={burgerSrc}alt="itemNum" />
        <h5>Rs{price}</h5>
        <p>{title}</p>

        <button onClick={()=>handler(itemNum)}>Add to cart</button>
    </main>

  </motion.div>
}

export default MenuCard
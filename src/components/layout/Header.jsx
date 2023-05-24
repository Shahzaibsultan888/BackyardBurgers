import React from 'react'
import {IoFastFoodOutline} from "react-icons/io5"
import { Link } from 'react-router-dom'
import {FiShoppingCart,FiLogIn}from "react-icons/fi"
import { FaUser}from "react-icons/fa"
import {motion}from "framer-motion"
const Header = ({isAuthenticated=false}) => {
  return (
    <nav>
      <motion.div className='svg'
      initial={{x:"-100%"}}
      whileInView={{x:0}}>
        < IoFastFoodOutline/>
      </motion.div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
        <Link to="/cart" className='logcart' ><FiShoppingCart/></Link>
        <Link className='logcart' to = {isAuthenticated?"/me":"/login"}>
          {isAuthenticated?<FaUser />:<FiLogIn />}
          </Link>
      </div>
    </nav>
  )
}

export default Header
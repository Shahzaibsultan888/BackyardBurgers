import React from 'react'
import { useState } from 'react';
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Shipping = () => {
    const { shippingInfo } = useSelector((state) => state.cart);

    const [hNo, setHNo] = useState(shippingInfo.hNo);
    const [email, setEmail] = useState(shippingInfo.email)

    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const [city, setCity] = useState(shippingInfo.city);
    const [area, setArea] = useState(shippingInfo.area);

    const dispatch = useDispatch();
    const navigate = useNavigate()


    const submitHandler = (e) => {
        
        e.preventDefault()
        console.log(hNo, email, pinCode, phoneNo, city, area)
        
        dispatch({
            type: "addShippingInfo",
            payload: {
                hNo, email, pinCode, phoneNo, city, area
            },
            
        })

        localStorage.setItem(
            "shippingInfo",
            JSON.stringify({
                hNo, email, pinCode, phoneNo, city, area
            })
          );
      
        navigate("/confirmOrder")
    }






    return (
        <section className='shipping'>
            <main>
                <motion.h1 initial={{ x: "-100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>Shopping Details</motion.h1>
                <motion.form onSubmit={submitHandler}>
                    <motion.div initial={{ x: "-100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                        <label >H.No.</label>
                        <input required type="text" placeholder='Enter House No.' value={hNo} onChange={(e) => setHNo(e.target.value)} />
                    </motion.div>
                    <motion.div initial={{ x: "-100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                        <label>Email</label>
                        <input required type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </motion.div>
                    <motion.div initial={{ x: "-100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                        <label >Pin Code</label>
                        <input type="number" placeholder='Enter Pincode' value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
                    </motion.div>
                    <motion.div initial={{ x: "-100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
                        <label >Phone No.</label>
                        <input type="number" placeholder='Enter Phone No. ' required value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                    </motion.div>
                    <motion.div initial={{ x: "-100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.9 }}>
                        <label >City</label>
                        <select value={city} required  onChange={(e) => setCity(e.target.value)}>
                            <option value="">City</option>
                            <option value="Karachi">Karachi</option>

                        </select>
                    </motion.div>
                    <motion.div initial={{ x: "-100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1 }}>
                        <label  >Areas</label>
                        <select value={area} onChange={(e) => setArea(e.target.value)}>
                            <option value="">Area</option>
                            <option value="Shah Faisal Colony ">Shah Faisal Colony </option>
                            <option value="Korangi">Korangi</option>
                            <option value="Cantt">Cantt</option>
                            <option value="New karachi">New karachi</option>
                            <option value="North Nazimabad">North Nazimabad</option>
                            <option value="Malir">Malir</option>
                            <option value="Airport">Airport</option>
                            <option value="Other">Other</option>
                        </select>
                    </motion.div>
                    <motion.button initial={{ x: "-100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.3 }} type="submit">Confirm Order</motion.button>
                </motion.form>



            </main>
        </section>
    )
}

export default Shipping
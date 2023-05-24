import React from 'react'
import { motion } from "framer-motion"
import me from "../../assets/profile photo.jpg"
const Founder = () => {
  const options = {
    initial : {
      x:"-100%",   
      opacity :0
    },
    whileInView:{
      x:0,
      opacity:1
    }

  }
  return (
    <section className="founder">
      <motion.div {...options}>
        <img src={me} alt="Founder" height={200} width={200}/>
        <h3>Shahzaib Sultan</h3>

        <p>Hey, Everyone I am Shahzaib Sultan , the founder of 
          Backyard Burgers <br/>
          Our aim is to create the most tasty burger in our city.
          </p>
      </motion.div>
    </section>
  )
}

export default Founder
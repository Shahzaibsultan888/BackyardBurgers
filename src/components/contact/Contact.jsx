import React from 'react'
import { motion } from "framer-motion"
import burger from "../../assets/burger2.png"
import emailjs from 'emailjs-com';
import { useRef } from 'react';

const Contact = () => {
    const emailInputRef = useRef(null);
    const messageInputRef = useRef(null);

function sendEmail() {
  emailjs.send("service_1ng2jzc", "template_fm6kdgm", {
    to_name: "Shahzaib Sultan",
    from_name: emailInputRef.current.value,
    message: messageInputRef.current.value ,
    reply_to: emailInputRef.current.value,
  }, "P1Cefj-MgAvkuEqL_")
  .then((response) => {
    console.log("SUCCESS!", response.status, response.text);
  }, (error) => {
    console.log("FAILED...", error);
  });
}
    return (
        <section className='contact'>
            <motion.form initial={{
                x: '-100vw',
                opacity: 0
            }}
                animate={{
                    x: 0,
                    opacity: 1
                }}
                transition={{ delay: 0.2 }} onSubmit={(e) => {
                    e.preventDefault();
                    sendEmail();
                    e.target.reset();
                }}>

                <h2>Contact Us</h2>
                <input type="text" placeholder='Name' />
                <input type="email" placeholder='Email'  ref={emailInputRef}/>
                <textarea name="message" id="" placeholder='Message...' ref={messageInputRef}></textarea>
                <button type='submit'>Send</button>
            </motion.form>
            <motion.div className='formBorder'initial={{
                        x: '100vw',
                        opacity: 0
                    }}
                    animate={{
                        x: 0,
                        opacity: 1
                    }}
                    transition={{ delay: 0.2 }}>
                <motion.div
                initial={{
                    y:"-100vh",
                    x: '50%',
                    opacity: 0
                }}
                animate={{
                    x: "50%",
                    y:"-50%",
                    opacity: 1
                }}
                transition={{ delay: 1, }}>
                    <img src={burger} alt="burger" />
                </motion.div>
            </motion.div>
            <script src=" https://smtpjs.com/v3/smtp.js"></script>
            
        </section>
    )
}

export default Contact
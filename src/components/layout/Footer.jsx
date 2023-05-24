import React from 'react'
import {AiFillYoutube,AiFillFacebook,AiFillInstagram}from "react-icons/ai"

const Footer = () => {
  return (
    <footer>
        <div>
            <h2>Backyard Burgers</h2>
            <p>We are trying to give you a best taste.</p>
            <br />
            
            <em>We give attention to genuine feedback.</em>
            
            <strong>All right received @backyardburgers</strong></div>

            <aside> 
                <h4>Follow us</h4>
                <a href="https://www.youtube.com/hashtag/burgeroclock"><AiFillYoutube/></a>
                <a href="https://www.facebook.com/burgeroclock/"><AiFillFacebook/></a>
                <a href="https://www.instagram.com/burgeroclock/?hl=en"><AiFillInstagram/></a>
            </aside>
    </footer>
  )
}

export default Footer
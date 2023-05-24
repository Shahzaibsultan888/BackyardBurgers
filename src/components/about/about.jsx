import React from 'react'
import me from "../../assets/profile photo.jpg"
import { Link } from "react-router-dom";
import { RiFindReplaceLine } from "react-icons/ri";
const about = () => {
  return (
    <section className="about">
      <main>
        <h1>About Us</h1>

        <article>
          <h4>Backyard Burgers</h4>
          <p>
          Grilling up deliciousness in your own backyard
          </p>

          <p>
          The ultimate burger experience is just a click away - view our menu!
          </p>

          <Link to="/">
            <RiFindReplaceLine />
          </Link>
        </article>

        <div>
          <h2>Founder</h2>
          <article>
            <div>
              <img src={me} alt="Founder" />
              <h3>Shahzaib Sultan</h3>
            </div>

            <p>
              I am Shahzaib Sultan, As the founder of Backyard Burgers, 
              I promise a culinary experience like no other.
            </p>
          </article>
        </div>
      </main>
    </section>
  )
}

export default about
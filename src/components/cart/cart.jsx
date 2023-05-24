import React from 'react'
import burger1 from "../../assets/burger1.png"
import burger2 from "../../assets/burger2.png"
import burger3 from "../../assets/burger3.png"
import { Link } from 'react-router-dom'
import { useSelector ,useDispatch } from 'react-redux'
import { useEffect } from "react";


const CartItem = ({ value, title, img, increment, decrement }) => {
    return (
        <div className="cartItem">
            <div>
                <h4>{title}</h4>
                <img src={img} alt="Item" />
            </div>
            <div className='btn'>
                <button onClick={decrement}>-</button>
                <input type="number" value={value} />
                <button onClick={increment}>+</button>
            </div>
        </div>)
}
const Cart = () => {

    const {
         cartItems: {
        cheeseBurger: { quantity: cheeseBurger },
        chapliBurger: { quantity: chapliBurger },
        chickenBurgerWithFries: { quantity: chickenBurgerWithFries },

    },
        subTotal,
        tax,
        shippingCharges,
        total,
    } = useSelector((state) => state.cart)
    const { cartItems: orderItems } = useSelector((state) => state.cart);

    const dispatch = useDispatch()
    const increment = (item) => {
        switch (item) {
            case 1:
                
              dispatch({ type: "cheeseBurgerIncrement" });
              dispatch({ type: "calculatePrice" });
              break;
            case 2:
              dispatch({ type: "chapliBurgerIncrement" });
              dispatch({ type: "calculatePrice" });
              break;
            case 3:
              dispatch({ type: "chickenBurgerWithFriesIncrement" });
              dispatch({ type: "calculatePrice" });
              break;
      
            default:
              dispatch({ type: "cheeseBurgerIncrement" });
              dispatch({ type: "calculatePrice" });
              break;
          }
    }
    const decrement = (item) => {
        switch (item) {
            case 1:
                if(cheeseBurger===0)break
              dispatch({ type: "cheeseBurgerDecrement" });
              dispatch({ type: "calculatePrice" });
              break;
            case 2:
                if(chapliBurger===0)break
              dispatch({ type: "chapliBurgerDecrement" });
              dispatch({ type: "calculatePrice" });
              break;
            case 3:
                if(chickenBurgerWithFries===0)break
              dispatch({ type: "chickenBurgerWithFriesDecrement" });
              dispatch({ type: "calculatePrice" });
              break;
      
            default:
                if(cheeseBurger===0)break
              dispatch({ type: "cheeseBurgerDecrement" });
              dispatch({ type: "calculatePrice" });
              break;
    }}
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(orderItems));
        localStorage.setItem(
          "cartPrices",
          JSON.stringify({
            subTotal,
            tax,
            shippingCharges,
            total,
          })
        );
      }, [orderItems, subTotal, tax, shippingCharges, total]);
    return (
        <section className='cart'>
            <main>
                <CartItem
                    title={"Cheese Burger"}
                    img={burger1}
                    value={cheeseBurger}
                    increment={() => increment(1)}
                    decrement={() => decrement(1)} />
                <CartItem
                    title={"Chapli Burger"}
                    img={burger2}
                    value={chapliBurger}
                    increment={() => increment(2)}
                    decrement={() => decrement(2)} />
                <CartItem className='cart3'
                    title={"Chicken Burger Fries"}
                    img={burger3}
                    value={chickenBurgerWithFries}
                    increment={() => increment(3)}
                    decrement={() => decrement(3)} />

                <article>
                    <div>
                        <h4>Sub Total</h4>
                        <p>Rs{subTotal}</p>
                    </div>
                    <div>
                        <h4>Tax</h4>
                        <p>Rs{tax}</p>
                    </div>
                    <div>
                        <h4>Shipping Charges</h4>
                        <p>Rs{shippingCharges}</p>
                    </div>
                    <div>
                        <h4>Total</h4>
                        <p>Rs{total}</p>
                    </div>
                    <Link to="/shipping">Checkout</Link>
                </article>
            </main>
        </section>
    )
}

export default Cart
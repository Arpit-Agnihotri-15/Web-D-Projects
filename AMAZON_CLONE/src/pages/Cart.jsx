import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function Cart() {

    const navigate = useNavigate()

    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    )

    function display(updatedCart) {

        setCart([...updatedCart])

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        )
    }

    function changeQty(index, change) {

        let updated = [...cart]

        updated[index].qty += change

        if (updated[index].qty <= 0) {

            updated.splice(index, 1)
        }

        display(updated)
    }

    function removeItem(index) {

        let updated = [...cart]

        updated.splice(index, 1)

        display(updated)
    }

    function checkout() {

        let user = localStorage.getItem("user")

        if (!user) {

            alert("Please login first!")

            navigate("/login")

            return
        }

        if (cart.length === 0) {

            alert("Your cart is empty!")

            return
        }

        alert("Order placed successfully! (Demo)")

        localStorage.removeItem("cart")

        setCart([])
    }

    let total = 0

    cart.forEach(item => {

        total += item.price * item.qty
    })

    return (

        <>
            <Navbar />

            <h1 className="cart-title">
                🛒 Your Cart
            </h1>

            <div className="cart-container">

                {cart.map((item, index) => (

                    <div className="cart-item" key={index}>

                        <img src={item.img} />

                        <div className="cart-details">

                            <h3>{item.name}</h3>

                            <p>₹{item.price}</p>

                            <div className="qty-box">

                                <button onClick={() => changeQty(index, -1)}>
                                    -
                                </button>

                                <span>{item.qty}</span>

                                <button onClick={() => changeQty(index, 1)}>
                                    +
                                </button>

                            </div>

                            <button
                                className="remove-btn"
                                onClick={() => removeItem(index)}
                            >
                                Remove
                            </button>

                        </div>

                    </div>

                ))}

            </div>

            <div className="cart-summary">

                <h2>
                    Total: ₹{total}
                </h2>

                <button
                    onClick={() => navigate("/")}
                    className="back-btn"
                >
                    ⬅ Continue Shopping
                </button>

                <button
                    onClick={checkout}
                    className="checkout-btn"
                >
                    Proceed to Checkout
                </button>

            </div>

            <Footer />
        </>
    )
}

export default Cart
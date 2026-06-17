import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function Cart() {
    const navigate = useNavigate()

    
    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    )

    
    const [wishlist, setWishlist] = useState(
        JSON.parse(localStorage.getItem("wishlist")) || []
    )

    
    function display(updatedCart) {
        setCart([...updatedCart])
        localStorage.setItem("cart", JSON.stringify(updatedCart))
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

    
    function displayWishlist(updatedWishlist) {
        setWishlist([...updatedWishlist])
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
    }

    function removeWishlistItem(index) {
        let updated = [...wishlist]
        updated.splice(index, 1)
        displayWishlist(updated)
    }

    function moveFromWishlistToCart(item, index) {
        
        let updatedCart = [...cart]
        let existing = updatedCart.find(cartItem => cartItem.id === item.id)
        
        if (existing) {
            existing.qty += 1
        } else {
            updatedCart.push({ ...item, qty: 1 })
        }
        display(updatedCart)

        
        removeWishlistItem(index)
        alert("Moved to Cart!")
    }

    let total = 0
    cart.forEach(item => {
        total += item.price * item.qty
    })

    return (
        <>
            <Navbar />

            
            <h1 className="cart-title">🛒 Your Cart</h1>

            <div className="cart-container">
                {cart.length === 0 && (
                    <div className="text-center my-5 py-5 bg-white rounded-4 shadow-sm">
                        <h3 className="text-secondary mb-4">Your Amazon Cart is empty.</h3>
                        <button 
                            onClick={() => navigate("/")} 
                            className="btn btn-warning rounded-pill px-5 fw-bold py-2"
                        >
                            Shop Now
                        </button>
                    </div>
                )}

                {cart.map((item, index) => (
                    <div className="cart-item shadow-sm" key={`cart-${index}`}>
                        <img src={item.img} alt={item.name} />

                        <div className="cart-details flex-grow-1">
                            <h3>{item.name}</h3>
                            <p className="text-success fw-bold fs-5">₹{item.price}</p>

                            <div className="qty-box mb-3">
                                <button onClick={() => changeQty(index, -1)} className="fw-bold fs-5">-</button>
                                <span className="fs-5 px-3">{item.qty}</span>
                                <button onClick={() => changeQty(index, 1)} className="fw-bold fs-5">+</button>
                            </div>

                            <button
                                className="btn btn-outline-danger btn-sm rounded-pill px-3"
                                onClick={() => removeItem(index)}
                            >
                                Remove from Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {cart.length > 0 && (
                <div className="cart-summary text-center my-5 bg-white p-4 rounded-4 shadow-sm w-75 mx-auto">
                    <h2 className="mb-4">Total: ₹{total}</h2>
                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                        <button onClick={() => navigate("/")} className="btn btn-dark rounded-pill px-4 py-2">
                            ⬅ Continue Shopping
                        </button>
                        <button onClick={checkout} className="btn btn-warning rounded-pill px-4 py-2 fw-bold">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}


            
            {wishlist.length > 0 && (
                <>
                    <h1 className="cart-title text-danger mt-5">❤️ Your Wishlist</h1>
                    
                    <div className="cart-container mb-5">
                        {wishlist.map((item, index) => (
                            <div className="cart-item shadow-sm" key={`wishlist-${index}`}>
                                <img src={item.img} alt={item.name} />

                                <div className="cart-details flex-grow-1">
                                    <h3>{item.name}</h3>
                                    <p className="text-success fw-bold fs-5">₹{item.price}</p>

                                    <div className="d-flex gap-3 mt-3 flex-wrap">
                                        <button 
                                            className="btn btn-warning rounded-pill px-4 fw-bold"
                                            onClick={() => moveFromWishlistToCart(item, index)}
                                        >
                                            Move to Cart
                                        </button>
                                        <button 
                                            className="btn btn-outline-danger rounded-pill px-4"
                                            onClick={() => removeWishlistItem(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <Footer />
        </>
    )
}

export default Cart
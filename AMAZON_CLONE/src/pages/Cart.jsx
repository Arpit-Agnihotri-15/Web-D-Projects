import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function Cart() {
    const navigate = useNavigate()
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || [])
    const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem("wishlist")) || [])
    let totalAmount = 0
    for (let i = 0; i < cart.length; i++) {
        totalAmount = totalAmount + (cart[i].price * cart[i].qty)
    }

    function updateCart(newCartData) {
        setCart([...newCartData])
        localStorage.setItem("cart", JSON.stringify(newCartData))
    }

    function increaseQty(index) {
        let tempCart = [...cart]
        tempCart[index].qty = tempCart[index].qty + 1
        updateCart(tempCart)
    }

    function decreaseQty(index) {
        let tempCart = [...cart]
        tempCart[index].qty = tempCart[index].qty - 1   
        if (tempCart[index].qty === 0) {
            tempCart.splice(index, 1)
        }
        updateCart(tempCart)
    }

    function removeFromCart(index) {
        let tempCart = [...cart]
        tempCart.splice(index, 1)
        updateCart(tempCart)
        toast.info("Removed from cart")
    }

    function doCheckout() {
        let user = localStorage.getItem("user")
        if (!user) {
            toast.error("Please login to checkout!")
            return
        }
        
        toast.success("Order placed successfully!")
        localStorage.removeItem("cart")
        setCart([]) 
        setTimeout(() => { window.location.href = "/" }, 1500)
    }

    function updateWishlist(newWishlistData) {
        setWishlist([...newWishlistData])
        localStorage.setItem("wishlist", JSON.stringify(newWishlistData))
    }

    function removeFromWishlist(index) {
        let tempWishlist = [...wishlist]
        tempWishlist.splice(index, 1)
        updateWishlist(tempWishlist)
        toast.info("Removed from wishlist")
    }

    function moveToCart(item, index) {
        let user = localStorage.getItem("user")
        if (!user) {
            toast.error("Please login first!")
            return
        }
        let tempCart = [...cart]
        let found = false   
        for (let i = 0; i < tempCart.length; i++) {
            if (tempCart[i].id === item.id) {
                tempCart[i].qty = tempCart[i].qty + 1
                found = true
                break
            }
        }   
        if (found === false) {
            item.qty = 1
            tempCart.push(item)
        }   
        updateCart(tempCart)
        removeFromWishlist(index)   
        toast.success("Moved to Cart!")
        setTimeout(() => { window.location.reload() }, 1500)
    }
    return (
        <>
            <Navbar />
            <h1 className="page-title">🛒 Your Cart</h1>
            <div className="cart-container">
                {cart.length === 0 && (
                    <div className="card-box empty-message">
                        <h3 className="text-gray">Cart is empty</h3>
                        <button onClick={() => navigate("/")} className="btn btn-primary">
                            Shop Now
                        </button>
                    </div>
                )}
                {cart.map((item, index) => (
                    <div className="cart-item" key={"cart" + index}>
                        <img src={item.img} alt={item.name} />
                        <div className="cart-details">
                            <h3>{item.name}</h3>
                            <p className="product-price">₹{item.price}</p>
                            <div className="qty-box">
                                <button onClick={() => decreaseQty(index)} className="qty-btn">-</button>
                                <span>{item.qty}</span>
                                <button onClick={() => increaseQty(index)} className="qty-btn">+</button>
                            </div>
                            <button className="btn btn-danger-outline btn-small" onClick={() => removeFromCart(index)}>
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {cart.length > 0 && (
                <div className="card-box summary-box">
                    <h2>Total Amount: ₹{totalAmount}</h2>
                    <div className="summary-actions">
                        <button onClick={() => navigate("/")} className="btn btn-dark">Go Back</button>
                        <button onClick={doCheckout} className="btn btn-primary">Checkout</button>
                    </div>
                </div>
            )}
            {wishlist.length > 0 && (
                <>
                    <h1 className="page-title highlight-red">❤️ Wishlist</h1>
                    <div className="cart-container mb-large">
                        {wishlist.map((item, index) => (
                            <div className="cart-item" key={"wish" + index}>
                                <img src={item.img} alt={item.name} />
                                <div className="cart-details">
                                    <h3>{item.name}</h3>
                                    <p className="product-price">₹{item.price}</p>
                                    <div className="summary-actions mt-small">
                                        <button className="btn btn-primary" onClick={() => moveToCart(item, index)}>
                                            Move to Cart
                                        </button>
                                        <button className="btn btn-danger-outline" onClick={() => removeFromWishlist(index)}>
                                            Delete
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
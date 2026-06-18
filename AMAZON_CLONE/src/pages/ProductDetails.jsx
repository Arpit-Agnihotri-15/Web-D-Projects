import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import products from "../data/products"

function ProductDetails() {
    const params = useParams()
    const navigate = useNavigate()
    let currentProduct = null
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == params.id) {
            currentProduct = products[i]
            break
        }
    }

    function addProductToCart() {
        let user = localStorage.getItem("user")
        if (!user) {
            toast.error("Login to add to cart!")
            return
        }
        let cart = JSON.parse(localStorage.getItem("cart")) || []  
        let itemFound = false
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === currentProduct.id) {
                cart[i].qty = cart[i].qty + 1
                itemFound = true
                break
            }
        }
        if (itemFound === false) {
            currentProduct.qty = 1
            cart.push(currentProduct)
        }
        localStorage.setItem("cart", JSON.stringify(cart))
        toast.success("Added to Cart")  
        setTimeout(() => { window.location.reload() }, 1500)
    }

    function buyNowAction() {
        let user = localStorage.getItem("user")
        if (!user) {
            toast.error("Login to buy this!")
            return 
        }
        toast.success("Order Placed Successfully!")
        setTimeout(() => { navigate("/") }, 1500)
    }
    return (
        <>
            <Navbar />
            <div className="details-page">
                <button onClick={() => window.history.back()} className="btn btn-dark back-btn">
                    Go Back
                </button>
                <div className="card-box details-container">
                    <div className="details-image-box">
                        <img src={currentProduct.img} alt={currentProduct.name} className="details-image" />
                    </div>
                    <div className="details-info-box">
                        <h1 className="product-title-large">{currentProduct.name}</h1>
                        <h2 className="product-price-large">₹{currentProduct.price}</h2>
                        <p className="product-description">
                            Premium quality product available with fast delivery.
                        </p>
                        <div className="details-actions">
                            <button onClick={addProductToCart} className="btn btn-primary btn-large">
                                Add To Cart
                            </button>
                            <button onClick={buyNowAction} className="btn btn-dark btn-large">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ProductDetails
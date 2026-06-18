import { Link } from "react-router-dom"
import { toast } from "react-toastify"

function ProductCard({ product, addToCart }) {

    function addWishlist() {
        let user = localStorage.getItem("user")    
        if (!user) {
            toast.error("Login to use wishlist!")
            return
        }
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []   
        let isAdded = false
        for (let i = 0; i < wishlist.length; i++) {
            if (wishlist[i].id === product.id) {
                isAdded = true
            }
        }
        if (isAdded) {
            toast.info("Item already in wishlist!")
        } else {
            wishlist.push(product)
            localStorage.setItem("wishlist", JSON.stringify(wishlist))
            toast.success("Added to Wishlist")
        }
    }
    return (
        <div className="product-card">
            <img src={product.img} className="product-image" alt={product.name} />
            <div className="product-info">
                <div>
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-price">₹{product.price}</p>
                </div>
                <div className="card-actions">
                    <button onClick={() => addToCart(product.id)} className="btn btn-primary">
                        Add To Cart
                    </button>
                    <Link to={`/product/${product.id}`} className="btn btn-dark">
                        View Product
                    </Link>
                    <button className="btn btn-danger-outline" onClick={addWishlist}>
                        ❤️ Wishlist
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
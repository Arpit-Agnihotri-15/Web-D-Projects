import { Link } from "react-router-dom"

function ProductCard({ product, addToCart }) {

    return (

        <div className="product-card shadow-sm hover:shadow-xl">

            <img
                src={product.img}
                className="product-image"
                alt={product.name}
            />

            <div className="product-info">

                <div>

                    <h3 className="fw-bold text-2xl mb-3">
                        {product.name}
                    </h3>

                    <p className="text-success fw-bold fs-4">
                        ₹{product.price}
                    </p>

                </div>

                <div className="d-flex flex-column gap-3 mt-4">

                    <button
                        onClick={() => addToCart(product.id)}
                        className="btn btn-warning rounded-pill fw-bold py-2"
                    >
                        Add To Cart
                    </button>

                    <Link
                        to={`/product/${product.id}`}
                        className="btn btn-dark rounded-pill fw-bold py-2"
                    >
                        View Product
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default ProductCard
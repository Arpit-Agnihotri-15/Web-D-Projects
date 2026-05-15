import { useParams } from "react-router-dom"

import { toast } from "react-toastify"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

import products from "../data/products"

function ProductDetails() {

    const { id } = useParams()

    const product = products.find(
        item => item.id === parseInt(id)
    )

    function addToCart() {

        let user = localStorage.getItem("user")

        if (!user) {

            toast.error("Please login first!")

            return
        }

        let cart = JSON.parse(localStorage.getItem("cart")) || []

        let existing = cart.find(item => item.id === product.id)

        if (existing) {

            existing.qty += 1

        } else {

            cart.push({
                ...product,
                qty: 1
            })
        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        )

        toast.success("Added To Cart")
    }

    return (

        <>

            <Navbar />

            <div className="container py-5">

                <button
                    onClick={() => window.history.back()}
                    className="btn btn-dark rounded-pill mb-4 px-4"
                >
                    ← Go Back
                </button>

                <div className="row bg-white rounded-4 shadow p-4 align-items-center">

                    <div className="col-md-6 text-center">

                        <img
                            src={product.img}
                            alt={product.name}
                            className="img-fluid"
                            style={{
                                maxHeight: "450px",
                                objectFit: "contain"
                            }}
                        />

                    </div>

                    <div className="col-md-6">

                        <h1 className="fw-bold mb-3">
                            {product.name}
                        </h1>

                        <h2 className="text-success fw-bold mb-4">
                            ₹{product.price}
                        </h2>

                        <p className="text-secondary fs-5 mb-4">

                            Premium quality {product.name} available
                            with best pricing and fast delivery.

                        </p>

                        <div className="d-flex gap-3">

                            <button
                                onClick={addToCart}
                                className="btn btn-warning btn-lg rounded-pill px-5 fw-bold"
                            >
                                Add To Cart
                            </button>

                            <button
                                className="btn btn-dark btn-lg rounded-pill px-5"
                            >
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
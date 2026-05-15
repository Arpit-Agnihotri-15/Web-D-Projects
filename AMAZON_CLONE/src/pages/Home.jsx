import { useEffect, useState } from "react"

import { toast } from "react-toastify"

import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard"
import Footer from "../components/Footer"

import products from "../data/products"

import banner1 from "../assets/images/banner1.jpg"
import banner2 from "../assets/images/banner2.jpg"
import banner3 from "../assets/images/banner3.jpg"
import banner4 from "../assets/images/banner4.jpg"
import banner5 from "../assets/images/banner5.jpg"

function Home() {

    const [search, setSearch] = useState("")

    const [slide, setSlide] = useState(0)

    const banners = [
        banner1,
        banner2,
        banner3,
        banner4,
        banner5
    ]

    useEffect(() => {

        const interval = setInterval(() => {

            setSlide(prev => (prev + 1) % banners.length)

        }, 2500)

        return () => clearInterval(interval)

    }, [])

    function addToCart(id) {

        let user = localStorage.getItem("user")

        if (!user) {

            toast.error("Please login first!")

            return
        }

        let cart = JSON.parse(localStorage.getItem("cart")) || []

        let product = products.find(p => p.id === id)

        let existing = cart.find(item => item.id === id)

        if (existing) {

            existing.qty += 1

        } else {

            product.qty = 1

            cart.push(product)
        }

        localStorage.setItem("cart", JSON.stringify(cart))

        toast.success("Added To Cart")

        window.location.reload()
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    )

    return (

        <>

            <Navbar
                search={search}
                setSearch={setSearch}
            />

            <div className="slider">

                <img
                    src={banners[slide]}
                    alt="Banner"
                />

            </div>

            <section className="products">

                {filteredProducts.map(product => (

                    <ProductCard
                        key={product.id}
                        product={product}
                        addToCart={addToCart}
                    />

                ))}

            </section>

            <Footer />

        </>
    )
}

export default Home
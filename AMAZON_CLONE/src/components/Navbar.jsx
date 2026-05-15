import { Link, useNavigate } from "react-router-dom"

function Navbar({ search, setSearch }) {

    const navigate = useNavigate()

    let user = localStorage.getItem("user")

    let cart = user
        ? JSON.parse(localStorage.getItem("cart")) || []
        : []

    let total = 0

    cart.forEach(item => total += item.qty || 1)

    function logout() {

        localStorage.removeItem("user")
        localStorage.removeItem("cart")

        navigate("/")

        window.location.reload()
    }

    return (

        <>

            <nav className="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top shadow">

                <div className="container-fluid gap-4 align-items-center">

                    <Link
                        className="navbar-brand"
                        to="/"
                    >

                        <img
                            src="/src/assets/images/logo2.png"
                            alt="Amazon"
                            className="h-12"
                        />

                    </Link>

                    <input
                        type="text"
                        placeholder="Search Amazon.in"
                        className="form-control rounded-pill px-4 py-2 flex-grow-1"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="d-flex align-items-center gap-4 text-white">

                        <div>

                            <small>
                                {user
                                    ? `Hello, ${user}`
                                    : "Hello, Sign in"}
                            </small>

                            <div>

                                <Link
                                    to="/login"
                                    className="text-white text-decoration-none fw-bold"
                                >
                                    Account
                                </Link>

                            </div>

                        </div>

                        <div>

                            <small>Returns</small>

                            <div className="fw-bold">
                                & Orders
                            </div>

                        </div>

                        <Link
                            to="/cart"
                            className="text-white text-decoration-none fw-bold"
                        >
                            🛒 Cart ({total})
                        </Link>

                        {
                            user && (

                                <button
                                    onClick={logout}
                                    className="btn btn-warning fw-bold"
                                >
                                    Logout
                                </button>

                            )
                        }

                    </div>

                </div>

            </nav>

            <div className="menu">

                <span>All</span>
                <span>Fresh</span>
                <span>Deals</span>
                <span>Mobiles</span>
                <span>Customer Service</span>
                <span>Electronics</span>
                <span>Fashion</span>

            </div>

        </>
    )
}

export default Navbar
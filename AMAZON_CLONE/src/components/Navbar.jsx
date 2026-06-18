import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/images/logo2.png"

function Navbar({ search = "", setSearch = () => {} }) {
    const navigate = useNavigate()
    let user = localStorage.getItem("user")
    let cartList = JSON.parse(localStorage.getItem("cart")) || []
    let totalItems = 0
    if (user) {
        for (let i = 0; i < cartList.length; i++) {
            totalItems = totalItems + cartList[i].qty
        }
    }

    function doLogout() {
        localStorage.removeItem("user")
        localStorage.removeItem("cart")
        navigate("/")
        window.location.reload()
    }

    function changeTheme() {
        document.body.classList.toggle("dark-theme")
        if (document.body.classList.contains("dark-theme")) {
            localStorage.setItem("theme", "dark")
        } else {
            localStorage.setItem("theme", "light")
        }
    }
    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <Link to="/" className="nav-logo">
                        <img src={logo} alt="Amazon" />
                    </Link>
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="search-bar"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="nav-right">
                        <div>
                            <span className="nav-text-small">{user ? `Hi, ${user}` : "Hi, Sign in"}</span>
                            <div>
                                <Link to="/login" className="nav-link text-bold">Account</Link>
                            </div>
                        </div>
                        <div>
                            <span className="nav-text-small">Returns</span>
                            <div className="text-bold">& Orders</div>
                        </div>
                        <Link to="/cart" className="nav-link text-bold">
                            🛒 Cart ({totalItems})
                        </Link>
                        {user && (
                            <button onClick={doLogout} className="btn btn-primary">
                                Logout
                            </button>
                        )}
                        <button onClick={changeTheme} className="theme-toggle-btn">
                            🌙
                        </button>
                    </div>
                </div>
            </nav>
            <div className="menu">
                <span>All</span>
                <span>Mobiles</span>
                <span>Electronics</span>
                <span>Fashion</span>
                <span>Customer Service</span>
            </div>
        </>
    )
}

export default Navbar
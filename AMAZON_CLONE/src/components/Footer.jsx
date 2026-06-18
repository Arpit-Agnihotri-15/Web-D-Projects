import logo from "../assets/images/logo2.png"

function Footer() {

    function goTop() {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
    return (
        <footer className="footer">       
            <div className="footer-top" onClick={goTop}>
                <p>Back to top ↑</p>
            </div>
            <div className="footer-content">
                <div className="footer-column">
                    <h4>Get to Know Us</h4>
                    <p>About Us</p>
                    <p>Careers</p>
                </div>
                <div className="footer-column">
                    <h4>Connect</h4>
                    <p>Instagram</p>
                    <p>Twitter</p>
                </div>
                <div className="footer-column">
                    <h4>Help</h4>
                    <p>Your Account</p>
                    <p>Customer Care</p>
                </div>
            </div>
            <div className="footer-bottom">
                <img src={logo} alt="Logo" />
                <p className="copyright-text">
                    © Amazon Clone Project
                </p>
            </div>
        </footer>
    )
}

export default Footer
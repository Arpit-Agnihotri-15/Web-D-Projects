function Footer() {

    function scrollToTop() {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (

        <footer className="footer">

            <div className="footer-top">

                <p onClick={scrollToTop}>
                    Back to top ↑
                </p>

            </div>

            <div className="footer-content">

                <div>

                    <h4 className="fw-bold mb-3">
                        Get to Know Us
                    </h4>

                    <p>About Us</p>
                    <p>Careers</p>
                    <p>Press Releases</p>

                </div>

                <div>

                    <h4 className="fw-bold mb-3">
                        Connect with Us
                    </h4>

                    <p>Facebook</p>
                    <p>X</p>
                    <p>Instagram</p>

                </div>

                <div>

                    <h4 className="fw-bold mb-3">
                        Make Money with Us
                    </h4>

                    <p>Sell on Amazon</p>
                    <p>Affiliate</p>

                </div>

                <div>

                    <h4 className="fw-bold mb-3">
                        Help
                    </h4>

                    <p>Your Account</p>
                    <p>Returns</p>
                    <p>Help Center</p>

                </div>

            </div>

            <div className="footer-bottom">

                <img
                    src="/src/assets/images/logo2.png"
                    alt="Amazon"
                />

                <p>
                    © 2026 Amazon Clone | Made by Arpit
                </p>

            </div>

        </footer>
    )
}

export default Footer
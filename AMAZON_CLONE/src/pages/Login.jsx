import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Footer from "../components/Footer"

import logo from "../assets/images/logo.png"

function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

    const [error, setError] = useState("")

    function login() {

        if (email === "" || password === "") {

            setError("All fields required!")

        } else {

            localStorage.setItem("user", email)

            alert("Login Successful!")

            navigate("/")
        }
    }

    function createAccount() {

        if (!email) {

            alert("Enter email first!")

            return
        }

        localStorage.setItem("user", email)

        alert("Account Created Successfully!")

        navigate("/")
    }

    return (

        <>

            <div className="login-container">

                <div className="login-box">

                    <h1 className="text-center fw-bold mb-4">
                        Sign In
                    </h1>

                    <div className="login-logo mb-4">

                        <img
                            src={logo}
                            alt="Amazon"
                        />

                    </div>

                    <label className="fw-bold mb-2">
                        Email
                    </label>

                    <input
                        type="text"
                        className="form-control mb-3 rounded-3"
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className="fw-bold mb-2">
                        Password
                    </label>

                    <input
                        type="password"
                        className="form-control mb-3 rounded-3"
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        onClick={login}
                        className="btn btn-warning w-100 fw-bold py-2 rounded-pill"
                    >
                        Sign In
                    </button>

                    <p className="text-danger text-center mt-2">
                        {error}
                    </p>

                    <hr className="my-4" />

                    <p className="text-center">
                        New to Amazon?
                    </p>

                    <button
                        onClick={createAccount}
                        className="btn btn-outline-secondary w-100 rounded-pill"
                    >
                        Create your Amazon account
                    </button>

                </div>

            </div>

            <Footer />

        </>
    )
}

export default Login
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import Footer from "../components/Footer"
import logo from "../assets/images/logo.png"

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function checkEmail(emailText) {
        if (emailText.includes("@") && emailText.includes(".")) {
            return true
        } else {
            return false
        }
    }

    function handleLogin() {
        if (email === "" || password === "") {
            toast.error("Please fill all details!")
            return
        }
        if (checkEmail(email) === false) {
            toast.error("Email format is wrong!")
            return
        }
        localStorage.setItem("user", email)
        toast.success("Login Success!")
        navigate("/")
    }

    function handleSignup() {
        if (email === "" || password === "") {
            toast.error("Enter email and password to sign up!")
            return
        }  
        if (checkEmail(email) === false) {
            toast.error("Use a proper email id!")
            return
        }
        localStorage.setItem("user", email)
        toast.success("Account Created!")
        navigate("/")
    }
    return (
        <>
            <div className="login-page">
                <div className="card-box login-box">
                    <h1 className="text-center">Sign In</h1>
                    <div className="login-logo">
                        <img src={logo} alt="Amazon" />
                    </div>
                    <label className="text-bold">Email</label>
                    <input
                        type="email"
                        className="input-field"
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="text-bold">Password</label>
                    <input
                        type="password"
                        className="input-field"
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin} className="btn btn-primary full-width">
                        Sign In
                    </button>
                    <hr className="divider" />
                    <p className="text-center">New User?</p>
                    <button onClick={handleSignup} className="btn btn-outline full-width">
                        Create Account
                    </button>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login
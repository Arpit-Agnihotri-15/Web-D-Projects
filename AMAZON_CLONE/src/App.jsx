import { BrowserRouter, Routes, Route } from "react-router-dom"

import { ToastContainer } from "react-toastify"

import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import ProductDetails from "./pages/ProductDetails"

function App() {

  return (

    <BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={2000}
      />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App
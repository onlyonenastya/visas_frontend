import "./Styles/Main.sass"
import "./Styles/Reset.sass"
import { useEffect, useState } from "react"
import Header from "./Components/Header/Header"
import { Visa } from "./Types"
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import VisaPage from "./Pages/VisaPage/VisaPage"
import VisasList from "./Pages/VisasList/VisasList"
import RegistrationPage from "./Pages/RegistrationPage/RegistrationPage"
import AuthPage from "./Pages/AuthPage/AuthPage"
import { ToastContainer, toast } from "react-toastify"
import OrdersHistory from "./Pages/OrdersHistory/OrdersHistory"
import axios from "axios"
import { Response } from "./Types"
import Cookies from "universal-cookie"
import { updateUser } from "./store/UserSlice"
import { useDispatch } from "react-redux"
import CartPage from "./Pages/CartPage/CartPage"
import OrdersList from "./Pages/OrdersList/OrdersList"
import VisasTable from "./Pages/VisasTable/VisasTable"
import VisaEditPage from "./Pages/VisaEditPage/VisaEditPage"

const cookies = new Cookies()

function App() {
  const [selectedVisa, setSelectedVisa] = useState<Visa | undefined>(undefined)
  const dispatch = useDispatch()

  const login = async () => {
    try {
      const response: Response = await axios(
        `http://localhost:8000/api/check/`,
        {
          method: "POST",
          withCredentials: true,
          //   headers: {
          //     "Content-type": "application/json; charset=UTF-8",
          //   },
          //   data: formData as FormData,
        }
      )
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      cookies.set("access_token", response.data["access_token"], {
        path: "/",
        expires: new Date(Date.now() + 25920000),
      })
      const user = {
        is_authenticated: true,
        is_moderator: response.data["is_moderator"],
        user_id: response.data["user_id"],
        user_email: response.data["email"],
        user_name: response.data["name"],
        // current_cart: response.data["current_cart"],
      }
      console.log(user)
      dispatch(updateUser(user))
    } catch {
      // toast.error("Проверьте введенные данных", {
      //   icon: "😕",
      // })
    }
  }

  useEffect(() => {
    // if (cookies.get("access_token")) {
    login()
    // }
  })

  return (
    <BrowserRouter basename="/services">
      <div className="App">
        <div className="wrapper">
          <Header />

          <div className="content-wrapper">
            <Breadcrumbs />

            <Routes>
              <Route path="/" element={<Navigate to="/visas" replace />} />

              <Route path="/visas" element={<VisasList />} />

              <Route
                path="/visas/:id"
                element={
                  <VisaPage
                    selectedVisa={selectedVisa}
                    setSelectedVisa={setSelectedVisa}
                  />
                }
              />
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/orders" element={<OrdersList />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/orders/:id" element={<CartPage />} />
              <Route path="/visas_list" element={<VisasTable />} />
              <Route path="/visas_list/:id" element={<VisaEditPage />} />
            </Routes>
            <ToastContainer autoClose={1000} pauseOnHover={false} />
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App

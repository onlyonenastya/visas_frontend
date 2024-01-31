import "./NavMenu.sass"
import { Link, useLocation, useNavigate } from "react-router-dom"
import profileIcon from "../../../assets/user.png"
import cartIcon from "../../../assets/cart.png"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import ProfileInfo from "../../ProfileInfo/ProfileInfo"
import axios from "axios"
import { cleanUser } from "../../../store/UserSlice"
import { useDispatch } from "react-redux"
import { resetMainFilters } from "../../../store/MainFilters"
import { resetModerFilters } from "../../../store/AdminOrderFilters"

const NavMenu = () => {
  const [visible, SetVisible] = useState(false)
  const dispatch = useDispatch()
  const currentCart = useSelector((state: RootState) => state.user.current_cart)
  const user = useSelector((state: RootState) => state.user)
  const cartSize = useSelector((state: RootState) => state.cart.visas.length)
  const location = useLocation()
  const navigate = useNavigate()
  const logout = async () => {
    try {
      const response: Response = await axios(
        `http://localhost:8000/api/logout/`,
        {
          method: "POST",
          withCredentials: true,
          // headers: {
          //   Authorization: `Bearer ${cookies.get("access_token")}`,
          // },
        }
      )
      //   cookies.remove("access_token", { path: "/" });
      dispatch(cleanUser())
      dispatch(resetMainFilters())
      dispatch(resetModerFilters())
      //   toast.success("Выход выполнен успешно", {
      //     icon: "🚀",
      //   })

      navigate("/visas")
    } catch {
      console.log("kaka")
    }
  }
  const handleSubmit = async () => {
    await logout()
  }
  useEffect(() => {}, [user.current_cart])

  return (
    <div className="menu-wrapper">
      <Link to="/visas" className="menu-item">
        <span>Визы</span>
      </Link>
      {user.is_authenticated && (
        <Link to="/orders" className="menu-item">
          <span>История заявок</span>
        </Link>
      )}
      {user.is_authenticated &&
        !user.is_moderator &&
        location.pathname === "/visas" &&
        (user.current_cart !== null ? (
          <Link to={`/orders/${currentCart}`} className="menu-item">
            <div>
              <img src={cartIcon}></img>
            </div>
          </Link>
        ) : (
          <img src={cartIcon} style={{ opacity: "0.5" }}></img>
        ))}
      {user.is_authenticated && user.is_moderator && (
        <Link to="/visas_list" className="menu-item">
          <span>Управление</span>
        </Link>
      )}
      {user.is_authenticated ? (
        <div>
          <div style={{ fontSize: "20px" }}> {user.user_email}</div>
          <div
            style={{
              fontSize: "20px",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={handleSubmit}
          >
            Выйти
          </div>
        </div>
      ) : (
        <Link to="/auth">
          <span
            style={{
              color: "black",
              fontSize: "20px",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Авторизоваться
          </span>
        </Link>
      )}

      {/* <div
        onClick={() => {
          SetVisible(!visible)
        }}
      >
        <img src={profileIcon}></img>
        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 10 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="profileInfoContainer"
            >
              <ProfileInfo />
            </motion.div>
          )}
        </AnimatePresence>
      </div> */}
    </div>
  )
}

export default NavMenu

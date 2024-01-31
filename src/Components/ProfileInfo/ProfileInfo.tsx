import React from "react"
import { useDispatch, useSelector } from "react-redux"
// import styles from "./ProfileInfo.module.scss"
// import Cookies from "universal-cookie";
import { RootState } from "../../store/store" // Импортируйте тип RootState из вашего файла store
// import { Button } from "react-bootstrap";
// import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { cleanUser, updateUser } from "../../store/UserSlice"
import { toast } from "react-toastify"
import "./ProfileInfo.scss"
// const cookies = new Cookies();
const ProfileInfo = () => {
  const dispatch = useDispatch()
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

  const user = useSelector((state: RootState) => state.user)
  if (!user.is_authenticated) {
    return (
      <div className="menu">
        <span>Упс...Кажется, Вы забыли&nbsp;</span>
        <Link to="/auth">
          <span className="menu__login">авторизоваться</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="menu">
      <div>Логин: {user.user_name}</div>
      <div>Почта: {user.user_email}</div>
      <div className="menu__login" onClick={handleSubmit}>
        Выйти
      </div>
    </div>
  )
}

export default ProfileInfo

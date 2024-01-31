import React from "react"
import "./AuthPage.scss"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { Response } from "../../Types"
import Cookies from "universal-cookie"
import { updateUser } from "../../store/UserSlice"
import { useDispatch } from "react-redux"
import Button from "../../Components/Button/Button"
const cookies = new Cookies()

const AuthPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const login = async (formData: FormData) => {
    try {
      const response: Response = await axios(
        `http://localhost:8000/api/login/`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          data: formData as FormData,
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
      //   toast.success("Вы успешно авторизовались", {
      //     icon: "🚀",
      //   })
      navigate("/visas")
    } catch {
      toast.error("Проверьте введенные данных", {
        icon: "😕",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)

    await login(formData)
  }

  return (
    <div className="authform">
      <form className="authform__block" onSubmit={handleSubmit}>
        <h1>Авторизация</h1>
        <input
          className="authform__block_input"
          name="email"
          type="text"
          placeholder="Введите email..."
        ></input>
        <input
          className="authform__block_input"
          name="password"
          type="password"
          placeholder="Введите пароль..."
        ></input>

        <Button style={{ backgroundColor: "dodgerblue", color: "#fff" }}>
          Войти
        </Button>
        <span>
          Ещё нет аккаунта?&nbsp;
          <Link className="reglink" to={"/registration"}>
            Зарегистрируйтесь
          </Link>
        </span>
      </form>
    </div>
  )
}

export default AuthPage

import React from "react"
import { Link } from "react-router-dom"
import "./RegistrationPage.scss"
import axios from "axios"
import Button from "../../Components/Button/Button"

const RegistrationPage = () => {
  const register = async (formData: FormData) => {
    try {
      const response = await axios(`http://localhost:8000/api/register/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        data: formData as FormData,
      })

      if (response.status == 200) {
        // login(formData)
        console.log("20220202020")
        alert("УСПЕШНО")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData: FormData = new FormData(e.target as HTMLFormElement)
    await register(formData)
  }
  return (
    <div className="regform">
      <form className="regform__block" onSubmit={handleSubmit}>
        <h1>Регистрация</h1>
        <input
          className="regform__block_input"
          name="name"
          type="text"
          placeholder="Введите ФИО..."
        ></input>
        <input
          className="regform__block_input"
          name="email"
          type="text"
          placeholder="Введите email..."
        ></input>
        <input
          className="regform__block_input"
          name="password"
          type="password"
          placeholder="Введите пароль..."
        ></input>

        <Button style={{ backgroundColor: "dodgerblue", color: "#fff" }}>
          Зарегистрироваться
        </Button>
        <span>
          <Link className="authlink" to={"/auth"}>
            Авторизируйтесь
          </Link>{" "}
          если у Вас уже есть аккаунт
        </span>
      </form>
    </div>
  )
}

export default RegistrationPage

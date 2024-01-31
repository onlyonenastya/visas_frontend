import React, { useEffect, useState } from "react"
// import btnMinus from "../../assets/icons/btn_minus.svg"
// import btnPlus from "../../assets/icons/btn_plus.svg"
import btnDel from "../../assets/dustbin.png"
// import mock from "../../assets/icons/user.svg"
import { useDispatch, useSelector } from "react-redux"
// import from "./CartItem.module.scss"
// import Cookies from "universal-cookie"
import { Visa } from "../../Types"
import axios from "axios"
import { RootState } from "../../store/store"
import "./CartItem.scss"
import { removeItem } from "../../store/CartSlice"

// const cookies = new Cookies()
type item = {
  id: number
  isEnable: boolean
}
const CartItem: React.FC<item> = ({ id, isEnable }) => {
  const user = useSelector((state: RootState) => state.user)
  const cart = useSelector((state: RootState) => state.cart.visas)
  const dispatch = useDispatch()

  const [item, setItem] = useState<Visa>({
    id: 0,
    name: "",
    description: "",
    status: 0,
    image: "",
    country: "",
    price: 0,
    duration: 0,
  })
  const getItem = async () => {
    try {
      const responce = await axios(`http://localhost:8000/api/visas/${id}/`, {
        method: "GET",
        // withCredentials: true,
        // headers: {
        //   "Content-type": "application/json; charset=UTF-8",
        //   // Authorization: `Bearer ${cookies.get("access_token")}`,
        // },
      })
      setItem(responce.data)
    } catch (error) {
      //   setMock(true)
      //   let filteredGroups: cardInfoProps | undefined = OptionsMock.find(
      //     (group) => group.id == parseInt(id)
      //   )
      //   setInfo(filteredGroups)
      //   console.log("Ошибка при выполнении запроса:", error)
    }
  }
  const removeVisa = async () => {
    try {
      const responce = await axios(
        `http://localhost:8000/api/orders/${user.current_cart}/delete_visa/${id}/`,
        {
          method: "DELETE",
          // withCredentials: true,
          // headers: {
          //   "Content-type": "application/json; charset=UTF-8",
          //   // Authorization: `Bearer ${cookies.get("access_token")}`,
          // },
        }
      )
      setItem(responce.data)
      dispatch(removeItem(id))
      // setItem((prevCartItems) =>
      //   prevCartItems.filter((item) => item.id !== itemId)
      // )
      // console.log(cartItems)
      // dispatch(setCart(cartItems))
    } catch (error) {
      //   setMock(true)
      //   let filteredGroups: cardInfoProps | undefined = OptionsMock.find(
      //     (group) => group.id == parseInt(id)
      //   )
      //   setInfo(filteredGroups)
      //   console.log("Ошибка при выполнении запроса:", error)
    }
  }

  useEffect(() => {
    getItem()
  }, [])

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img src={item.image} alt="option" />
      </div>
      <div className="cart__item-info">
        <h3>{item.name}</h3>
        <p>{item.country}</p>
      </div>
      <div className="cart__item-description">
        <b>{item.description}</b>
      </div>
      <div className="cart__item-price">
        <b>{item.price} ₽</b>
      </div>
      {isEnable && (
        <div onClick={removeVisa} className="cart__item-remove">
          <img src={btnDel}></img>
        </div>
      )}
    </div>
  )
}

export default CartItem

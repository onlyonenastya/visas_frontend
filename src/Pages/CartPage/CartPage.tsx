import React, { useEffect, useState } from "react"
import CartItem from "../../Components/CartItem/CartItem"
import { Response } from "../../Types"
import Cookies from "universal-cookie"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"

// const cookies = new Cookies()
import { Visa } from "../../Types"

import "./CartPage.scss"
import { Link, useNavigate, useParams } from "react-router-dom"
import { RootState } from "../../store/store"
// import { updateCart } from "../../store/userSlice"
import { toast } from "react-toastify"
import Button from "../../Components/Button/Button"
import { updateCart } from "../../store/UserSlice"
// import { setCart } from "../../store/cartSlice"

const CartPage = () => {
  const [cartItems, setCartItems] = useState<number[]>([])
  const [isCartMatched, setIsCartMatched] = useState<boolean>(true)
  const { id } = useParams<{ id: string }>() as { id: string }
  const currentCart = useSelector((state: RootState) => state.user.current_cart)
  // const currentCartItems = useSelector((state: RootState) => state.cart.id)
  useEffect(() => {
    console.log(id)
    console.log(currentCart)

    setIsCartMatched(currentCart == Number(id))
  }, [])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const cartApplication = useSelector(
  //   (state: RootState) => state.user.current_cart
  // )

  const fetchCartData = async () => {
    try {
      const url = isCartMatched
        ? `http://127.0.0.1:8000/api/orders/${currentCart}/`
        : `http://127.0.0.1:8000/api/orders/${id}/`

      const response: Response = await axios(url, {
        method: "GET",
        withCredentials: true,
      })

      console.log(response.data)
      setCartItems(response.data.visas)
      // dispatch(setCartIds)
    } catch (e) {
      console.log(e)
    }
  }
  const cart = useSelector((state: RootState) => state.cart.visas)

  const formApplication = async (status_id: number) => {
    try {
      const updatedData = {
        status: status_id,
      }

      const response: Response = await axios(
        `http://localhost:8000/api/orders/${currentCart}/update_status_user/`,
        {
          method: "PUT",
          data: updatedData,
          withCredentials: false,
        }
      )

      dispatch(updateCart(null))
      navigate("/visas")
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchCartData()
  }, [isCartMatched, cart.length])

  if (isCartMatched) {
    return (
      <div className="cart">
        <div className="cart__header">
          <div className="cart__header_title">Корзина</div>
          <Button
            style={{ backgroundColor: "dodgerblue", color: "#fff" }}
            className="eee"
            onClick={() => formApplication(5)}
          >
            Очистить корзину
          </Button>
        </div>
        <div className="cart__content">
          {cartItems.map((option) => (
            <CartItem
              isEnable={true}
              id={option}
              // onDelete={deleteItem}
              // updateAllow={true}
            />
          ))}
        </div>
        <div className="cart__actions">
          <Link to="/orders">
            <Button
              style={{ backgroundColor: "dodgerblue", color: "#fff" }}
              className="cart__actions_back"
            >
              Назад
            </Button>
          </Link>

          <Button
            style={{ backgroundColor: "dodgerblue", color: "#fff" }}
            onClick={() => formApplication(2)}
            className="cart__actions_send"
          >
            Отправить заявку
          </Button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="cart">
        <div className="cart__header">
          <div className="cart__header_title">Заявка №{id}</div>
        </div>
        <div className="cart__content">
          {cartItems.map((option) => (
            <CartItem
              isEnable={false}
              id={option}
              // onDelete={deleteItem}
              // updateAllow={false}
            />
          ))}
        </div>
        <div className="cart__actions">
          <Link to="/orders">
            <Button className="cart__actions_back">Назад</Button>
          </Link>
        </div>
      </div>
    )
  }
}

export default CartPage

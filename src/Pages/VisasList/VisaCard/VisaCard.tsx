import "./VisaCard.sass"
import { Visa } from "../../../Types"
import { Link } from "react-router-dom"
import mockImage from "/src/assets/mock.png"
import axios from "axios"
import { useDispatch } from "react-redux"
import { updateCart } from "../../../store/UserSlice"
import { Response } from "../../../Types"
import { setCart } from "../../../store/CartSlice"

const VisaCard = ({
  visa,
  isMock,
  onAddClick,
}: {
  visa: Visa
  isMock: boolean
  onAddClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}) => {
  const dispatch = useDispatch()

  // const addOptionToOrder = async () => {
  //   try {
  //     const response: Response = await axios(
  //       `http://localhost:8000/api/visas/${visa.id}/add_to_order/`,
  //       {
  //         method: "POST",
  //         withCredentials: true,
  //       }
  //     )
  //     console.log(response)
  //     dispatch(updateCart(response.data.order.id))
  //     dispatch(setCart(response.data.visa))
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // const handleButtonAdd = () => {
  //   addOptionToOrder()
  // }

  return (
    <div className="card-wrapper">
      <div className="preview">
        <img src={isMock ? mockImage : visa.image} alt="" />
      </div>

      <div className="card-content">
        <div className="content-top">
          <h3 className="title"> {visa.name} </h3>
        </div>

        <div className="content-bottom">
          <div>
            <Link to={`/visas/${visa.id}`}>Подробнее</Link>
          </div>

          <button onClick={onAddClick}>В корзину</button>
        </div>
      </div>
    </div>
  )
}

export default VisaCard

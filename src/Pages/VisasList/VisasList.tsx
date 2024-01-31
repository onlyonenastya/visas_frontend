import "./VisasList.sass"
import SearchBar from "../../Components/SearchBar/SearchBar"
import { useEffect, useState } from "react"
import VisaCard from "./VisaCard/VisaCard"
import { iVisasMock, requestTime } from "../../Consts"
import { Visa } from "../../Types"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { updateCart } from "../../store/UserSlice"
import { RootState } from "../../store/store"
import { setInputValue } from "../../store/MainFilters"
import { Response } from "../../Types"
import { setCart } from "../../store/CartSlice"
import { FaSearch } from "react-icons/fa"

const VisasList = () => {
  const dispatch = useDispatch()
  const [visas, setVisas] = useState<Visa[]>([])

  // const [query, setQuery] = useState<string>("")

  const [isMock, setIsMock] = useState<boolean>(false)
  const search_value = useSelector(
    (state: RootState) => state.filter.input_value
  )

  const searchVisas = async () => {
    try {
      const response = await axios(
        `http://localhost:8000/api/visas/search/?&query=${search_value}`,
        {
          //   timeout: requestTime,
          method: "GET",
          withCredentials: true,
        }
      )
      console.log(response.data)
      dispatch(updateCart(response.data.draft_order))

      if (response.status !== 200) {
        createMock()
        return
      }

      const visas: Visa[] = response.data["visas"]
      setVisas(visas)
      setIsMock(false)
    } catch (e) {
      createMock()
    }
  }

  const addOptionToOrder = async (id: number) => {
    try {
      const response: Response = await axios(
        `http://localhost:8000/api/visas/${id}/add_to_order/`,
        {
          method: "POST",
          withCredentials: true,
        }
      )
      console.log(response)
      dispatch(updateCart(response.data.order.id))
      dispatch(setCart(response.data.visa))
      searchVisas()
    } catch (e) {
      console.log(e)
    }
  }

  const createMock = () => {
    setIsMock(true)
    setVisas(iVisasMock)
  }

  useEffect(() => {
    searchVisas()
  }, [])

  const cardAddButtonClick = (
    id: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation()
    e.preventDefault()
    addOptionToOrder(id)
    // setTimeout(() => {
    //   fetchCart()
    // }, 200)
  }

  const cards = visas.map((visa) => (
    <VisaCard
      visa={visa}
      key={visa.id}
      isMock={isMock}
      onAddClick={(e: React.MouseEvent<HTMLButtonElement>) =>
        cardAddButtonClick(visa.id, e)
      }
    />
  ))

  return (
    <div className="cards-list-wrapper">
      <div className="top">
        <h2>Поиск виз</h2>
        <div style={{ display: "flex", gap: "30px" }}>
          <SearchBar
            search_button={true}
            query={search_value}
            setQuery={(i) => dispatch(setInputValue(i))}
          />
          <button
            onClick={searchVisas}
            style={{
              backgroundColor: "dodgerblue",
              padding: "0px 14px",
              borderRadius: "5px",
              border: "none",
            }}
          >
            <FaSearch />
          </button>
        </div>
      </div>

      <div className="bottom">{cards}</div>
    </div>
  )
}

export default VisasList

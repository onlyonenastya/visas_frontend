import React, { useEffect, useState } from "react"
import { useTable, Column } from "react-table"
import axios from "axios"
import { Order, Response } from "../../Types"
import { useDispatch, useSelector } from "react-redux"
import "./OrdersList.scss"
import Cookies from "universal-cookie"
import { Link } from "react-router-dom"
// import Button from "../Button/Button"
import { RootState } from "../../store/store"
// import Option from "../../types"
import tick from "../../assets/approve.png"
import close from "../../assets/reject.png"
import { Option } from "../../Types"
import moment from "moment"
import SearchBar from "../../Components/SearchBar/SearchBar"
import {
  setAppDropdownValueId,
  setAppDropdownValueName,
  setAppEndDate,
  setAppInputValue,
  setAppStartDate,
} from "../../store/AdminOrderFilters"
import { STATUSES } from "../../Consts"
// import DropDown from "../DropDown"
import DropDown from "../DropDown/DropDown"

const cookies = new Cookies()
// interface DateRangeInterface {
//   selection: {
//     startDate: Date
//     endDate: Date
//   }
// }
const ApplicationsHistoryTable = () => {
  const [application, setApplication] = useState<Order[]>([])

  // const [startDate, setStartDate] = useState("")
  // const [endDate, setEndDate] = useState("")

  const dispatch = useDispatch()

  const isModerator = useSelector((state: RootState) => state.user.is_moderator)

  const categoryValue = useSelector(
    (state: RootState) => state.moderApp.dropdown_value
  )
  const inputValue = useSelector(
    (state: RootState) => state.moderApp.input_value
  )
  const startDay = useSelector(
    (state: RootState) => state.moderApp.date_value.start_date
  )
  const endDay = useSelector(
    (state: RootState) => state.moderApp.date_value.end_date
  )

  useEffect(() => {}, [isModerator])

  const fetchOrdersData = async () => {
    try {
      const params = `?start_day=${startDay}&end_day=${endDay}&category=${encodeURIComponent(
        categoryValue.id
      )}`

      axios.defaults.withCredentials = true
      const response: Response = await axios(
        `http://localhost:8000/api/orders/${params}`,
        {
          method: "GET",
          withCredentials: true,
        }
      )
      if (response.status == 200) {
        const sortedApplications = response.data.sort(
          (a: { date_created: Date }, b: { date_created: Date }) => {
            const dateA = new Date(a.date_created).getTime()
            const dateB = new Date(b.date_created).getTime()
            return dateB - dateA
          }
        )
        console.log(response.data)
        setApplication(sortedApplications)
      }
      setApplication(response.data)
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  const handleSelect = (selectedOption: Option) => {
    dispatch(setAppDropdownValueName(selectedOption.name))
    dispatch(setAppDropdownValueId(selectedOption.id))
  }

  const formApplication = async (order_id: number, status_id: number) => {
    try {
      const updatedData = {
        status: status_id,
      }

      const response: Response = await axios(
        `http://localhost:8000/api/orders/${order_id}/update_status_admin/`,
        {
          method: "PUT",
          data: updatedData,
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
          },
        }
      )

      // toast.success("Заказ оформлен", {
      //   icon: "🚀",
      // })
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }

  const columns: Array<Column<{}>> = React.useMemo(
    () => [
      {
        Header: "№",
        accessor: "id",
      },
      {
        Header: "Статус",
        accessor: "status",
        Cell: ({ value }) => {
          let statusText = ""
          switch (value) {
            case 1:
              statusText = "Зарегистрирован"
              break
            case 2:
              statusText = "Проверяется"
              break
            case 3:
              statusText = "Принято"
              break
            case 4:
              statusText = "Отказано"
              break
            case 5:
              statusText = "Удалено"
              break
            default:
              statusText = ""
          }
          return <span>{statusText}</span>
        },
      },
      {
        Header: "Дата создания",
        accessor: "date_created",
        Cell: ({ value }) => (
          <span>
            {value ? moment(value).format("DD.MM.YYYY") : "пока пусто"}
          </span>
        ),
      },
      {
        Header: "Дата формирования",
        accessor: "date_of_formation",
        Cell: ({ value }) => (
          <span>
            {value ? moment(value).format("DD.MM.YYYY") : "пока пусто"}
          </span>
        ),
      },
      {
        Header: "Дата завершения",
        accessor: "date_complete",
        Cell: ({ value }) => (
          <span>
            {value ? moment(value).format("DD.MM.YYYY") : "пока пусто"}
          </span>
        ),
      },
      {
        Header: "Заказчик",
        accessor: "user.email",
      },
      {
        Header: "Проверка",
        accessor: "violation",
      },
      {
        Header: "Информация",
        Cell: ({ cell }) => (
          <Link
            style={{
              textDecoration: "underline",
              color: "black",
            }}
            to={`/orders/${cell.row.values.id}`}
          >
            Подробнее&gt;
          </Link>
        ),
      },
      {
        Header: "Действие",
        accessor: "action",
        Cell: ({ row }) => (
          <div className="moder_action">
            {row.values.status === 2 ? (
              <>
                <img
                  onClick={() => formApplication(row.values.id, 3)}
                  className="moder_action__button"
                  src={tick}
                ></img>
                <img
                  onClick={() => formApplication(row.values.id, 4)}
                  className="moder_action__button"
                  src={close}
                ></img>
              </>
            ) : null}
          </div>
        ),
      },
    ],
    []
  )

  const initialState = {
    hiddenColumns: isModerator
      ? [""]
      : ["user.email", "action", "delivery_date"],
  }
  useEffect(() => {
    // fetchOrdersData()
    const intervalId = setInterval(() => {
      fetchOrdersData()
    }, 1000)
    return () => clearInterval(intervalId)
  }, [categoryValue, endDay, startDay])

  const data = application.filter((item) =>
    item.user.email.toString().toLowerCase().includes(inputValue.toLowerCase())
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data, initialState })

  return (
    <div className="page-inner">
      {isModerator && (
        <div className="filters">
          <SearchBar
            placeholder="Поиск по заказчику..."
            query={inputValue}
            setQuery={(i) => dispatch(setAppInputValue(i))}
            search_button={true}
          />
          <DropDown
            handleSelect={handleSelect}
            options={STATUSES}
            title={categoryValue.name}
          />
          <div style={{ fontSize: "30px" }}>с</div>
          <SearchBar
            isDate={true}
            placeholder="DD-MM-YYYY"
            query={startDay}
            setQuery={(i) => dispatch(setAppStartDate(i))}
          />
          <div style={{ fontSize: "30px" }}>по</div>
          <SearchBar
            isDate={true}
            placeholder="DD-MM-YYYY"
            query={endDay}
            setQuery={(i) => dispatch(setAppEndDate(i))}
          />
          {/* <DateRangePicker
            // locale={ru}
            showDateDisplay={false}
            className={styles.date}
            rangeColors={["#33cccc", "#3ecf8e", "#fed14c"]}
            ranges={[selectionRange]}
            onChange={handleSelectDateRange}
          /> */}
        </div>
      )}
      <div className="content">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ApplicationsHistoryTable

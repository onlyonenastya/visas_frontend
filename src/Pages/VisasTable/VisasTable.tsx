import React from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useTable, Column } from "react-table"
import { Visa } from "../../Types"
import { Response } from "../../Types"
import "./VisasTable.scss"
import Button from "../../Components/Button/Button"
import deleteIcom from "../../assets/delete.png"
import addIcon from "../../assets/add.png"
import editIcon from "../../assets/edit.png"
import { Link } from "react-router-dom"

const VisasTable = () => {
  const [options, setOptions] = useState<Visa[]>([])

  const fetchOptions = async () => {
    try {
      axios.defaults.withCredentials = true
      const all = {
        status: 3,
      }

      const response: Response = await axios(
        `http://localhost:8000/api/visas/search/?status=3`,
        {
          method: "GET",
          data: all,
          //   credentials: 'include',
          withCredentials: true,
        }
      )
      if (response.status == 200) {
        setOptions(response.data.visas)
      }
      console.log(response.data.visas)
    } catch (e) {
      console.log(e)
    }
  }

  const changeStatus = async (id: number, action: number) => {
    try {
      const url =
        action == 1
          ? `http://127.0.0.1:8000/api/visas/${id}/delete/`
          : `http://127.0.0.1:8000/api/visas/${id}/update/`

      const method = action == 1 ? "DELETE" : "PUT"
      const updatedData = {
        status: 1,
      }
      const response: Response = await axios(url, {
        method: method,
        withCredentials: true,
        data: updatedData,
        // headers: {
        //   "Content-type": "application/json; charset=UTF-8",
        //   Authorization: `Bearer ${cookies.get("access_token")}`,
        // },
      })

      console.log(response.data)
      fetchOptions()
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
        Header: "Название",
        accessor: "name",
      },
      //   {
      //     Header: "Описание",
      //     accessor: "description",
      //   },
      {
        Header: "Страна",
        accessor: "country",
      },
      {
        Header: "Длительность",
        accessor: "duration",
        Cell: ({ value }) => {
          return <span>{value} лет</span>
        },
      },
      {
        Header: "Стоимость",
        accessor: "price",
        Cell: ({ value }) => {
          return <span>{value} ₽</span>
        },
      },
      {
        Header: "Статус",
        accessor: "status",
        Cell: ({ value }) => {
          let status = ""
          value == true ? (status = "В наличии") : (status = "Нет в наличии")
          return <span>{status}</span>
        },
      },
      {
        Header: "Действие",
        accessor: "action",
        Cell: ({ row }) => (
          <div className="moder_action">
            <>
              <Link
                to={`/visas_list/${row.values.id}`}
                // to={`/visas`}
              >
                <img className="moder_action__button" src={editIcon}></img>
              </Link>

              <img
                onClick={() => changeStatus(row.values.id, row.values.status)}
                className="moder_action__button"
                src={row.values.status === 1 ? deleteIcom : addIcon}
              ></img>
            </>
          </div>
        ),
      },
      {
        Header: "Изображение",
        accessor: "image",
        Cell: ({ value }) => {
          return <img style={{ width: 100 }} alt="aaa" src={value}></img>
        },
      },
    ],
    []
  )
  useEffect(() => {
    fetchOptions()
  }, [])

  const data = options

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data })

  return (
    <div className="page-inner">
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
      <div className="addbutton">
        <Link to={`/visas_list/0`}>
          <Button style={{ backgroundColor: "dodgerblue", color: "#fff" }}>
            Добавить новую опцию
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default VisasTable

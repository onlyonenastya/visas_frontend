import React, { useEffect, useState } from "react"
import DropDown from "../DropDown/DropDown"
import Button from "../../Components/Button/Button"
import { STATUSES } from "../../Consts"
import "./VisaEditPage.scss"
import SearchBar from "../../Components/SearchBar/SearchBar"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { Response } from "../../Types"

const VisaEditPage = () => {
  const [name, setName] = useState<string>("")
  const [price, setPrice] = useState<string>("")
  const [duration, setDuration] = useState<string>("")
  const [country, setCountry] = useState<string>(" ")
  const [description, setDescription] = useState<string>(" ")
  const { id } = useParams<{ id: string }>() as { id: string }
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState<File>()

  const fetchVisa = async () => {
    try {
      //   axios.defaults.withCredentials = true
      const response: Response = await axios(
        `http://localhost:8000/api/visas/${id}/`,
        {
          method: "GET",
          //   credentials: 'include',
          withCredentials: true,
        }
      )
      if (response.status == 200) {
        setName(response.data.name)
        setPrice(response.data.price)
        setDuration(response.data.duration)
        setCountry(response.data.country)
        setDescription(response.data.description)
      }
      console.log(response.data.visas)
    } catch (e) {
      console.log(e)
    }
  }

  const postVisa = async (formData: FormData) => {
    try {
      const url =
        Number(id) != 0
          ? `http://127.0.0.1:8000/api/visas/${id}/update/`
          : `http://127.0.0.1:8000/api/visas/create/`
      const response: Response = await axios(url, {
        method: Number(id) != 0 ? "PUT" : "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        data: formData as FormData,
      })
      //   toast.success("Опция успешно добавлена.", {
      //     icon: "🚀",
      //   })
      console.log(response.data.id)

      navigate("/visas_list")
      return response.data.id
    } catch {
      //   toast.error("Проверьте введенные данные", {
      //     icon: "😕",
      //   })
    }
  }

  const postVisaImage = async (file: File, visaId: number) => {
    try {
      const formData = new FormData()
      formData.append("file", file)
      const response: Response = await axios(
        `http://127.0.0.1:8000/api/visas/${visaId}/post_image/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData as FormData,
        }
      )
      console.log(response)
      //   toast.success("Изображение успешно добавлено", {
      //     icon: "🚀",
      //   })
      // navigate("/planesDevelopment_frontend/options-list")
    } catch {}
  }

  useEffect(() => {
    if (Number(id) != 0) {
      fetchVisa()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData: FormData = new FormData(e.target as HTMLFormElement)
    if (selectedFile) {
      formData.append("file", selectedFile)
    }
    const visaId = await postVisa(formData)
    await postVisaImage(selectedFile, visaId)
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0])
    }
  }

  return (
    <div className="edit-form">
      <form className="edit-form__block" onSubmit={handleSubmit}>
        <div className="edit-form__block_text">
          <h1>Внесние новой опции</h1>
          <div className="edit-form__block_input-form">
            <div className="edit-form__block_input-title">
              Укажите название визы:
            </div>
            <SearchBar
              name="name"
              query={name}
              setQuery={setName}
              placeholder="Название опции..."
            ></SearchBar>
          </div>
          <div className="edit-form__block_input-form">
            <div className="edit-form__block_input-title">
              Укажите стоимость визы:
            </div>
            <SearchBar
              query={price}
              setQuery={setPrice}
              name="price"
              placeholder="Введите стоимость..."
            ></SearchBar>
          </div>
          <div className="edit-form__block_input-form">
            <div className="edit-form__block_input-title">
              Укажите длительность визы:
            </div>
            <SearchBar
              query={duration}
              setQuery={setDuration}
              name="duration"
              placeholder="Введите стоимость..."
            ></SearchBar>
          </div>
          <div className="edit-form__block_input-form">
            <div className="edit-form__block_input-title">
              Укажите страну визы:
            </div>
            <SearchBar
              query={country}
              setQuery={setCountry}
              name="country"
              placeholder="Введите стоимость..."
            ></SearchBar>
          </div>
          <div className="edit-form__block_input-form">
            <div className="edit-form__block_input-title">
              Укажите описание визы:
            </div>
            <SearchBar
              query={description}
              setQuery={setDescription}
              name="description"
              placeholder="Введите стоимость..."
            ></SearchBar>
          </div>
          <div className="edit-form__block_input-form">
            <div className="edit-form__block_input-title">
              Приврепите изображение:
            </div>
            <input type="file" onChange={handleFileChange} />
          </div>

          <Button style={{ backgroundColor: "dodgerblue", color: "#fff" }}>
            Добавить
          </Button>
        </div>
      </form>
    </div>
  )
}

export default VisaEditPage

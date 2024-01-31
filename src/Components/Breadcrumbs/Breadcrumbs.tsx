import "./Breadcrumbs.sass"
import { Link, useLocation } from "react-router-dom"
import { FaChevronRight } from "react-icons/fa6"
import { FaHome } from "react-icons/fa"

const Breadcrumbs = ({}) => {
  const location = useLocation()

  let currentLink = ""

  // const topics: Record<string, string> = {
  //   visas: "Визы",
  //   profile: "Личный кабинет",
  //   registration: "Регистрация",
  //   auth: "Авторизация",
  //   history: "История заявок",
  //   cart: "Заявка",
  //   visas_list: "Список виз",
  //   orders: "Заявка",
  // }

  // const resetSelectedVisa = () => setSelectedVisa(undefined)

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`

      if (crumb == "history") crumb = "История заявок"
      if (crumb == "visas") crumb = "Визы"
      if (crumb == "cart") crumb = "Корзина"
      if (crumb == "auth") crumb = "Авторизация"
      if (crumb == "visas_list") crumb = "Редактирование виз"
      if (crumb == "registration") crumb = "Регистрация"
      if (crumb == "orders") crumb = "Заявки"
      // if (crumb == "visas_list") crumb = "Список виз"

      return (
        <div className={"crumb"} key={crumb}>
          <Link to={currentLink}>{crumb}</Link>
          <FaChevronRight className={"chevron-icon"} />
        </div>
      )

      // if (currentLink.match(new RegExp("visas/(d*)"))) {
      //   return (
      //     <div className={"crumb"} key={crumb}>
      //       <Link to={currentLink}>{selectedVisa?.name}</Link>

      //       <FaChevronRight className={"chevron-icon"} />
      //     </div>
      //   )
      // }
    })

  return (
    <div className="breadcrumbs-wrapper">
      <div className="breadcrumbs">
        <div className="crumb">
          <Link to={"/services"}>
            <FaHome className="home-icon" />
          </Link>

          <FaChevronRight className="chevron-icon" />
        </div>

        {crumbs}
      </div>
    </div>
  )
}

export default Breadcrumbs

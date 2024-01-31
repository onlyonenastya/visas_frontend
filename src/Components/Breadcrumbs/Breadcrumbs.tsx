import "./Breadcrumbs.sass"
import { Link, useLocation } from "react-router-dom";
import {FaChevronRight} from "react-icons/fa6";
import {FaHome} from "react-icons/fa";

const Breadcrumbs = ({ selectedVisa, setSelectedVisa }) => {

    const location = useLocation()

    let currentLink = ''

    const topics: Record<string, string> = {
        "visas": "Визы",
        "profile": "Личный кабинет"
    }

    const resetSelectedVisa = () => setSelectedVisa(undefined)

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`

        if (Object.keys(topics).find(x => x == crumb))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink} onClick={resetSelectedVisa}>
                        { (topics as never)[crumb] }
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (currentLink.match(new RegExp('visas/(d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        { selectedVisa?.name }
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }
    });

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

export default Breadcrumbs;
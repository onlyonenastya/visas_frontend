import "./VisaCard.sass"
import {Visa} from "../../../Types";
import {Link} from "react-router-dom";
import mockImage from "/src/assets/mock.png"

const VisaCard = ({ visa, isMock }: {visa:Visa, isMock:boolean }) => {

    const img = `http://127.0.0.1:8000/api/visas/${visa.id}/image/`

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={isMock ? mockImage : img}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {visa.name} </h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/visas/${visa.id}`}>
                        Подробнее
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default VisaCard;
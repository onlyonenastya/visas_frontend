import "./VisaPage.sass"
import {Dispatch, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {iVisasMock, requestTime} from "../../Consts";
import {Visa} from "../../Types";
import mockImage from "/src/assets/mock.png"

const VisaPage = ({ selectedVisa, setSelectedVisa }: { selectedVisa:Visa | undefined, setSelectedVisa: Dispatch<Visa| undefined>}) => {

    const { id } = useParams<{id: string}>();

    const [isMock, setIsMock] = useState<boolean>(false);

    useEffect(() => {
        fetchData()
    }, [])

    if (id == undefined){
        return;
    }

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/visas/${id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok)
            {
                CreateMock()
                return;
            }

            const service: Visa = await response.json()

            setSelectedVisa(service)

            setIsMock(false)
        } catch
        {
            CreateMock()
        }

    };

    const CreateMock = () => {
        setSelectedVisa(iVisasMock.find((service:Visa) => service?.id == parseInt(id)))
        setIsMock(true)
    }

    const img = `http://127.0.0.1:8000/api/visas/${id}/image/`



    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={isMock ? mockImage : img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2 className="name">{selectedVisa?.name}</h2>

                    <br />

                    <span>{selectedVisa?.description}</span>

                    <br />

                    <span>Страны: {selectedVisa?.country}</span>

                    <br />

                    <span>Цена: {selectedVisa?.price} рублей</span>

                    <br />

                    <span>Срок действия: {selectedVisa?.duration} лет</span>

                </div>

            </div>

        </div>
    )
}

export default VisaPage;
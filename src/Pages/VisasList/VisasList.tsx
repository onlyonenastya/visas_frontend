import "./VisasList.sass"
import SearchBar from "../../Components/SearchBar/SearchBar";
import {useEffect, useState} from "react";
import VisaCard from "./VisaCard/VisaCard";
import {iVisasMock, requestTime} from "../../Consts";
import {Visa} from "../../Types";

const VisasList = () => {

    const [visas, setVisas] = useState<Visa[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchVisas = async () => {

        try {

            const response = await fetch(`http://localhost:8000/api/visas/search?&query=${query}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const visas: Visa[] = await response.json()

            setVisas(visas["visas"])
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        setIsMock(true);
        setVisas(iVisasMock)

    }

    useEffect(() => {
        searchVisas()
    }, [query])

    const cards = visas.map(visa  => (
        <VisaCard visa={visa} key={visa.id} isMock={isMock}/>
    ))

    return (
        <div className="cards-list-wrapper">

            <div className="top">

                <h2>Поиск виз</h2>

                <SearchBar query={query} setQuery={setQuery} />

            </div>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default VisasList;
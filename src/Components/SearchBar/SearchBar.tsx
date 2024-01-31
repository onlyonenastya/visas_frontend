import "./SearchBar.sass"
import {FaSearch} from "react-icons/fa";

const SearchBar = ({ query, setQuery }) => {

    const handleChange = (value: string) => {
        setQuery(value)
    }

    return (
        <form className="search-bar-wrapper" action="/api/visas/search" method="GET" onSubmit={(e) => e.preventDefault()} >

            <input
                type="text"
                placeholder="Поиск..."
                name="name"
                autoComplete="off"
                value={query}
                onChange={(e) => handleChange(e.target.value)}
            />

            <button type="submit">
                <FaSearch className={"search-icon"}/>
            </button>

        </form>
    )
}

export default SearchBar;
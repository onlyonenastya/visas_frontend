import "./SearchBar.sass"
import { FaSearch } from "react-icons/fa"
interface SearchBarProps {
  query: string | number
  setQuery: (value: string) => void
  placeholder?: string
  search_button?: boolean
  isDate?: true
  name?: string
}
const SearchBar: React.FC<SearchBarProps> = ({
  query,
  setQuery,
  placeholder,
  search_button,
  isDate,
  name,
}) => {
  const handleChange = (value: string) => {
    setQuery(value)
  }

  return (
    <>
      {/* <form
      className="search-bar-wrapper"
      action="/api/visas/search"
      method="GET"
      onSubmit={(e) => e.preventDefault()}
    > */}
      <input
        className="search-bar-wrapper"
        type={isDate ? "date" : "text"}
        placeholder={placeholder ? placeholder : "Поиск..."}
        name={name ? name : "name"}
        autoComplete="off"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
      />
      {/* {search_button && (
        <button type="submit">
          <FaSearch className={"search-icon"} />
        </button>
      )} */}
      {/* </form> */}
    </>
  )
}

export default SearchBar

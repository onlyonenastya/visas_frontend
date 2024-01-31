import { Dropdown } from "react-bootstrap"
import { useDispatch } from "react-redux"
import styles from "./DropDown.scss"
// import {
//   setDropdownValueId,
//   setDropdownValueName,
// } from "../../store/filtersSlices"
import { Option } from "../../Types"

export type DropDownProps = {
  options: Option[]
  title: string
  handleSelect: (value: Option) => void
}

const DropDown: React.FC<DropDownProps> = ({
  options,
  title,
  handleSelect,
}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle>{title}</Dropdown.Toggle>

      <Dropdown.Menu>
        {options.map((option) => (
          <Dropdown.Item onClick={() => handleSelect(option)} key={option.id}>
            {option.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropDown

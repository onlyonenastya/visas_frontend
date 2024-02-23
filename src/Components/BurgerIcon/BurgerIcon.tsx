import * as React from "react"

const BurgerIcon: React.FC = ({}) => {
  let classes = `icon_wrapper`
  return (
    <svg viewBox="0 0 24 24" className={classes}>
      <path
        d="M3 19L25 19"
        stroke="dodgerblue"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3 12L25 12"
        stroke="dodgerblue"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3 5L25 5"
        stroke="dodgerblue"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
export default BurgerIcon

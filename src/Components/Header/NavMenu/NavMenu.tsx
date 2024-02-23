import BurgerIcon from "../../BurgerIcon/BurgerIcon"
// import "./NavMenu.sass"
import { Link } from "react-router-dom"
import styles from "./NavMenu.module.scss"
import { useEffect, useRef, useState } from "react"

const NavMenu = () => {
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsBurgerMenuOpened(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [])
  return (
    <div className={styles["menu-wrapper"]}>
      <Link to="/visas" className={styles["menu-item"]}>
        <span>Визы</span>
      </Link>

      <Link to="/profile" className={styles["menu-item"]}>
        <span>Личный кабинет</span>
      </Link>
      {isBurgerMenuOpened === false ? (
        <div
          onClick={() => setIsBurgerMenuOpened(true)}
          className={styles["burger-icon"]}
        >
          <BurgerIcon />
        </div>
      ) : (
        <div
          className={styles.cancel__icon}
          onClick={() => setIsBurgerMenuOpened(false)}
        ></div>
      )}

      {isBurgerMenuOpened && (
        <div ref={menuRef} className={styles.burger__menu}>
          {
            <Link
              onClick={() => {
                setIsBurgerMenuOpened(false)
              }}
              to="/visas"
            >
              Визы
            </Link>
          }
          {
            <Link
              to="/profile"
              onClick={() => {
                setIsBurgerMenuOpened(false)
              }}
            >
              Войти
            </Link>
          }
        </div>
      )}
    </div>
  )
}

export default NavMenu

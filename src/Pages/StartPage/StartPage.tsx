import React from "react"
import styles from "./StartPage.module.scss"
import Evc from "../../assets/evc.jpg"
import { Link } from "react-router-dom"

const StartPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.page__info}>
        <h1 className={styles.page__info_title}>Путешествуйте свободно</h1>
        <h3 className={styles.page__info_content}>
          Мы поможем Вам в оформлении виз и страховки, чтобы Ваше путешествие
          стало еще комфортнее. Мы предлагаем полный спектр услуг для удобства
          ваших путешествий. Обеспечьте себя спокойствием, оставляя все заботы
          нам!
        </h3>
        <div className={styles.page__info_actions}>
          <Link to="/visas">
            <div className={styles.page__info_actions_btn}>Смотреть визы</div>
          </Link>
        </div>
      </div>
      <div className={styles.page__pic}>
        <img className={styles.page__pic_content} src={Evc}></img>
      </div>
    </div>
  )
}

export default StartPage

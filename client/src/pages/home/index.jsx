import styles from "./home.module.css"
import { Link } from "react-router-dom"

import CardNote from "../../components/CardNote/CardNote"
const plusIcon = "../../../public/assets/icons8-plus.svg"

const Home = () => {
  return (
    <>
      <Link to="/add-note" className={styles.icon}>
        <img src={plusIcon} alt="plus-icon" />
      </Link>

      <CardNote
        note={{
          date: "2023-12-02T01:06:37.939Z",
          title: "Note 1",
          content:
            "loremp ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum voluptates  quidem, voluptas, quibusdam quia quos  quod quae  voluptate.",
        }}
      />
    </>
  )
}

export default Home

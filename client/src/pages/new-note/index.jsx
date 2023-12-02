import styles from "./newNote.module.css"
const backIcon = "../../../public/assets/icons8-back-50.png"

import { Link } from "react-router-dom"

const NewNote = () => {
  return (
    <>
      <Link to="/" className={styles.icon}>
        <img src={backIcon} alt="plus-icon" />
      </Link>
      <h1>New Note</h1>
    </>
  )
}

export default NewNote

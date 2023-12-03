import styles from "./header.module.css"

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <h1>Notes App</h1>
      </div>
    </div>
  )
}

export default Header

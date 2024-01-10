import styles from "./footer.module.css"

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span>
          Built with React <img src="/assets/react.svg" alt="react-icon" /> and
          Vitejs
        </span>
        <span>© {year}</span>
      </div>
    </footer>
  )
}

export default Footer

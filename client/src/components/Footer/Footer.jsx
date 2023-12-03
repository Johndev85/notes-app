import styles from "./footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span>
          Built with React <img src="/assets/react.svg" alt="react-icon" /> and
          Vitejs
        </span>
        <span>© 2023</span>
      </div>
    </footer>
  )
}

export default Footer

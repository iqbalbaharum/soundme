import styles from '../../styles/Home.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>{/* <ThemeToggleList /> */}</div>
      <div className="flex items-center">{/* <ThemeToggleButton /> footer <ThemeToggleList /> */}</div>

      <div className="flex items-center">
        {/* <ThemeToggleButton />
        <ThemeToggleList /> */}
      </div>
    </footer>
  )
}

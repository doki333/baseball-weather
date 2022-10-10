import styles from './spinner.module.scss'

const Spinner = () => {
  return (
    <div className={styles.spinWrapper}>
      <p>Loading...</p>
      <div className={styles.spinner}>
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

export default Spinner

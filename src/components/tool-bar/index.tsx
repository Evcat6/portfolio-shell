import styles from "./index.module.css";

const ToolBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <button onClick={() => window.close()} className={`${styles.button} ${styles.button_exit}`}>&#10005;</button>
        <button className={styles.button}>&#9472;</button>
        <button className={styles.button}>&#9723;</button>
      </div>
      <p className={styles.user}>quest@{import.meta.env.VITE_APP_DOMAIN_NAME}:~</p>
    </div>
  );
};

export { ToolBar };

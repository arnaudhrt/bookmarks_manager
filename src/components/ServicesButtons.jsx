import styles from "./services_buttons.module.css";

export default function ServicesButtons() {
  return (
    <div className={styles.container}>
      <button className="button">Calculator</button>
      <button className="button">Chat GPT</button>
      <button className="button">Currency Convertor</button>
      <button className="button">Google Map</button>
      <button className="button">Google Translate</button>
    </div>
  );
}

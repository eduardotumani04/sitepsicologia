import styles from "./service-information.module.css";

export function ServiceInformation({ text }: { text: string }) {
  return (
    <div className={styles.information} role="note" aria-label="Informações de atendimento">
      <p>{text}</p>
    </div>
  );
}

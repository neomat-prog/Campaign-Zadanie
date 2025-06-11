import React from "react";
import styles from "./Modal.module.scss";
import Button from "../Button/Button";

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  children,
  wide = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${wide ? styles.wide : ""}`}
        onClick={(e) => e.stopPropagation()} 
      >
        {children ? (
          <>
            <button className={styles.closeButton} onClick={onClose}>
              &times;
            </button>
            {children}
          </>
        ) : (
          <>
            <div className={styles.modalHeader}>
              <h2>{title}</h2>
              <button className={styles.closeButton} onClick={onClose}>
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              <p>{message}</p>
            </div>
            <div className={styles.modalFooter}>
              <Button onClick={onClose} variant="secondary">
                Anuluj
              </Button>
              <Button onClick={onConfirm} variant="primary">
                Usuń
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
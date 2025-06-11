import React from "react";
import styles from "./Input.module.scss";

const Input = ({
  label,
  id,
  name,
  value,
  onChange,
  type = "text",
  error,
  ...props
}) => {
  return (
    <div className={styles.inputGroup}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        {...props}
      />
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default Input;
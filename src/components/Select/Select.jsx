import React from "react";
import styles from "./Select.module.scss";

const Select = ({ label, id, name, value, onChange, options, ...props }) => {
  return (
    <div className={styles.selectGroup}>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={styles.select}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value || option} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
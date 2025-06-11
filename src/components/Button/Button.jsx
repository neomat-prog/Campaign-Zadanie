import React from "react";
import styles from "./Button.module.scss";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  ...props
}) => {
  const buttonClassName = `${styles.button} ${styles[variant]}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClassName}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

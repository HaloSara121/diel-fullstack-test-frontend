import { Plus } from "phosphor-react";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  action?: () => void
  color?: string
}

import styles from "./styles.module.scss"

export function Button({ text, action, color, ...rest }: ButtonProps) {
  return (
    <button
      className={styles.button}
      onClick={action}
      style={{ background: color }}
      {...rest}
    >
      {text}
    </button>
  )
}
import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

import styles from "./styles.module.scss"

export const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ ...rest }, ref) => {
  return (
    <input className={styles.input} {...rest} ref={ref} />
  )
}

export const Input = forwardRef(InputBase)
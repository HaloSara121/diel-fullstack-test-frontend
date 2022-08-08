import ReactModal from 'react-modal'
import { Button } from '../Button'

import styles from "./styles.module.scss"

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  text: string
  action: () => void
}

export function ConfirmModal({ isOpen, onClose, text, action }: ConfirmModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{ 
        overlay: {
          background: "#0005"
        },
        content: {
          boxShadow: "none",
          width: "40rem",
          height: "15rem",
          margin: "2rem auto",
          background: "var(--gray-100)",
          padding: 0,
          border: "1px solid var(--purple-500)",
          borderRadius: "10px",
        }
      }}
    >
      <header className={styles.confirmModalHeader}>
        <h2>{text}</h2>
      </header>
      
      <footer className={styles.confirmModalFooter}>
        <Button onClick={onClose} text="Cancelar" color="var(--red-500)" />
        <Button onClick={() => {
          action()
          onClose()
        }} text="Confirmar" color="var(--green-500)" />
      </footer>
    </ReactModal>
  )
}
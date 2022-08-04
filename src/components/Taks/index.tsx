import { Pencil, Trash } from "phosphor-react"
import { useState } from "react"
import { descriptionEllipsised } from "../../utils/descriptionEllipsised"
import { ConfirmModal } from "../common/ConfirmModal"
import { NewTaskModal } from "../NewTaskModal"
import styles from "./styles.module.scss"

interface TaskProps {
  task: Task
}

export function Task({ task }: TaskProps) {
  const [deleteTaskModalConfirmationIsOpen, setDeleteTaskModalConfirmationIsOpen] = useState(false)
  const [editTaskModalConfirmationIsOpen, setEditTaskModalConfirmationIsOpen] = useState(false)

  return (
    <li className={styles.task}>
      <strong title={task.title}>
        {descriptionEllipsised(task.title, 20)}
      </strong>

      <span title={task.description}>
        {descriptionEllipsised(task.description, 120)}
      </span>

      <time>{task.durationInMin} min</time>  

      <div className={styles.editSection}>
        <Pencil 
          size={24} 
          className={styles.pencilIcon} 
          onClick={() => setEditTaskModalConfirmationIsOpen(true)}
        />
        
        <Trash 
          size={24} 
          className={styles.trashIcon} 
          onClick={() => setDeleteTaskModalConfirmationIsOpen(true)}
        />
      </div>

      <NewTaskModal 
        isOpen={editTaskModalConfirmationIsOpen}
        onClose={() => setEditTaskModalConfirmationIsOpen(state => !state)}
        initialData={task}
      />

      <ConfirmModal 
        text="Você deseja excluir essa tarefa?" 
        isOpen={deleteTaskModalConfirmationIsOpen} 
        onClose={() => setDeleteTaskModalConfirmationIsOpen(state => !state)}
        action={() => console.log("tarefa deletada")} 
      />
    </li>
  )
}
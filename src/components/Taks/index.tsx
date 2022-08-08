import { Pencil, Trash } from "phosphor-react"
import { useCallback, useState } from "react"
import { api } from "../../services/api"
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

  const deleteTask = useCallback(async () => {
    await api.delete(`/tasks/${task.id}`)
  }, [])

  const durationInMin = task.durationInMin
  const durationInHours = Math.floor(durationInMin / 60)
  const minRemaining = Math.floor(durationInMin % 60) 
  
  return (
    <li className={styles.task}>
      <strong title={task.title}>
        {descriptionEllipsised(task.title, 20)}
      </strong>

      <span title={task.description}>
        {descriptionEllipsised(task.description, 90)}
      </span>

      <time>
        {durationInMin >= 60 
        ? `${durationInHours} horas ${minRemaining > 0 ? `e ${minRemaining} min` : ''}`
        : `${durationInMin} min`}
      </time>  

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
        action={deleteTask} 
      />
    </li>
  )
}
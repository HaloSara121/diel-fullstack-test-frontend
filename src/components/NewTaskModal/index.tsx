import { useForm } from "react-hook-form"
import ReactModal from "react-modal"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"

import { Button } from "../common/Button"
import { Input } from "../common/Input"

import styles from "./styles.module.scss"

interface NewTaskModalProps {
  isOpen: boolean
  onClose: () => void
  initialData?: Task
}

const NewTaskFormValidation = zod.object({
  title: zod.string().min(1, "O titulo é obrigatório"),
  durationInMin: zod.number().min(5, "A duração minima é 5 minutos"),
  description: zod.string().optional(),
})

type NewTaskFormData = zod.infer<typeof NewTaskFormValidation>

export function NewTaskModal({ isOpen, onClose, initialData }: NewTaskModalProps) {
  const { handleSubmit, register } = useForm<NewTaskFormData>({
    resolver: zodResolver(NewTaskFormValidation),
    defaultValues: initialData
  })

  function NewTaskFormSubmit(data: NewTaskFormData) {
    console.log(data)
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{ 
        overlay: {
          background: "#0005",
        },
        content: {
          boxShadow: "none",
          width: "40rem",
          height: "fit-content",
          margin: "2rem auto",
          background: "var(--gray-100)",
          padding: 0,
          border: "1px solid var(--purple-500)",
          borderRadius: "10px",
        }
      }}
    >
      <header className={styles.TaskHeader}>
        <h2>{initialData ? "Editar" : "Criar"} tarefa</h2>
      </header>

      <form 
        className={styles.TaskForm}
        onSubmit={handleSubmit(NewTaskFormSubmit)}
      >
        <div>
          <div>
            <p>Titulo</p>
            <Input 
              placeholder="Titulo da tarefa"
              {...register("title")} 
            />
          </div>

          <div>
            <p>Duração</p>
            <Input 
              type="number" 
              step="5" 
              placeholder="Min"
              title="Duração em minutos"
              {...register("durationInMin", { valueAsNumber: true })}
            />
          </div>
        </div>

        <div>
          <div>
            <p>Descrição</p>
            <textarea 
              placeholder="Descrição da sua tarefa..."
              {...register("description")} 
            />
          </div>
        </div>

        <Button type="submit" text={initialData ? "Editar" : "Criar"} style={{ height: "3rem" }} />
      </form>
    </ReactModal>
  )
}
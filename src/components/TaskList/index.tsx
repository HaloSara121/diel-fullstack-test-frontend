
import { Flag, MagnifyingGlass } from "phosphor-react"
import { useEffect, useState } from "react"
import { Button } from "../common/Button"
import { Input } from "../common/Input"
import { NewTaskModal } from "../NewTaskModal"
import { Task } from "../Taks"

import styles from "./styles.module.scss"

const mockedTasks = [
  {
    id: "1",
    title: "task 1 task 1 task 1 v task 1 task 1 task 1 task 1 task 1 task 1 ",
    description: "fazer task 1 e a 2",
    durationInMin: 60,
  },
  {
    id: "2",
    title: "task 2",
    description: "fazer task 3 e a 2 fazer task 3 e a 2fazer task 3 e a 2fazer task 3 e a 2fazer task 3 e a 2fazer task 3 e a 2fazer task 3 e a 2fazer task 3 e a 2fazer task 3 e a 2fazer task 3 e a 2fazer task 3 e a 2fazer task 3 e a 2",
    durationInMin: 60,
  },
  {
    id: "3",
    title: "task 3",
    description: "fazer task 5 e a 6",
    durationInMin: 60,
  },
]

export function TaskList() {
  const [createTaskModalIsOpen, setCreateTaskModalIsOpen] = useState<boolean>(false)
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    setTasks(mockedTasks)
  }, [mockedTasks])

  return (
    <main className={styles.taskListContainer}>
      <header>
        <div className={styles.searchBox}>
          <MagnifyingGlass size={24} />
          <Input placeholder="Encontrar tarefa" />
        </div>

        <Button text="Criar Tarefa" action={() => setCreateTaskModalIsOpen(true)} />
      </header>

      <ul className={styles.list}>
        {tasks.map((task: Task) => (
          <Task 
            key={task.id}
            task={task}
          />
        ))}
        
        {tasks.length === 0 && (
          <div className={styles.emptyTasks}>
            <Flag size={48} />
            <p>Nenhuma Tarefa pendente</p>
          </div>
        )}
      </ul>

      <NewTaskModal 
        isOpen={createTaskModalIsOpen}
        onClose={() => setCreateTaskModalIsOpen(state => !state)}
      />
    </main>
  )
}
import { ArrowClockwise, Flag, MagnifyingGlass } from "phosphor-react"
import { useState } from "react"
import useSWR from "swr"

import { api } from "../../services/api"
import { Button } from "../common/Button"
import { Input } from "../common/Input"
import { NewTaskModal } from "../NewTaskModal"
import { Task } from "../Taks"

import styles from "./styles.module.scss"

export function TaskList() {
  const [createTaskModalIsOpen, setCreateTaskModalIsOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')

  const { data, isValidating } = useSWR("/tasks", async () => {
    return await api.get<{ tasks: Task[] }>("/tasks")
  }, { refreshInterval: 1000, revalidateOnFocus: true })
  
  const tasks = data?.data.tasks
  const filteredTasks = tasks?.filter(task => task.title.includes(search.trim()))

  return (
    <main className={styles.taskListContainer}>
      <header>
        <div className={styles.searchBox}>
          <MagnifyingGlass size={24} />
          <Input 
            placeholder="Encontrar tarefa" 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div>
          <div onClick={() => location.reload()} title="Atualizar tarefas">
            <ArrowClockwise size={24} />
          </div>
          <Button text="Criar Tarefa" action={() => setCreateTaskModalIsOpen(true)} />
        </div>
      </header>

      <ul className={styles.list}>
        {isValidating && !tasks && ( <div className={styles.ldsring} ><div></div><div></div><div></div><div></div></div> )}

        {filteredTasks?.length === 0 && tasks?.map((task: Task) => (
          <Task 
            key={task.id}
            task={task}
          />
        ))}

        {filteredTasks?.map(task => (
            <Task 
              key={task.id}
              task={task}
            />
        ))}
        
        {tasks?.length === 0 && (
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
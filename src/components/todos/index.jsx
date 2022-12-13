import React, { useEffect, useState } from "react";
import "./todos.scss";

export const STORE_KEY = "TODO_APP_KEY";
export const TodoTask = ({ tasks, checkTask, deleteTask }) => {
    return (
        <ul className="todo__task">
            {
                tasks.map((task) => {
                    return (
                        <li key={ task?.id } onClick={ (ev) => checkTask(task.id) }>
                            <p>{ task?.taskName }</p>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                onClick={ (e) => deleteTask(task.id, e) }
                            >
                                <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
                        </li>
                    )
                })
            }

        </ul>
    )
};


export const TodoTable = ({ taskList, checkTask, deleteTask }) => {
    const taskDoing = taskList.filter((task) => task.isCompeleted === false)
    const taskDone = taskList.filter((task) => task.isCompeleted === true)

    return (
        <div className="table__container">
            <div className="table__task">
                <h2>
                    Task will do
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M16.5 8c0 1.5-.5 3.5-2.9 4.3.7-1.7.8-3.4.3-5-.7-2.1-3-3.7-4.6-4.6-.4-.3-1.1.1-1 .7 0 1.1-.3 2.7-2 4.4C4.1 10 3 12.3 3 14.5 3 17.4 5 21 9 21c-4-4-1-7.5-1-7.5.8 5.9 5 7.5 7 7.5 1.7 0 5-1.2 5-6.4 0-3.1-1.3-5.5-2.4-6.9-.3-.5-1-.2-1.1.3"></path></svg>
                </h2>
                {
                    taskDoing && <TodoTask tasks={ taskDoing } checkTask={ checkTask } deleteTask={ deleteTask } />
                }

            </div>
            <div className="table__task done">
                <h2>
                    Task is done
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.965 8.521C19.988 8.347 20 8.173 20 8c0-2.379-2.143-4.288-4.521-3.965C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.035C6.138 3.712 4 5.621 4 8c0 .173.012.347.035.521C2.802 9.215 2 10.535 2 12s.802 2.785 2.035 3.479A3.976 3.976 0 0 0 4 16c0 2.379 2.138 4.283 4.521 3.965C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.035C17.857 20.283 20 18.379 20 16c0-.173-.012-.347-.035-.521C21.198 14.785 22 13.465 22 12s-.802-2.785-2.035-3.479zm-9.01 7.895-3.667-3.714 1.424-1.404 2.257 2.286 4.327-4.294 1.408 1.42-5.749 5.706z"></path></svg>
                </h2>
                {
                    taskDone && <TodoTask tasks={ taskDone } checkTask={ checkTask } deleteTask={ deleteTask } />
                }
            </div>
        </div>
    )
};




export const TodoContainer = () => {
    const [taskList, setTaskList] = useState(() => {
        const tasks = localStorage.getItem(STORE_KEY)
        if (tasks) {
            return JSON.parse(tasks)
        } else {
            return []
        }

    })
    const [text, setText] = useState("")
    const onAddTask = () => {
        setTaskList([
            ...taskList,
            {
                id: Date.now(),
                taskName: text,
                tags: "medium",
                isCompeleted: false
            }
        ])
        setText("")
    }
    const onCheckTask = (taskId) => {
        setTaskList(taskList.map((task) => {
            if (task?.id === taskId) {
                return {
                    ...task,
                    isCompeleted: true,
                }
            } else {
                return task
            }
        }))
    }
    const onDeleteTask = (taskId, ev) => {
        ev.stopPropagation();
        setTaskList(taskList.filter((task) => {
            return task.id !== taskId
        }))
    }
    const onKeyUpTask = (ev) => {
        if (text.trim() !== "" && ev.keyCode === 13) {
            onAddTask()
        }
    }
    useEffect(() => {
        localStorage.setItem(STORE_KEY, JSON.stringify(taskList))
    }, [taskList])
    return (
        <>
            <div className="todo__input">
                <input
                    value={ text }
                    onChange={ (ev) => setText(ev.target.value) }
                    onKeyUp={ onKeyUpTask }
                    type="text"
                    placeholder="Add task..." />
                <button disabled={ !text.trim() } onClick={ onAddTask }>Add</button>
            </div>
            <TodoTable taskList={ taskList } checkTask={ onCheckTask } deleteTask={ onDeleteTask } />
        </>
    )
};

export default function Todo() {
    return (
        <>
            <h1 className="heading">
                Todos
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8l8-8V5a2 2 0 0 0-2-2zm-7 16v-7h7l-7 7z"></path></svg>
            </h1>
            <TodoContainer />
        </>
    )
}

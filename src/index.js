import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { taskCompleted, titleChanged, taskDeleted } from './store/task'
import configureStore from './store/store'

export const store = configureStore()

const App = () => {
  const [state, setState] = useState(store.getState())

  const completeTask = (taskId) => {
    store.dispatch(taskCompleted(taskId))
  }

  const changeTitle = (taskId) => {
    store.dispatch(titleChanged(taskId))
  }
  const deleteTask = (taskId) => {
    store.dispatch(taskDeleted(taskId))
  }

  useEffect(() => {
    store.subscribe(() => setState(store.getState()))
  }, [])

  return (
    <div>
      <h1> App</h1>

      <ul>
        {state.map((element) => (
          <li key={element.id}>
            <p>{element.title}</p>
            <p>{`Completed: ${element.completed}`}</p>
            <button onClick={() => completeTask(element.id)}>Complete</button>
            <button
              style={{ marginLeft: '10px' }}
              onClick={() => changeTitle(element.id)}>
              Change Title
            </button>
            <button
              style={{ marginLeft: '10px' }}
              onClick={() => deleteTask(element.id)}>
              Delete task
            </button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

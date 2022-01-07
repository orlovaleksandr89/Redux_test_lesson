import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  titleChanged,
  taskDeleted,
  completeTask,
  getTasks,
  loadTasks,
  getTasksLoadingStatus,
  createNewTask
} from './store/task'
import configureStore from './store/store'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { getError } from './store/errors'

export const store = configureStore()

const App = () => {
  const state = useSelector(getTasks())
  const isLoading = useSelector(getTasksLoadingStatus())
  const error = useSelector(getError())
  const dispatch = useDispatch()
  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId))
  }

  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId))
  }

  useEffect(() => {
    dispatch(loadTasks())
  }, [])

  if (isLoading) {
    return <h1>Loading....</h1>
  }

  const newTask = {
    title: 'SOME NEW TITLE',
    completed: false
  }

  return (
    <div>
      <h1> App</h1>
      <div>
        <button onClick={() => dispatch(createNewTask(newTask))}>
          Create a new task
        </button>
      </div>
      <ul>
        {state.map((element) => (
          <li key={element.id}>
            <p>{element.title}</p>
            <p>{`Completed: ${element.completed}`}</p>
            <button onClick={() => dispatch(completeTask(element.id))}>
              Complete
            </button>
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

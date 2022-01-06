import { createStore, compose, applyMiddleware } from 'redux'
import { logger } from './middleware/logger'
import taskReducer from './task'

export const initialState = [
  { id: 1, title: 'task 1', completed: false },
  { id: 2, title: 'task 2', completed: false }
]

const middlewareEnchancer = applyMiddleware(logger)

function configureStore() {
  return createStore(
    taskReducer,
    initialState,
    compose(
      middlewareEnchancer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )
}
export default configureStore

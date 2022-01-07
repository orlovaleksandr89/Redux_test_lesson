import {
  // createAction,
  // createReducer,
  createSlice
} from '@reduxjs/toolkit'

import todosService from '../services/todos.service'
import { setError } from './errors'

//Actions Types
// const TASK_UPDATED = 'task/updated'
// const TASK_DELETED = 'task/deleted'

//Actions
// const update = createAction(TASK_UPDATED)
// const remove = createAction(TASK_DELETED)

// export const taskCompleted = (id) => {
//   return update({ id, completed: true })
// }
// export const titleChanged = (id) => {
//   return update({ id, title: `New title for task id = ${id}` })
// }
// export const taskDeleted = (id) => {
//   return remove({ id })
// }
const initialState = { entities: [], isLoading: true }

//Reducer
const taskSliceReducer = createSlice({
  name: 'task',
  initialState,
  reducers: {
    recieved(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (element) => element.id === action.payload.id
      )
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload
      }
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (element) => element.id !== action.payload.id
      )
    },
    taskRequested(state) {
      state.isLoading = true
    },
    taskRequestFailed(state, action) {
      state.isLoading = false
    },
    newTaskCreateRequested(state) {
      state.isLoading = true
    },
    newTaskReceived(state, action) {
      state.entities = [action.payload, ...state.entities]
      state.isLoading = false
    }
  }
})

const { actions, reducer: taskReducer } = taskSliceReducer
const {
  update,
  remove,
  recieved,
  taskRequestFailed,
  taskRequested,
  newTaskCreateRequested,
  newTaskReceived
} = actions

export const loadTasks = () => async (dispatch) => {
  try {
    dispatch(taskRequested())
    const data = await todosService.fetch()
    console.log(data)
    dispatch(recieved(data))
  } catch (error) {
    dispatch(taskRequestFailed())
    dispatch(setError(error.message))
  }
}

export const createNewTask = (taskData) => async (dispatch) => {
  try {
    dispatch(newTaskCreateRequested())
    const data = await todosService.createTask(taskData)
    console.log(data)
    dispatch(newTaskReceived(data))
  } catch (error) {
    dispatch(taskRequestFailed())
    dispatch(setError(error.message))
  }
}

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({ id, completed: true }))
}

export const titleChanged = (id) => {
  return update({ id, title: `New title for task id = ${id}` })
}

export const taskDeleted = (id) => {
  return remove({ id })
}

/* Reducer thru createreducer from RTK */

// const taskReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(update, (state, action) => {
//       const elementIndex = state.findIndex(
//         (element) => element.id === action.payload.id
//       )
//       state[elementIndex] = { ...state[elementIndex], ...action.payload }
//     })
//     .addCase(remove, (state, action) => {
//       return state.filter((element) => element.id !== action.payload.id)
//     })
// })

/* Original Reducer*/

// function taskReducer(state, action) {
//   switch (action.type) {
//     case update.type: {
//       const newArr = [...state]
//       const elementIndex = newArr.findIndex((el) => el.id === action.payload.id)
//       newArr[elementIndex] = {
//         ...newArr[elementIndex],
//         ...action.payload
//       }
//       return newArr
//     }
//     case remove.type: {
//       return state.filter((element) => element.id !== action.payload.id)
//     }
//     default:
//       return state
//   }
// }

/* Selectors */

export const getTasks = () => (state) => {
  return state.tasks.entities
}
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading

export default taskReducer

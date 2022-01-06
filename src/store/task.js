import {
  // createAction,
  // createReducer,
  createSlice
} from '@reduxjs/toolkit'
import { initialState } from './store'

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

//Reducer
const taskSliceReducer = createSlice({
  name: 'task',
  initialState,
  reducers: {
    update(state, action) {
      const elementIndex = state.findIndex(
        (element) => element.id === action.payload.id
      )
      state[elementIndex] = { ...state[elementIndex], ...action.payload }
    },
    remove(state, action) {
      return state.filter((element) => element.id !== action.payload.id)
    }
  }
})

const { actions, reducer: taskReducer } = taskSliceReducer
const { update, remove } = actions

export const taskCompleted = (id) => {
  return update({ id, completed: true })
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

export default taskReducer

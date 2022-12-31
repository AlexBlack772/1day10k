//createStore(reducer, [preloadedState], [enhancer])とは、ReduxのStoreを作成するための関数です。
import { createStore } from 'redux'

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

const store = createStore(todos, ['Use Redux'])

store.dispatch({
  type: 'ADD_TODO',
  text: 'Read the docs'
})

console.log(store.getState())
// [ 'Use Redux', 'Read the docs' ]

//getState()とは、現在のStoreの状態を返す関数です。

//dispatch(action)とは、Storeに対してActionを送信する関数です。
import { createStore } from "redux";
const store = createStore(todos, ["Use Redux"]);

function addTodo(text) {
  return {
    type: "ADD_TODO",
    text,
  };
}

store.dispatch(addTodo("Read the docs"));
store.dispatch(addTodo("Read about the middleware"));

//subscribe(listener)とは、Storeの状態が変化した際に呼び出される関数を登録する関数です。
function select(state) {
  return state.some.deep.property;
}

let currentValue;
function handleChange() {
  let previousValue = currentValue;
  currentValue = select(store.getState());

  if (previousValue !== currentValue) {
    console.log(
      "Some deep nested property changed from",
      previousValue,
      "to",
      currentValue
    );
  }
}

const unsubscribe = store.subscribe(handleChange);
unsubscribe();

//combineReducers(reducers)とは、複数のReducerを組み合わせるための関数です。
rootReducer = combineReducers({potato: potatoReducer, tomato: tomatoReducer})
// This would produce the following state object
{
  potato: {
    // ... potatoes, and other state managed by the potatoReducer ...
  },
  tomato: {
    // ... tomatoes, and other state managed by the tomatoReducer, maybe some nice sauce? ...
  }
}

//applyMiddleware(...middleware)とは、StoreにMiddlewareを適用するための関数です。
import { createStore, applyMiddleware } from 'redux'
import todos from './reducers'

function logger({ getState }) {
  return next => action => {
    console.log('will dispatch', action)

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)

    console.log('state after dispatch', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

const store = createStore(todos, ['Use Redux'], applyMiddleware(logger))

store.dispatch({
  type: 'ADD_TODO',
  text: 'Understand the middleware'
})

//bindActionCreators(actionCreators, dispatch)とは、ActionCreatorをStoreのdispatchにバインドするための関数です。
export function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text
  }
}

export function removeTodo(id) {
  return {
    type: 'REMOVE_TODO',
    id
  }
}

//compose(...functions)とは、関数を合成するための関数です。
const store = createStore(
   reducer,
   compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
   )
)

//configureStore([preloadedState], [enhancer])とは、ReduxのStoreを作成するための関数です。
import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './reducers'

const store = configureStore({ reducer: rootReducer })
// The store now has redux-thunk added and the Redux DevTools Extension is turned on

//getDefaultMiddleware([options])とは、ReduxのデフォルトのMiddlewareを取得するための関数です。
import { configureStore } from '@reduxjs/toolkit'

import logger from 'redux-logger'

import rootReducer from './reducer'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

//createImmutableStateInvariantMiddleware([options])とは、ImmutableなStateを保証するためのMiddlewareを作成するための関数です。
import { configureStore } from '@reduxjs/toolkit'
// file: exampleSlice.ts
import { createSlice } from '@reduxjs/toolkit'

export const exampleSlice = createSlice({
  name: 'example',
  initialState: {
    user: 'will track changes',
    ignoredPath: 'single level',
    ignoredNested: {
      one: 'one',
      two: 'two',
    },
  },
  reducers: {},
})

export default exampleSlice.reducer


// file: store.ts
import {
  configureStore,
  createImmutableStateInvariantMiddleware,
} from '@reduxjs/toolkit'

import exampleSliceReducer from './exampleSlice'

const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware({
  ignoredPaths: ['ignoredPath', 'ignoredNested.one', 'ignoredNested.two'],
})

const store = configureStore({
  reducer: exampleSliceReducer,
  // Note that this will replace all default middleware
  middleware: [immutableInvariantMiddleware],
})

//isImmutableDefault(value)とは、Immutableな値かどうかを判定するための関数です。
return (
  typeof value !== 'object' || value === null || typeof value === 'undefined'
)

interface SerializableStateInvariantMiddlewareOptions {
  /**
   * The function to check if a value is considered serializable. This
   * function is applied recursively to every value contained in the
   * state. Defaults to `isPlain()`.
   */
  isSerializable?: (value: any) => boolean
  /**
   * The function that will be used to retrieve entries from each
   * value.  If unspecified, `Object.entries` will be used. Defaults
   * to `undefined`.
   */
  getEntries?: (value: any) => [string, any][]

  /**
   * An array of action types to ignore when checking for serializability.
   * Defaults to []
   */
  ignoredActions?: string[]

  /**
   * An array of dot-separated path strings to ignore when checking
   * for serializability, Defaults to ['meta.arg', 'meta.baseQueryMeta']
   */
  ignoredActionPaths?: string[]

  /**
   * An array of dot-separated path strings to ignore when checking
   * for serializability, Defaults to []
   */
  ignoredPaths?: string[]
  /**
   * Execution time warning threshold. If the middleware takes longer
   * than `warnAfter` ms, a warning will be displayed in the console.
   * Defaults to 32ms.
   */
  warnAfter?: number

  /**
   * Opt out of checking state. When set to `true`, other state-related params will be ignored.
   */
  ignoreState?: boolean

  /**
   * Opt out of checking actions. When set to `true`, other action-related params will be ignored.
   */
  ignoreActions?: boolean
}

import { Iterable } from 'immutable'
import {
  configureStore,
  createSerializableStateInvariantMiddleware,
  isPlain,
} from '@reduxjs/toolkit'
import reducer from './reducer'

// Augment middleware to consider Immutable.JS iterables serializable
const isSerializable = (value) => Iterable.isIterable(value) || isPlain(value)

const getEntries = (value) =>
  Iterable.isIterable(value) ? value.entries() : Object.entries(value)

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable,
  getEntries,
})

const store = configureStore({
  reducer,
  middleware: [serializableMiddleware],
})

//createListenerMiddleware([options])とは、ReduxのListenerを作成するための関数です。
import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'

import todosReducer, {
  todoAdded,
  todoToggled,
  todoDeleted,
} from '../features/todos/todosSlice'

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware()

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
listenerMiddleware.startListening({
  actionCreator: todoAdded,
  effect: async (action, listenerApi) => {
    // Run whatever additional side-effect-y logic you want here
    console.log('Todo added: ', action.payload.text)

    // Can cancel other running instances
    listenerApi.cancelActiveListeners()

    // Run async logic
    const data = await fetchData()

    // Pause until action dispatched or state changed
    if (await listenerApi.condition(matchSomeAction)) {
      // Use the listener API methods to dispatch, get state,
      // unsubscribe the listener, start child tasks, and more
      listenerApi.dispatch(todoAdded('Buy pet food'))

      // Spawn "child tasks" that can do more work and return results
      const task = listenerApi.fork(async (forkApi) => {
        // Can pause execution
        await forkApi.delay(5)
        // Complete the child by returning a value
        return 42
      })

      const result = await task.result
      // Unwrap the child result in the listener
      if (result.status === 'ok') {
        // Logs the `42` result value that was returned
        console.log('Child succeeded: ', result.value)
      }
    }
  },
})

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  // Add the listener middleware to the store.
  // NOTE: Since this can receive actions with functions inside,
  // it should go before the serializability check middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})


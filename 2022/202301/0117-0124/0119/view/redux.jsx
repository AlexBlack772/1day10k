//
import { createStore } from "redux";

function todos(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.text]);
    default:
      return state;
  }
}

const store = createStore(todos, ["Use Redux"]);

store.dispatch({
  type: "ADD_TODO",
  text: "Read the docs",
});

console.log(store.getState());

//
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

//
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

//
export default function todos(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.text]);
    default:
      return state;
  }
}

//
export default function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

// 
import { createStore } from 'redux'
import reducer from './reducers/index'

const store = createStore(reducer)
console.log(store.getState())
// {
//   counter: 0,
//   todos: []
// }

store.dispatch({
  type: 'ADD_TODO',
  text: 'Use Redux'
})
console.log(store.getState())
// {
//   counter: 0,
//   todos: [ 'Use Redux' ]

// 
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
// (These lines will be logged by the middleware:)
// will dispatch: { type: 'ADD_TODO', text: 'Understand the middleware' }
// state after dispatch: [ 'Use Redux', 'Understand the middleware' ]

//
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import * as reducers from './reducers'

const reducer = combineReducers(reducers)
// applyMiddleware supercharges createStore with middleware:
const store = createStore(reducer, applyMiddleware(thunk))

function fetchSecretSauce() {
  return fetch('https://www.google.com/search?q=secret+sauce')
}

// These are the normal action creators you have seen so far.
// The actions they return can be dispatched without any middleware.
// However, they only express “facts” and not the “async flow”.
function makeASandwich(forPerson, secretSauce) {
  return {
    type: 'MAKE_SANDWICH',
    forPerson,
    secretSauce
  }
}

function apologize(fromPerson, toPerson, error) {
  return {
    type: 'APOLOGIZE',
    fromPerson,
    toPerson,
    error
  }
}

function withdrawMoney(amount) {
  return {
    type: 'WITHDRAW',
    amount
  }
}

// Even without middleware, you can dispatch an action:
store.dispatch(withdrawMoney(100))

// But what do you do when you need to start an asynchronous action,
// such as an API call, or a router transition?

// Meet thunks.
// A thunk is a function that returns a function.
// This is a thunk.
function makeASandwichWithSecretSauce(forPerson) {
  // Invert control!
  // Return a function that accepts `dispatch` so we can dispatch later.
  // Thunk middleware knows how to turn thunk async actions into actions.
  return function (dispatch) {
    return fetchSecretSauce().then(
      sauce => dispatch(makeASandwich(forPerson, sauce)),
      error => dispatch(apologize('The Sandwich Shop', forPerson, error))
    )
  }
}

// Thunk middleware lets me dispatch thunk async actions
// as if they were actions!
store.dispatch(makeASandwichWithSecretSauce('Me'))

// It even takes care to return the thunk's return value
// from the dispatch, so I can chain Promises as long as I return them.
store.dispatch(makeASandwichWithSecretSauce('My wife')).then(() => {
  console.log('Done!')
})

// In fact I can write action creators that dispatch
// actions and async actions from other action creators,
// and I can build my control flow with Promises.
function makeSandwichesForEverybody() {
  return function (dispatch, getState) {
    if (!getState().sandwiches.isShopOpen) {
      // You don't have to return Promises, but it's a handy convention
      // so the caller can always call .then() on async dispatch result.
      return Promise.resolve()
    }

    // We can dispatch both plain object actions and other thunks,
    // which lets us compose the asynchronous actions in a single flow.
    return dispatch(makeASandwichWithSecretSauce('My Grandma'))
      .then(() =>
        Promise.all([
          dispatch(makeASandwichWithSecretSauce('Me')),
          dispatch(makeASandwichWithSecretSauce('My wife'))
        ])
      )
      .then(() => dispatch(makeASandwichWithSecretSauce('Our kids')))
      .then(() =>
        dispatch(
          getState().myMoney > 42
            ? withdrawMoney(42)
            : apologize('Me', 'The Sandwich Shop')
        )
      )
  }
}

// This is very useful for server side rendering, because I can wait
// until data is available, then synchronously render the app.

import { renderToString } from 'react-dom/server'

store
  .dispatch(makeSandwichesForEverybody())
  .then(() => response.send(renderToString(<MyApp store={store} />)))

// I can also dispatch a thunk async action from a component
// any time its props change to load the missing data.

import React from 'react'
import { connect } from 'react-redux'

function SandwichShop(props) {
  const { dispatch, forPerson } = props

  useEffect(() => {
    dispatch(makeASandwichWithSecretSauce(forPerson))
  }, [forPerson])

  return <p>{this.props.sandwiches.join('mustard')}</p>
}

export default connect(state => ({
  sandwiches: state.sandwiches
}))(SandwichShop)

//
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as TodoActionCreators from './TodoActionCreators'
console.log(TodoActionCreators)
// {
//   addTodo: Function,
//   removeTodo: Function
// }

function TodoListContainer(props) {
  // Injected by react-redux:
  const { dispatch, todos } = props

  // Here's a good use case for bindActionCreators:
  // You want a child component to be completely unaware of Redux.
  // We create bound versions of these functions now so we can
  // pass them down to our child later.

  const boundActionCreators = useMemo(
    () => bindActionCreators(TodoActionCreators, dispatch),
    [dispatch]
  )
  console.log(boundActionCreators)
  // {
  //   addTodo: Function,
  //   removeTodo: Function
  // }

  useEffect(() => {
    // Note: this won't work:
    // TodoActionCreators.addTodo('Use Redux')

    // You're just calling a function that creates an action.
    // You must dispatch the action, too!

    // This will work:
    let action = TodoActionCreators.addTodo('Use Redux')
    dispatch(action)
  }, [])

  return <TodoList todos={todos} {...this.boundActionCreators} />

  // An alternative to bindActionCreators is to pass
  // just the dispatch function down, but then your child component
  // needs to import action creators and know about them.

  // return <TodoList todos={todos} dispatch={dispatch} />
}

//export default connect(state => ({ todos: state.todos }))(TodoListContainer)

//
type ConfigureEnhancersCallback = (
  defaultEnhancers: StoreEnhancer[]
) => StoreEnhancer[]

interface ConfigureStoreOptions<
  S = any,
  A extends Action = AnyAction,
  M extends Middlewares<S> = Middlewares<S>
> {
  /**
   * A single reducer function that will be used as the root reducer, or an
   * object of slice reducers that will be passed to `combineReducers()`.
   */
  reducer: Reducer<S, A> | ReducersMapObject<S, A>

  /**
   * An array of Redux middleware to install. If not supplied, defaults to
   * the set of middleware returned by `getDefaultMiddleware()`.
   */
  middleware?: ((getDefaultMiddleware: CurriedGetDefaultMiddleware<S>) => M) | M

  /**
   * Whether to enable Redux DevTools integration. Defaults to `true`.
   *
   * Additional configuration can be done by passing Redux DevTools options
   */
  devTools?: boolean | DevToolsOptions

  /**
   * The initial state, same as Redux's createStore.
   * You may optionally specify it to hydrate the state
   * from the server in universal apps, or to restore a previously serialized
   * user session. If you use `combineReducers()` to produce the root reducer
   * function (either directly or indirectly by passing an object as `reducer`),
   * this must be an object with the same shape as the reducer map keys.
   */
  preloadedState?: DeepPartial<S extends any ? S : S>

  /**
   * The store enhancers to apply. See Redux's `createStore()`.
   * All enhancers will be included before the DevTools Extension enhancer.
   * If you need to customize the order of enhancers, supply a callback
   * function that will receive the original array (ie, `[applyMiddleware]`),
   * and should return a new array (such as `[applyMiddleware, offline]`).
   * If you only need to add middleware, you can use the `middleware` parameter instead.
   */
  enhancers?: StoreEnhancer[] | ConfigureEnhancersCallback
}

function configureStore<S = any, A extends Action = AnyAction>(
  options: ConfigureStoreOptions<S, A>
): EnhancedStore<S, A>

//

// file: todos/todosReducer.ts noEmit
import type { Reducer } from '@reduxjs/toolkit'
declare const reducer: Reducer<{}>
export default reducer

// file: visibility/visibilityReducer.ts noEmit
import type { Reducer } from '@reduxjs/toolkit'
declare const reducer: Reducer<{}>
export default reducer

// file: store.ts
import { configureStore } from '@reduxjs/toolkit'

// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger'

// And use redux-batched-subscribe as an example of adding enhancers
import { batchedSubscribe } from 'redux-batched-subscribe'

import todosReducer from './todos/todosReducer'
import visibilityReducer from './visibility/visibilityReducer'

const reducer = {
  todos: todosReducer,
  visibility: visibilityReducer,
}

const preloadedState = {
  todos: [
    {
      text: 'Eat food',
      completed: true,
    },
    {
      text: 'Exercise',
      completed: false,
    },
  ],
  visibilityFilter: 'SHOW_COMPLETED',
}

const debounceNotify = _.debounce(notify => notify());

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
  enhancers: [batchedSubscribe(debounceNotify)],
})

//
import { configureStore } from '@reduxjs/toolkit'

import logger from 'redux-logger'

import rootReducer from './reducer'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

//
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer'
import { myCustomApiService } from './api'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: myCustomApiService,
      },
      serializableCheck: false,
    }),
})

//
interface ThunkOptions<E = any> {
  extraArgument: E
}

interface ImmutableStateInvariantMiddlewareOptions {
  // See "Immutability Middleware" page for definition
}

interface SerializableStateInvariantMiddlewareOptions {
  // See "Serializability Middleware" page for definition
}

interface GetDefaultMiddlewareOptions {
  thunk?: boolean | ThunkOptions
  immutableCheck?: boolean | ImmutableStateInvariantMiddlewareOptions
  serializableCheck?: boolean | SerializableStateInvariantMiddlewareOptions
}

function getDefaultMiddleware<S = any>(
  options: GetDefaultMiddlewareOptions = {}
): Middleware<{}, S>[]

//
type IsImmutableFunc = (value: any) => boolean

interface ImmutableStateInvariantMiddlewareOptions {
  /**
    Callback function to check if a value is considered to be immutable.
    This function is applied recursively to every value contained in the state.
    The default implementation will return true for primitive types 
    (like numbers, strings, booleans, null and undefined).
   */
  isImmutable?: IsImmutableFunc
  /** 
    An array of dot-separated path strings that match named nodes from 
    the root state to ignore when checking for immutability.
    Defaults to undefined
   */
  ignoredPaths?: string[]
  /** Print a warning if checks take longer than N ms. Default: 32ms */
  warnAfter?: number
  // @deprecated. Use ignoredPaths
  ignore?: string[]
}

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

//
import { Iterable } from 'immutable'
import {
  configureStore,
  createSerializableStateInvariantMiddleware,
  isPlain,
} from '@reduxjs/toolkit'
import reducer from './reducer'

// Augment middleware to consider Immutable.JS iterables serializable
const isSerializable = (value: any) =>
  Iterable.isIterable(value) || isPlain(value)

const getEntries = (value: any) =>
  Iterable.isIterable(value) ? value.entries() : Object.entries(value)

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable,
  getEntries,
})

const store = configureStore({
  reducer,
  middleware: [serializableMiddleware],
})

//
import isPlainObject from './isPlainObject'

export function isPlain(val: any) {
  return (
    typeof val === 'undefined' ||
    val === null ||
    typeof val === 'string' ||
    typeof val === 'boolean' ||
    typeof val === 'number' ||
    Array.isArray(val) ||
    isPlainObject(val)
  )
}

//
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

//
const createListenerMiddleware = (options?: CreateMiddlewareOptions) =>
  ListenerMiddlewareInstance

interface CreateListenerMiddlewareOptions<ExtraArgument = unknown> {
  extra?: ExtraArgument
  onError?: ListenerErrorHandler
}

type ListenerErrorHandler = (
  error: unknown,
  errorInfo: ListenerErrorInfo
) => void

interface ListenerErrorInfo {
  raisedBy: 'effect' | 'predicate'
}

//
const startListening = (options: AddListenerOptions) => UnsubscribeListener

interface AddListenerOptions {
  // Four options for deciding when the listener will run:

  // 1) Exact action type string match
  type?: string

  // 2) Exact action type match based on the RTK action creator
  actionCreator?: ActionCreator

  // 3) Match one of many actions using an RTK matcher
  matcher?: Matcher

  // 4) Return true based on a combination of action + state
  predicate?: ListenerPredicate

  // The actual callback to run when the action is matched
  effect: (action: Action, listenerApi: ListenerApi) => void | Promise<void>
}

type ListenerPredicate<Action extends AnyAction, State> = (
  action: Action,
  currentState?: State,
  originalState?: State
) => boolean

type UnsubscribeListener = (
  unsubscribeOptions?: UnsubscribeListenerOptions
) => void

interface UnsubscribeListenerOptions {
  cancelActive?: true
}

interface ForkedTaskAPI {
  pause<W>(waitFor: Promise<W>): Promise<W>
  delay(timeoutMs: number): Promise<void>
  signal: AbortSignal
}

export type TaskResolved<T> = {
  readonly status: 'ok'
  readonly value: T
}

export type TaskRejected = {
  readonly status: 'rejected'
  readonly error: unknown
}

export type TaskCancelled = {
  readonly status: 'cancelled'
  readonly error: TaskAbortError
}

export type TaskResult<Value> =
  | TaskResolved<Value>
  | TaskRejected
  | TaskCancelled

export interface ForkedTask<T> {
  result: Promise<TaskResult<T>>
  cancel(): void
}

//

listenerMiddleware.startListening({
  actionCreator: resourceRequested,
  effect: async (action, listenerApi) => {
    const { name, args } = action.payload
    listenerApi.dispatch(resourceLoading())

    const res = await serverApi.fetch(`/api/${name}`, ...args)
    listenerApi.dispatch(resourceLoaded(res.data))
  },
})

listenerMiddleware.startListening({
  actionCreator: increment,
  effect: async (action, listenerApi) => {
    // Spawn a child task and start it immediately
    const task = listenerApi.fork(async (forkApi) => {
      // Artificially wait a bit inside the child
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
  },
})

import type { AppStartListening } from '../../app/listenerMiddleware'

const feature1Slice = createSlice(/* */)
const { action1 } = feature1Slice.actions

export default feature1Slice.reducer

export const addFeature1Listeners = (startListening: AppStartListening) => {
  startListening({
    actionCreator: action1,
    effect: () => {},
  })
}

//
const initialState = { value: 0 }

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, value: state.value + 1 }
    case 'decrement':
      return { ...state, value: state.value - 1 }
    case 'incrementByAmount':
      return { ...state, value: state.value + action.payload }
    default:
      return state
  }
}

//
import { createAction, createReducer } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const increment = createAction('counter/increment')
const decrement = createAction('counter/decrement')
const incrementByAmount = createAction<number>('counter/incrementByAmount')

const initialState = { value: 0 } as CounterState

const counterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, (state, action) => {
      state.value++
    })
    .addCase(decrement, (state, action) => {
      state.value--
    })
    .addCase(incrementByAmount, (state, action) => {
      state.value += action.payload
    })
})

//
import {
  createAction,
  createReducer,
  AnyAction,
  PayloadAction,
} from '@reduxjs/toolkit'

const increment = createAction<number>('increment')
const decrement = createAction<number>('decrement')

function isActionWithNumberPayload(
  action: AnyAction
): action is PayloadAction<number> {
  return typeof action.payload === 'number'
}

const reducer = createReducer(
  {
    counter: 0,
    sumOfNumberPayloads: 0,
    unhandledActions: 0,
  },
  (builder) => {
    builder
      .addCase(increment, (state, action) => {
        // action is inferred correctly here
        state.counter += action.payload
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(decrement, (state, action) => {
        state.counter -= action.payload
      })
      // You can apply a "matcher function" to incoming actions
      .addMatcher(isActionWithNumberPayload, (state, action) => {})
      // and provide a default case if no other handlers matched
      .addDefaultCase((state, action) => {})
  }
)

//
import {
  createAction,
  createReducer,
  AsyncThunk,
  AnyAction,
} from '@reduxjs/toolkit'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

const initialState: Record<string, string> = {}
const resetAction = createAction('reset-tracked-loading-state')

function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('/pending')
}

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetAction, () => initialState)
    // matcher can be defined outside as a type predicate function
    .addMatcher(isPendingAction, (state, action) => {
      state[action.meta.requestId] = 'pending'
    })
    .addMatcher(
      // matcher can be defined inline as a type predicate function
      (action): action is RejectedAction => action.type.endsWith('/rejected'),
      (state, action) => {
        state[action.meta.requestId] = 'rejected'
      }
    )
    // matcher can just return boolean and the matcher can receive a generic argument
    .addMatcher<FulfilledAction>(
      (action) => action.type.endsWith('/fulfilled'),
      (state, action) => {
        state[action.meta.requestId] = 'fulfilled'
      }
    )
})

//
const isStringPayloadAction = (action) => typeof action.payload === 'string'

const lengthOfAllStringsReducer = createReducer(
  // initial state
  { strLen: 0, nonStringActions: 0 },
  // normal reducers
  {
    /*...*/
  },
  //  array of matcher reducers
  [
    {
      matcher: isStringPayloadAction,
      reducer(state, action) {
        state.strLen += action.payload.length
      },
    },
  ],
  // default reducer
  (state) => {
    state.nonStringActions++
  }
)

//
import { createAction, createReducer } from '@reduxjs/toolkit'

interface Todo {
  text: string
  completed: boolean
}

const addTodo = createAction<Todo>('todos/add')
const toggleTodo = createAction<number>('todos/toggle')

const todosReducer = createReducer([] as Todo[], (builder) => {
  builder
    .addCase(addTodo, (state, action) => {
      const todo = action.payload
      return [...state, todo]
    })
    .addCase(toggleTodo, (state, action) => {
      const index = action.payload
      const todo = state[index]
      return [
        ...state.slice(0, index),
        { ...todo, completed: !todo.completed },
        ...state.slice(index + 1),
      ]
    })
})

//
import { createAction, createReducer } from '@reduxjs/toolkit'

interface Todo {
  text: string
  completed: boolean
}

const addTodo = createAction<Todo>('todos/add')
const toggleTodo = createAction<number>('todos/toggle')

const todosReducer = createReducer([] as Todo[], (builder) => {
  builder
    .addCase(addTodo, (state, action) => {
      // This push() operation gets translated into the same
      // extended-array creation as in the previous example.
      const todo = action.payload
      state.push(todo)
    })
    .addCase(toggleTodo, (state, action) => {
      // The "mutating" version of this case reducer is much
      //  more direct than the explicitly pure one.
      const index = action.payload
      const todo = state[index]
      todo.completed = !todo.completed
    })
})

//
import { createAction, createReducer } from '@reduxjs/toolkit'

interface Todo {
  text: string
  completed: boolean
}

const toggleTodo = createAction<number>('todos/toggle')

const todosReducer = createReducer([] as Todo[], (builder) => {
  builder.addCase(toggleTodo, (state, action) => {
    const index = action.payload
    const todo = state[index]

    // This case reducer both mutates the passed-in state...
    todo.completed = !todo.completed

    // ... and returns a new value. This will throw an
    // exception. In this example, the easiest fix is
    // to remove the `return` statement.
    return [...state.slice(0, index), todo, ...state.slice(index + 1)]
  })
})

//
import { createReducer } from '@reduxjs/toolkit'

const reducer = createReducer(0, (builder) => {
  builder
    .addCase('increment', (state) => state + 1)
    .addMatcher(
      (action) => action.type.startsWith('i'),
      (state) => state * 5
    )
    .addMatcher(
      (action) => action.type.endsWith('t'),
      (state) => state + 2
    )
})

console.log(reducer(0, { type: 'increment' }))

//
import { createAction } from '@reduxjs/toolkit'

const increment = createAction<number | undefined>('counter/increment')

let action = increment()
// { type: 'counter/increment' }

action = increment(3)
// returns { type: 'counter/increment', payload: 3 }

console.log(increment.toString())
// 'counter/increment'

console.log(`The action type is: ${increment}`)
// 'The action type is: counter/increment'

// 
// 
import { createAction, createReducer } from '@reduxjs/toolkit'

const increment = createAction<number>('counter/increment')
const decrement = createAction<number>('counter/decrement')

const counterReducer = createReducer(0, (builder) => {
  builder.addCase(increment, (state, action) => state + action.payload)
  builder.addCase(decrement, (state, action) => state - action.payload)
})

//
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const initialState = { value: 0 } as CounterState

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
    decrement(state) {
      state.value--
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer

//
import { createSlice, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Item {
  id: string
  text: string
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Item[],
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Item>) => {
        state.push(action.payload)
      },
      prepare: (text: string) => {
        const id = nanoid()
        return { payload: { id, text } }
      },
    },
  },
})

//
import { createAction, createSlice, Action, AnyAction } from '@reduxjs/toolkit'
const incrementBy = createAction<number>('incrementBy')
const decrement = createAction('decrement')

interface RejectedAction extends Action {
  error: Error
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected')
}

createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(incrementBy, (state, action) => {
        // action is inferred correctly here if using TS
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(decrement, (state, action) => {})
      // You can match a range of action types
      .addMatcher(
        isRejectedAction,
        // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
        (state, action) => {}
      )
      // and provide a default case if no other handlers matched
      .addDefaultCase((state, action) => {})
  },
})

//
import { createSlice, createAction } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createStore, combineReducers } from 'redux'

const incrementBy = createAction<number>('incrementBy')
const decrementBy = createAction<number>('decrementBy')

const counter = createSlice({
  name: 'counter',
  initialState: 0 as number,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    multiply: {
      reducer: (state, action: PayloadAction<number>) => state * action.payload,
      prepare: (value?: number) => ({ payload: value || 2 }), // fallback if the payload is a falsy value
    },
  },
  // "builder callback API", recommended for TypeScript users
  extraReducers: (builder) => {
    builder.addCase(incrementBy, (state, action) => {
      return state + action.payload
    })
    builder.addCase(decrementBy, (state, action) => {
      return state - action.payload
    })
  },
})

const user = createSlice({
  name: 'user',
  initialState: { name: '', age: 20 },
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload // mutate the state all you want with immer
    },
  },
  // "map object API"
  extraReducers: {
    // @ts-expect-error in TypeScript, this would need to be [counter.actions.increment.type]
    [counter.actions.increment]: (
      state,
      action /* action will be inferred as "any", as the map notation does not contain type information */
    ) => {
      state.age += 1
    },
  },
})

const reducer = combineReducers({
  counter: counter.reducer,
  user: user.reducer,
})

const store = createStore(reducer)

store.dispatch(counter.actions.increment())
// -> { counter: 1, user: {name : '', age: 21} }
store.dispatch(counter.actions.increment())
// -> { counter: 2, user: {name: '', age: 22} }
store.dispatch(counter.actions.multiply(3))
// -> { counter: 6, user: {name: '', age: 22} }
store.dispatch(counter.actions.multiply())
// -> { counter: 12, user: {name: '', age: 22} }
console.log(`${counter.actions.decrement}`)
// -> "counter/decrement"
store.dispatch(user.actions.setUserName('eric'))
// -> { counter: 12, user: { name: 'eric', age: 22} }

//
interface SerializedError {
  name?: string
  message?: string
  code?: string
  stack?: string
}

interface PendingAction<ThunkArg> {
  type: string
  payload: undefined
  meta: {
    requestId: string
    arg: ThunkArg
  }
}

interface FulfilledAction<ThunkArg, PromiseResult> {
  type: string
  payload: PromiseResult
  meta: {
    requestId: string
    arg: ThunkArg
  }
}

interface RejectedAction<ThunkArg> {
  type: string
  payload: undefined
  error: SerializedError | any
  meta: {
    requestId: string
    arg: ThunkArg
    aborted: boolean
    condition: boolean
  }
}

interface RejectedWithValueAction<ThunkArg, RejectedValue> {
  type: string
  payload: RejectedValue
  error: { message: 'Rejected' }
  meta: {
    requestId: string
    arg: ThunkArg
    aborted: boolean
  }
}

type Pending = <ThunkArg>(
  requestId: string,
  arg: ThunkArg
) => PendingAction<ThunkArg>

type Fulfilled = <ThunkArg, PromiseResult>(
  payload: PromiseResult,
  requestId: string,
  arg: ThunkArg
) => FulfilledAction<ThunkArg, PromiseResult>

type Rejected = <ThunkArg>(
  requestId: string,
  arg: ThunkArg
) => RejectedAction<ThunkArg>

type RejectedWithValue = <ThunkArg, RejectedValue>(
  requestId: string,
  arg: ThunkArg
) => RejectedWithValueAction<ThunkArg, RejectedValue>

//

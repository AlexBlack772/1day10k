//createRudecuerとは、reducerを作成する関数
const initialState = { value: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "increment":
      return { ...state, value: state.value + 1 };
    case "decrement":
      return { ...state, value: state.value - 1 };
    case "incrementByAmount":
      return { ...state, value: state.value + action.payload };
    default:
      return state;
  }
}

//createActionとは、actionを作成する関数
const INCREMENT = 'counter/increment'

function increment(amount) {
  return {
    type: INCREMENT,
    payload: amount,
  }
}

const action = increment(3)
// { type: 'counter/increment', payload: 3 }

//createSliceとは、reducerとactionをまとめて作成する関数
import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    incrementByAmount(state, action) {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;

//initialStateとは、初期状態
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
  },
})
// Will handle the action type `'counter/increment'`

//extraReducersとは、reducerの外にreducerを作成する
import { createAction, createSlice } from "@reduxjs/toolkit";
const incrementBy = createAction("incrementBy");
const decrement = createAction("decrement");

function isRejectedAction(action) {
  return action.type.endsWith("rejected");
}

createSlice({
  name: "counter",
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
      .addDefaultCase((state, action) => {});
  },
});

//extraReducersとは、reducerの外にreducerを作成する
const incrementBy = createAction("incrementBy");

createSlice({
  name: "counter",
  initialState: 0,
  reducers: {},
  extraReducers: {
    [incrementBy]: (state, action) => {
      return state + action.payload;
    },
    "some/other/action": (state, action) => {},
  },
});

//createStore(reducer, [preloadedState], [enhancer])とは、storeを作成する関数
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

//getState()とは、現在のstateを取得する関数
import { createStore } from 'redux'

//dispatch(action)とは、actionをdispatchする関数
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

//subscribe(listener)とは、stateが変更された時に呼び出される関数
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
// state after dispati

//bindActionCreators(actionCreators, dispatch)とは、actionをdispatchする関数
import { bindActionCreators } from 'redux'
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

export default connect(state => ({ todos: state.todos }))(TodoListContainer)

//compose(...functions)とは、関数を合成する関数
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import DevTools from './containers/DevTools'
import reducer from '../reducers'

const store = createStore(
  reducer,
  compose(applyMiddleware(thunk), DevTools.instrument())
)


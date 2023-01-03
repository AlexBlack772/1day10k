//createStoreとは、Reduxのメソッドで、storeを作成するためのものです。
//createStoreの引数には、reducerを渡します。
//reducerは、storeの状態を更新するためのものです。
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

//combineReducers(reducers)とは、複数のreducerを結合するためのものです。
//引数には、reducerをオブジェクトで渡します。
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

export default function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

//applyMiddleware(...middlewares)とは、Reduxのメソッドで、ミドルウェアを適用するためのものです。
//ミドルウェアとは、アクションがディスパッチされた後に、処理を挟むためのものです。
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

//bindActionCreators(actionCreators, dispatch)とは、Reduxのメソッドで、アクションをディスパッチするためのものです。
//引数には、アクションを作成する関数をオブジェクトで渡します。
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

//compose(...functions)とは、Reduxのメソッドで、関数を合成するためのものです。
const store = createStore(
  reducer,
  compose(applyMiddleware(thunk), DevTools.instrument())
)

//getState()とは、Reduxのメソッドで、現在のstoreの状態を取得するためのものです。
const store = createStore(todos, ['Use Redux'])

//dispatch(action)とは、Reduxのメソッドで、アクションをディスパッチするためのものです。
//引数には、アクションを渡します。
const store = createStore(todos, ['Use Redux'])
import { createStore } from 'redux'
const store = createStore(todos, ['Use Redux'])

function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text
  }
}

store.dispatch(addTodo('Read the docs'))
store.dispatch(addTodo('Read about the middleware'))

//subscribe(listener)とは、Reduxのメソッドで、storeの状態が変更された時に、リスナーを呼び出すためのものです。
function select(state) {
  return state.some.deep.property
}

let currentValue
function handleChange() {
  let previousValue = currentValue
  currentValue = select(store.getState())

  if (previousValue !== currentValue) {
    console.log(
      'Some deep nested property changed from',
      previousValue,
      'to',
      currentValue
    )
  }
}

const unsubscribe = store.subscribe(handleChange)
unsubscribe()

//replaceReducer(nextReducer)とは、Reduxのメソッドで、storeのreducerを置き換えるためのものです。

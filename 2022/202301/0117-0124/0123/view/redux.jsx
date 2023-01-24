import { createStore } from 'redux';

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text]);
    default:
      return state;
  }
}

const store = createStore(todos, ['Use Redux']);

store.dispatch({
   type: 'ADD_TODO',
   text: 'Read the docs'
});

console.log(store.getState());

const store = createStore(todos, ['Use Redux']);

function addTodo(text) {
   return {
      type: 'ADD_TODO',
      text
   }
}

store.dispatch(addTodo('Read the docs'));
store.dispatch(addTodo('Read about middleware'));

function select(state) {
   return state.some.deep.property;
}

let currentValue
function handleChange() {
   let previousValue = currentValue
   currentValue = select(store.getState())

   if (previousValue !== currentValue) {
      // do something
   }
}

const unsubscribe = store.subscribe(handleChange)
unsubscribe()

export  function todos(state = [], action) {
   switch (action.type) {
      case 'ADD_TODO':
         return state.concat([action.text]);
      default:
         return state;
   }
}

export function counter(state = 0, action) {
   switch (action.type) {
      case 'INCREMENT':
         return state + 1;
      case 'DECREMENT':
         return state - 1;
      default:
         return state;
   }
}


export default combineReducers({
   todos,
   counter

})

const store = createStore(todoApp)
console.log(store.getState())

store.dispatch({
   type: 'ADD_TODO',
   text: 'Read the docs'
})

console.log(store.getState())

import { applyMiddleware } from 'redux'

function logger({ getState }) {
   return next => action => {
      console.log('will dispatch', action)

      // Call the next dispatch method in the middleware chain.
      let returnValue = next(action)

      console.log('state after dispatch', getState())

      // This will likely be the action itself, unless
      // a middleware further in chain changed it.
      return returnValue
   }



}

import { combineReducers } from 'redux'
import thunk from 'redux-thunk'

const reducer = combineReducers(reducers)
const store = createStore(reducer, applyMiddleware(thunk))

function fetchSecretSauce() {
   return fetch('https://www.google.com')
}

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

function winthdrawMoney(amount) {
   return {
      type: 'WITHDRAW',
      amount
   }
}

store.dispatch(withdrawMoney(100))
   
function makeASandwichWithSecretSauce(forPerson) {
   // We can return functions as actions!
   return function (dispatch, getState) {
      return fetchSecretSauce().then(
         sauce => dispatch(makeASandwich(forPerson, sauce)),
         error => dispatch(apologize('The Sandwich Shop', forPerson, error))
      )
   }
}

store.dispatch(makeASandwichWithSecretSauce('Me'))

export function addTodo(text) {
   return {
      type: 'ADD_TODO',
      text
   }
}


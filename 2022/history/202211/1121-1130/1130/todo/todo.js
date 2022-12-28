import react from 'react';
import { ReactDOM } from 'react';

const todo = () => {

   const [todo, setTodo] = useState([]);
   const [todoInput, setTodoInput] = useState('');
   
   const addTodo = () => {
      setTodo([...todo, todoInput]);
      setTodoInput('');
   }

   const editTodo = (index) => {
      const newTodo = [...todo];
      newTodo[index] = todoInput;
      setTodo(newTodo);
      setTodoInput('');
   }

   const checkTodo = (index) => {
      const newTodo = [...todo];
      newTodo[index] = todoInput;
      setTodo(newTodo);
      setTodoInput('');
   }

   const deleteTodo = (index) => {
      const newTodo = [...todo];
      newTodo.splice(index, 1);
      setTodo(newTodo);
   }


   return (
      <div>
         <input type="text" value={todoInput} onChange={(e) => setTodoInput(e.target.value)} />
         <button onClick={addTodo}>Add</button>
         <ul>
            {todo.map((todo, index) => (
               <li key={index}>
                  <input type="checkbox" onChange={() => checkTodo(index)} />
                  <span>{todo}</span>
                  <button onClick={() => editTodo(index)}>Edit</button>
                  <button onClick={() => deleteTodo(index)}>Delete</button>
               </li>
            ))}
         </ul>
      </div>
   )
}
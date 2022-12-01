import ethers from 'ethers';
import { useEffect } from 'react';

const Todo = () => {
   const todo = new ethers.Contract(
      '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      , []);
   
   const create = contract.createTask('Task 1');

   const TaskCreated = contract.on('TaskCreated', (id, content) => {
      console.log('Task created with id: ' + id + ' and content: ' + content);
   });


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

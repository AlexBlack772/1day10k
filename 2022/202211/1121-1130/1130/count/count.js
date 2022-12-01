import react from 'react';
import { ReactDOM } from 'react';
import { ethers } from 'ethers';
import { useState } from 'react';

const count = () => {
      const [count, setCount] = useState(0);
   
      const addCount = () => {
         setCount(count + 1);
      }
   
      const minusCount = () => {
         setCount(count - 1);
      }
   
      const resetCount = () => {
         setCount(0);
      }
   
      return (
         <div>
            <h1>{count}</h1>
            <button onClick={addCount}>Add</button>
            <button onClick={minusCount}>Minus</button>
            <button onClick={resetCount}>Reset</button>
         </div>
      )
   }
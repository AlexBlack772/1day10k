import ethers from 'ethers';
import { useState } from 'react';
import { ethers } from 'ethers';
import { useState } from 'react';

const countSol = () => {

   useEffe
   const counter = new ethers.Contract(
      '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      new ethers.providers.Web3Provider(window.ethereum));
   const [count, setCount] = useState(0);

   const addCount = ethers.counter.increaseCount();
   const minusCount = ethers.counter.decreaseCount();
   const resetCount = ethers.counter.resetCount();

   return (
      <div>
         <h1>{count}</h1>
         <button onClick={addCount}>Add</button>
         <button onClick={minusCount}>Minus</button>
         <button onClick={resetCount}>Reset</button>
      </div>
   )
}


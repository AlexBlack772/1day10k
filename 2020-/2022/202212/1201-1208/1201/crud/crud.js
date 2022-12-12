import ethers from 'ethers';
import react from 'react';
import { useState, useEffect } from 'react';

const Crud = () => {
   const [greeting, setGreetingValue] = useState('');

   return (
      <div className="App">
         <header className="App-header">
            <button onClick={createGreeting}>Create Greeting</button>
            <button onClick={readGreeting}>Read Greeting</button>
            <button onClick={updateGreeting}>Update Greeting</button>
            <button onClick={deleteGreeting}>Delete Greeting</button>
            <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" />
            <p>{greeting}</p>
         </header>
      </div>
   );

}
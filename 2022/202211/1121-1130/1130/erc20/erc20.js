import ethers from 'ethers';

const ERC20 = () => {
   const erc20 = new ethers.Contract(
      '0x5FbDB231567
      [...]
      , [])
      
   const balance = erc20.balanceOf('0x5FbDB2315678afecb367f032d93F642f64180aa3');
   
   const transfer = erc20.transfer('0x5FbDB2315678afecb367f032d93F642f64180aa3', 100);

   return (
      <div>
         <h1>ERC20</h1>
         <p>Balance: {balance}</p>
         <button onClick={transfer}>Transfer</button>
      </div>
   )
   
}
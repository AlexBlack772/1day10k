import useState from 'react';
import useEffect from 'react';
import react from 'react';

import ethers from 'ethers';

const ERC20 = () => {

   const [balance, setBalance] = useState(0);

   const handleTransfer = async () => {
      const tx = await contract.methods.transfer(to, amount).send({ from: account });
      console.log(tx);
   };

   const handleApprove = async () => {
      const tx = await contract.methods.approve(spender, amount).send({ from: account });
      console.log(tx);
   };

   const handleTransferFrom = async () => {
      const tx = await contract.methods.transferFrom(from, to, amount).send({ from: account });
      console.log(tx);
   };

   const handleCreate = async () => {
      const tx = await contract.methods.create(to, amount).send({ from: account });
      console.log(tx);
   };

   const handleDestroy = async () => {
      const tx = await contract.methods.destroy(amount).send({ from: account });
      console.log(tx);
   };

   const handleUpdate = async () => {
      const tx = await contract.methods.update(amount).send({ from: account });
      console.log(tx);

   };

   
   useEffect(() => {
      const getBalance = async () => {
         const balance = await contract.methods.balanceOf(account).call();
         setBalance(balance);
      };
      getBalance();
   }, [account]);
   
   return (
      <div>
         <h1>ERC20</h1>
         <p>Balance: {balance}</p>
         <button onClick={handleTransfer}>Transfer</button>
         <button onClick={handleApprove}>Approve</button>
         <button onClick={handleTransferFrom}>Transfer From</button>
         <button onClick={handleCreate}>Create</button>
         <button onClick={handleDestroy}>Destroy</button>
         <button onClick={handleUpdate}>Update</button>
      </div>
   );
}
   
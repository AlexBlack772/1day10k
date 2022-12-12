import react from 'react';
import useState from 'react';
import ethers from 'ethers';

const senpuuki = () => {

   const provider = new ethers.providers.Web3Provider(window.ethereum);
   const signer = provider.getSigner();
   const vendingmachineFctry = new ethers.ContractFactory(
     "VendingMachine",
     abi,
     signer
   );
   const money = new ethers.Contract(
      "0x5FbDB231567"
      
   )

   const handleStart = async () => {
   }

   const handleStop = async () => {
   }




   return (
      <div>
         <h1>Sen Puuki</h1>

         <p>my money : { }</p>
      </div>
   )
}

export default senpuuki;

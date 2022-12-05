import react from 'react';
import useState from 'react';
import ethers from 'ethers';

const VendingMachine = () => {
   const vendingmachineFctry = new ethers.ContractFactory(
     "VendingMachine",
     abi,
     signer
   );
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   const signer = provider.getSigner();
   

   const myMoney = vendingmachineFctry.getBalance();
   const contract = money.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");

   //const [myMoney, setMyMoney] = useState(0);
   const [item, setItem] = useState('');

   const handleBuy = () => {
      setItem('item');
   }
   
   const handleCancel = () => {
      setItem('');  
   }

   return (
      <div>
         <h1>Vending Machine</h1>
         <button onClick={handleBuy}>Buy</button>
         <p>{item}</p>
         <button onClick={handleCancel}>Cancel</button>
         <p>my money : { myMoney}</p>
      </div>
   )

}

export default VendingMachine;
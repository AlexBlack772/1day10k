import react from 'react';
import ethers from 'ethers';

const Debit = () => {

   const [balance, setBalance] = useState(0);
   const [amount, setAmount] = useState(0);
   const [address, setAddress] = useState('');
   const [message, setMessage] = useState('');
   
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   const signer = provider.getSigner();
   const contract = new ethers.Contract(
      '0x5FbDB2315678afecb367f032d93F642f64180aa3',   
      ['function balanceOf(address owner) view returns (uint256)',
         'function transfer(address to, uint amount) returns (boolean)'],
      signer
   );

   return (
      <div>
         <h1>Debit</h1>
         <p>Balance: {balance}</p>
         <p>Amount: {amount}</p>
         <p>Address: {address}</p>
         <p>Message: {message}</p>
      </div>
   );
}
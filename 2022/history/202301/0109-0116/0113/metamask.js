//
// This function detects most providers injected at window.ethereum
import detectEthereumProvider from '@metamask/detect-provider';

const provider = await detectEthereumProvider();

if (provider) {
   // From now on, this should always be true:
   // provider === window.ethereum
   startApp(provider); // initialize your app
} else {
   console.log('Please install MetaMask!');
}

//
interface RequestArguments {
   method: string;
   params?: unknown[] | object;
}

ethereum.request(args: RequestArguments): Promise < unknown >;

params: [
   {
      from: '0xb60e8dd61c5d32be8058bb8eb970870f07233155',
      to: '0xd46e8dd67c5d32be8058bb8eb970870f07244567',
      gas: '0x76c0', // 30400
      gasPrice: '0x9184e72a000', // 10000000000000
      value: '0x9184e72a', // 2441406250
      data:
         '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675',
   },
];

ethereum
   .request({
      method: 'eth_sendTransaction',
      params,
   })
   .then((result) => {
      // The result varies by RPC method.
      // For example, this method will return a transaction hash hexadecimal string on success.
   })
   .catch((error) => {
      // If the request fails, the Promise will reject with an error.
   });

interface ConnectInfo {
   chainId: string;
}

ethereum.on('connect', handler: (connectInfo: ConnectInfo) => void);


interface ProviderRpcError extends Error {
   message: string;
   code: number;
   data?: unknown;
}

/*****************************************/
/* Detect the MetaMask Ethereum provider */
/*****************************************/

import detectEthereumProvider from '@metamask/detect-provider';

// this returns the provider, or null if it wasn't detected
const provider = await detectEthereumProvider();

if (provider) {
   startApp(provider); // Initialize your app
} else {
   console.log('Please install MetaMask!');
}

function startApp(provider) {
   // If the provider returned by detectEthereumProvider is not the same as
   // window.ethereum, something is overwriting it, perhaps another wallet.
   if (provider !== window.ethereum) {
      console.error('Do you have multiple wallets installed?');
   }
   // Access the decentralized web!
}

/**********************************************************/
/* Handle chain (network) and chainChanged (per EIP-1193) */
/**********************************************************/

const chainId = await ethereum.request({ method: 'eth_chainId' });
// Do something with the chainId

ethereum.on('chainChanged', handleChainChanged);

function handleChainChanged(_chainId) {
   // We recommend reloading the page, unless you must do otherwise
   window.location.reload();
}

/***********************************************************/
/* Handle user accounts and accountsChanged (per EIP-1193) */
/***********************************************************/

let currentAccount = null;
ethereum
   .request({ method: 'eth_accounts' })
   .then(handleAccountsChanged)
   .catch((err) => {
      // Some unexpected error.
      // For backwards compatibility reasons, if no accounts are available,
      // eth_accounts will return an empty array.
      console.error(err);
   });

// Note that this event is emitted on page load.
// If the array of accounts is non-empty, you're already
// connected.
ethereum.on('accountsChanged', handleAccountsChanged);

// For now, 'eth_accounts' will continue to always return an array
function handleAccountsChanged(accounts) {
   if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
   } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
      // Do any other work!
   }
}

/*********************************************/
/* Access the user's accounts (per EIP-1102) */
/*********************************************/

// You should only attempt to request the user's accounts in response to user
// interaction, such as a button click.
// Otherwise, you popup-spam the user like it's 1999.
// If you fail to retrieve the user's account(s), you should encourage the user
// to initiate the attempt.
document.getElementById('connectButton', connect);

// While you are awaiting the call to eth_requestAccounts, you should disable
// any buttons the user can click to initiate the request.
// MetaMask will reject any additional requests while the first is still
// pending.
function connect() {
   ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(handleAccountsChanged)
      .catch((err) => {
         if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            console.log('Please connect to MetaMask.');
         } else {
            console.error(err);
         }
      });
}
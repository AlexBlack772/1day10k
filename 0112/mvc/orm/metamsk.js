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


//
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

ethereum.on('accountsChanged', (accounts) => {
   // Handle the new accounts, or lack thereof.
   // "accounts" will always be an array, but it can be empty.
});

ethereum.on('chainChanged', (chainId) => {
   // Handle the new chain.
   // Correctly handling chain changes can be complicated.
   // We recommend reloading the page unless you have good reason not to.
   window.location.reload();
});

interface ProviderMessage {
   type: string;
   data: unknown;
}

ethereum.on('message', handler: (message: ProviderMessage) => void);



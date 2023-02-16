const [state, setState] = useState(initialState);

setState(newState);

function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
    </>
  );
}

//
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});


//
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // Clean up the subscription
    subscription.unsubscribe();
  };
});

//
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    subscription.unsubscribe();
  };
}, [props.source]);

//
const value = useContext(MyContext);

//
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}


//
const [state, dispatch] = useReducer(reducer, initialArg, init);

//
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}

//
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

//
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

//
const refContainer = useRef(initialValue);

//
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}

//
useImperativeHandle(ref, createHandle, [deps]);

//
import { useRouter } from "next/router";

function ActiveLink({ children, href }) {
  const router = useRouter();
  const style = {
    marginRight: 10,
    color: router.asPath === href ? "red" : "black",
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  );
}

export default ActiveLink;

//
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/about')}>
      Click me
    </button>
  )
}

//
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/post/abc')}>
      Click me
    </button>
  )
}

//
import { useEffect } from 'react'
import { useRouter } from 'next/router'

// Here you would fetch and return the user
const useUser = () => ({ user: null, loading: false })

export default function Page() {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!(user || loading)) {
      router.push('/login')
    }
  }, [user, loading])

  return <p>Redirecting...</p>
}

//
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Page(props) {
  const router = useRouter()
  const [count, setCount] = useState(0)
  return (
    <div>
      <h1>Page: {router.query.slug}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase count</button>
      <Link href="/one">one</Link> <Link href="/two">two</Link>
    </div>
  )
}

//
import { useRouter } from 'next/router'

export default function ReadMore({ post }) {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => {
        router.push({
          pathname: '/post/[pid]',
          query: { pid: post.id },
        })
      }}
    >
      Click here to read more
    </button>
  )
}

//
import * as React from "react";
import * as ReactDOMClient from "react-dom/client";
import { Box, ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <Box padding={4}>
      <Box height="40px" bg="tomato" />
      <Box height="40px" bg="green.300" />
    </Box>
  );
}

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

//
import { chain, defaultChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";

// API key for Ethereum node
// Two popular services are Infura (infura.io) and Alchemy (alchemy.com)
const infuraId = process.env.INFURA_ID;

// Chains for connectors to support
const chains = defaultChains;

// Set up connectors
export const connectors = ({ chainId }) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0];
  return [
    new WalletLinkConnector({
      options: {
        appName: "My wagmi app",
        jsonRpcUrl: `${rpcUrl}/${infuraId}`
      }
    }),
    new WalletConnectConnector({
      options: {
        infuraId,
        qrcode: true
      }
    }),
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true }
    })
  ];
};

//
import {
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Image
} from "@chakra-ui/react";
import { useConnect } from "wagmi";

export default function SelectWalletModal({ isOpen, closeModal }) {
  const [{ data, error }, connect] = useConnect();

  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent w="300px">
        <ModalHeader>Select Wallet</ModalHeader>
        <ModalCloseButton
          _focus={{
            boxShadow: "none"
          }}
        />
        <ModalBody paddingBottom="1.5rem">
          <VStack>
            <Button
              variant="outline"
              onClick={() => {
                connect(data.connectors[0]);
                closeModal();
              }}
              w="100%"
            >
              <HStack w="100%" justifyContent="center">
                <Image
                  src="/cbw.png"
                  alt="Coinbase Wallet Logo"
                  width={25}
                  height={25}
                  borderRadius="3px"
                />
                <Text>Coinbase Wallet</Text>
              </HStack>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                connect(data.connectors[1]);
                closeModal();
              }}
              w="100%"
            >
              <HStack w="100%" justifyContent="center">
                <Image
                  src="/wc.png"
                  alt="Wallet Connect Logo"
                  width={26}
                  height={26}
                  borderRadius="3px"
                />
                <Text>Wallet Connect</Text>
              </HStack>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                connect(data.connectors[2]);
                closeModal();
              }}
              w="100%"
            >
              <HStack w="100%" justifyContent="center">
                <Image
                  src="/mm.png"
                  alt="Metamask Logo"
                  width={25}
                  height={25}
                  borderRadius="3px"
                />
                <Text>Metamask</Text>
              </HStack>
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

//
export const truncateAddress = (address) => {
  if (!address) return "No Account";
  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const toHex = (num) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};

//
import dynamic from "next/dynamic";

const MetaMaskCard = dynamic(
  () => import("../components/connectors/MetaMask"),
  { ssr: false }
);
const WalletConnectCard = dynamic(
  () => import("../components/connectors/WalletConnect"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <div
        style={{ display: "flex", flexFlow: "wrap", fontFamily: "sans-serif" }}
      >
        <MetaMaskCard />
        <WalletConnectCard />
      </div>
    </>
  );
}

//
import { useEffect, useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';
import { UseStore } from 'zustand';
import { Connector, Web3ReactState } from '@web3-react/types';
import { connectors } from '../connectors'
import "./styles.css";

function Status({
  connector,
  hooks,
}: {
  connector: Connector,
  hooks: UseStore<Web3ReactState>,
}) {
  const chainId = hooks.useChainId();
  const accounts = hooks.useAccounts();
  const error = hooks.useError();

  const connected = Boolean(chainId && accounts);

  return (
    <div>
      <b>{connector.constructor.name}</b>
      <br />
      {error ? (
        <>
          🛑 {error.name ?? 'Error'}: {error.message}
        </>
      ) : connected ? (
        <>✅ Connected</>
      ) : (
        <>⚠️ Disconnected</>
      )}
    </div>
  )
}

function ChainId({ hooks }: { hooks: UseStore<Web3ReactState> }) {
  const chainId = hooks.useChainId()

  return <div>Chain Id: {chainId ? <b>{chainId}</b> : '-'}</div>
}

function Accounts({
  connector,
  hooks,
}: {
  connector: Connector,
  hooks: UseStore<Web3ReactState>,
}) {
  const accounts = hooks.useAccounts();
  const ENSNames = hooks.useENSNames();

  const provider = hooks.useProvider();
  const [balances, setBalances] = useState(undefined);
  useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false

      Promise.all(accounts.map((account) => provider.getBalance(account))).then((balances) => {
        if (!stale) {
          setBalances(balances)
        }
      })

      return () => {
        stale = true
        setBalances(undefined)
      }
    }
  }, [accounts, provider])

  return (
    <div>
      Accounts:
      {accounts === undefined
        ? ' -'
        : accounts.length === 0
        ? ' None'
        : accounts?.map((account, i) => (
            <ul key={account} style={{ margin: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <b>{ENSNames?.[i] ?? account}</b>
              {balances?.[i] ? ` (Ξ${formatEther(balances[i])})` : null}
            </ul>
          ))}
    </div>
  )
}

function Connect({ connector, hooks }: { connector: Connector; hooks: UseStore<Web3ReactState> }) {
console.log('connector', connector);
console.log('hooks', hooks);
console.log('connector.deactivate', connector.activate);

  const activating = hooks.useIsActivating()
  const error = hooks.useError()

  const chainId = hooks.useChainId()
  const accounts = hooks.useAccounts()
  const connected = Boolean(chainId && accounts)

  if (error) {
    return (
      <button
        onClick={() => {
          connector.activate()
        }}
      >
        Try Again?
      </button>
    )
  } else if (connected) {
    return (
      <>
        <button
          onClick={() => {
            if (connector?.deactivate) {
              connector.deactivate()
            }
          }}
          disabled={connector.deactivate ? false : true}
        >
          {connector.deactivate ? 'Disconnect' : 'Connected'}
        </button>
        <br />
        <button
          onClick={() => connector.deactivate()}
        >
          Disconnect
        </button>
      </>
    )
  } else {
    return (
      <button
        onClick={() => {
          if (!activating) {
            connector.activate()
          }
        }}
        disabled={activating ? true : false}
      >
        {activating ? 'Connecting...' : 'Activate'}
      </button>
    )
  }
}

export default function App() {

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
      {connectors.map(([connector, hooks], i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '20rem',
            padding: '1rem',
            margin: '1rem',
            overflow: 'auto',
            border: '1px solid',
            borderRadius: '1rem',
          }}
        >
          <div>
            <Status connector={connector} hooks={hooks} />
            <br />
            <ChainId hooks={hooks} />
            <Accounts connector={connector} hooks={hooks} />
            <br />
          </div>
          <Connect connector={connector} hooks={hooks} />
        </div>
      ))}
    </div>
    </div>
  );
}

//
import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";

export const [metaMask, useMetaMask] = initializeConnector<MetaMask>(
  (actions) => new MetaMask(actions)
);

//
import { initializeConnector } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect";
import { URLS } from "./urls";

// export const [walletConnect, useWalletConnect] = initializeConnector<WalletConnect>((actions) => new WalletConnect(actions), [
//   {
//     // rpc: { 1: URLS[0] },
//     rpc: { 3: 'https://staging.orionprotocol.io/rpc' },
//   },
// ])

export const [walletConnect, useWalletConnect] = initializeConnector<
  WalletConnect
>(
  (actions) =>
    new WalletConnect(actions, {
      rpc: Object.keys(URLS).reduce((accumulator, chainId) => {
        accumulator[chainId] = URLS[Number(chainId)][0];
        return accumulator;
      }, {})
    }),
  Object.keys(URLS).map((chainId) => Number(chainId))
);

//
import "./styles.css";
import { ethers } from "ethers";
import { SigningKey } from "@ethersproject/signing-key";
import { TypedDataUtils } from "ethers-eip712";

const typedData = {
  types: {
    EIP712Domain: [
      {
        name: "name",
        type: "string"
      },
      {
        name: "version",
        type: "string"
      },
      {
        name: "verifyingContract",
        type: "address"
      }
    ],
    set: [
      {
        name: "Action",
        type: "string"
      },
      {
        name: "Account",
        type: "address"
      },
      {
        name: "MekaCount",
        type: "uint256"
      },
      {
        name: "Timestamp",
        type: "uint256"
      }
    ]
  },
  primaryType: "set",
  domain: {
    name: "MekaVerse",
    version: "1.0",
    verifyingContract: "0xcdA2B1ec7819Ca1287773C1C90e09b2D2AAa41A4"
  },
  message: {
    Action: "Mekaverse - Registration",
    Account: "0xd45E8Cbb5A04C5e98CEb29d8ad9147Ee0D0F3Ec2",
    MekaCount: 1,
    Timestamp: 1633467780
  }
};

const main = async () => {
  const digest = TypedDataUtils.encodeDigest(typedData);
  const digestHex = ethers.utils.hexlify(digest);

  await window.ethereum.enable();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const myAccount = await signer.getAddress();

  const signature = await signer.provider.send("eth_signTypedData_v4", [
    myAccount,
    JSON.stringify(typedData)
  ]);
  document.getElementById("app").innerHTML = `Signature: ${signature}`;

  // const pk =
  //   "0xff1bc01d7c7afd2a552c0a0ff89dea527484fb97a143469eaaa941b6b4536104";
  // const signingKey = new SigningKey(pk);
  // let signature = signingKey.signDigest(digest);

  // const attestation = `${signature.r.substring(2)}${signature.s.substring(
  //   2
  // )}${signature.v.toString(16)}`;

  // document.getElementById("app").innerHTML = `Attestation: ${attestation}`;
};

main();

//
import { useState, useEffect } from 'react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import Image from 'next/image'

import Button from './button'
import Spinner from './spinner'
import AddressPill from './addressPill'
import DarkModeToggle from './darkModeToggle'
import ConnectWallet from './connectWalletModal'

interface IFeatureSectionProps {
  title: string
  description: string
  bgColorOverride?: string
}

const FeatureSection: React.FC<IFeatureSectionProps> = ({ title, description, children, bgColorOverride }) => {
  return (
    <div className="shadow-md rounded-md border border-solid light:border-gray-200 dark:border-gray-500 grid grid-rows-1 md:grid-cols-2 gap-2 overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 light:text-gray-800"> {title}</h2>
        <p className="light:text-gray-600">{description}</p>
      </div>
      <div className={'bg-gray-500 py-10 md:p-0 flex justify-center items-center ' + bgColorOverride}>{children}</div>
    </div>
  )
}

export const WalletConnectSection: React.FC<{}> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <FeatureSection
      title="Multiwallet Support"
      description="Web 3 starter project is set up to work with MetaMask & Wallet Connect to support the widest 
      variety of wallets providers. More coming soon."
      bgColorOverride="bg-red-500"
    >
      <div className="flex space-x-4">
        <div className="p-2 shadow-md bg-white rounded-md">
          <Image alt="Metamask logo" src="/metamask.svg" width="50" height="50" />
        </div>
        <div className="p-2 shadow-md bg-white rounded-md">
          <Image alt="Wallet connect logo" src="/wallet-connect.svg" width="50" height="50" />
        </div>
      </div>
    </FeatureSection>
  )
}

export const ENSSection: React.FC<{}> = () => {
  const [isBtnShown, setisBtnShown] = useState(true)
  const [isButtonLoading, setButtonLoading] = useState(false)

  const clickButton = () => {
    setButtonLoading(true)
    setTimeout(() => {
      setisBtnShown(false)
    }, 1000)
  }

  const startAnimation = () => {
    setTimeout(() => {
      clickButton()
    }, 3000)
  }

  useEffect(() => {
    startAnimation()
  })

  return (
    <FeatureSection
      title="ENS Resolution"
      description="ENS is the most widely integrated blockchain naming standard and is a growing network of usernames. Web 3
    Starter has ENS support out of the box."
      bgColorOverride="bg-yellow-400"
    >
      <div className="p-4 md:px-8 shadow-md bg-white rounded-md">
        {isBtnShown ? (
          <Button onClick={startAnimation} isLoading={isButtonLoading}>
            Connect Wallet
          </Button>
        ) : (
          <AddressPill address={'0xd6CB70a88bB0D8fB1be377bD3E48e603528AdB54'} ensName={'faraaz.eth'} balance={'25'} />
        )}
      </div>
    </FeatureSection>
  )
}

export const TxStatesSection: React.FC<{}> = () => {
  const [isLoading, setLoading] = useState(true)

  const completeTx = () => {
    setLoading(false)
  }

  useEffect(() => {
    setTimeout(() => {
      completeTx()
    }, 7000)
  }, [])

  return (
    <FeatureSection
      title="Transaction States"
      description="Transaction states are mapped to user-friendly toasts to give the user feedback on the state of their transaction."
      bgColorOverride="bg-blue-700"
    >
      <div className="p-4 px-4 shadow-md bg-white rounded-md flex">
        {isLoading ? (
          <>
            <Spinner />
            <span className="ml-2 dark:text-black">Transaction processing</span>
          </>
        ) : (
          <>
            <CheckCircleIcon fill="#079669" className="h-6 w-6" />
            <span className="ml-1 dark:text-black">Transaction confirmed</span>
          </>
        )}
      </div>
    </FeatureSection>
  )
}

export const GMModeSection: React.FC<{}> = () => {
  return (
    <FeatureSection
      title="GM Mode... Obviously."
      description="It's 2021 — can you really ship a product without dark mode?"
      bgColorOverride="bg-purple-700"
    >
      <div className="p-4 px-8 shadow-md bg-white rounded-md">
        <DarkModeToggle />
      </div>
    </FeatureSection>
  )
}

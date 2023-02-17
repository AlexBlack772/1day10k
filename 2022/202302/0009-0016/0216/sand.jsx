export default function handler(req, res) {
  const { pid } = req.query;
  res.end(`Post: ${pid}`);
}

//
import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiResponse } from 'next'

/**
 * This sets `cookie` using the `res` object
 */

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if (typeof options.maxAge === 'number') {
    options.expires = new Date(Date.now() + options.maxAge * 1000)
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, options))
}

// pages/api/cookies.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from '../../utils/cookies'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // Calling our pure function using the `res` object, it will add the `set-cookie` header
  // Add the `set-cookie` header on the main domain and expire after 30 days
  setCookie(res, 'Next.js', 'api-middleware!', { path: '/', maxAge: 2592000 })
  // Return the `set-cookie` header so we can display it in the browser and show that it works!
  res.end(res.getHeader('Set-Cookie'))
}

export default handler

//
import { NextApiRequest, NextApiResponse } from 'next'
import { withFoo } from 'external-lib-foo'

type NextApiRequestWithFoo = NextApiRequest & {
  foo: (bar: string) => void
}

const handler = (req: NextApiRequestWithFoo, res: NextApiResponse) => {
  req.foo('bar') // we can now use `req.foo` without type errors
  res.end('ok')
}

export default withFoo(handler)

//
export default async function handler(req, res) {
  try {
    const result = await someAsyncOperation()
    res.status(200).send({ result })
  } catch (err) {
    res.status(500).send({ error: 'failed to fetch data' })
  }
}

//
export default async function handler(req, res) {
  const { name, message } = req.body
  try {
    await handleFormInputAsync({ name, message })
    res.redirect(307, '/')
  } catch (err) {
    res.status(500).send({ error: 'failed to fetch data' })
  }
}

//
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}

//
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}

//
import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  return new Response(
    JSON.stringify({
      name: 'Jim Halpert',
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  )
}

//
import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  return new Response(email)
}

//
import { type NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  const authorization = req.cookies.get('authorization')?.value
  return fetch('https://backend-api.com/api/protected', {
    method: req.method,
    headers: {
      authorization,
    },
    redirect: 'manual',
  })
}

//
import { NextResponse } from 'next/server'

export const config = {
  regions: ['sfo1', 'iad1'], // defaults to 'all'
}

export default async function handler(req: NextRequest) {
  const myData = await getNearbyData()
  return NextResponse.json(myData)
}

//
// pages/profile.js

import useUser from '../lib/useUser'
import Layout from '../components/Layout'

const Profile = () => {
  // Fetch the user client-side
  const { user } = useUser({ redirectTo: '/login' })

  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>
  }

  // Once the user request finishes, show the user
  return (
    <Layout>
      <h1>Your Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Layout>
  )
}

export default Profile

//
import withSession from '../lib/session'
import Layout from '../components/Layout'

export const getServerSideProps = withSession(async function ({ req, res }) {
  const { user } = req.session

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { user },
  }
})

const Profile = ({ user }) => {
  // Show the user. No loading state is required
  return (
    <Layout>
      <h1>Your Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Layout>
  )
}

export default Profile

//
export default function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body

  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log('body: ', body)

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.first || !body.last) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: 'First or last name not found' })
  }

  // Found the name.
  // Sends a HTTP success code
  res.status(200).json({ data: `${body.first} ${body.last}` })
}

//
export default function PageWithJSbasedForm() {
  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const data = {
      first: event.target.first.value,
      last: event.target.last.value,
    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)

    // API endpoint where we send form data.
    const endpoint = '/api/form'

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    alert(`Is this your full name: ${result.data}`)
  }
  return (
    // We pass the event to the handleSubmit() function on submit.
    <form onSubmit={handleSubmit}>
      <label htmlFor="first">First Name</label>
      <input type="text" id="first" name="first" required />

      <label htmlFor="last">Last Name</label>
      <input type="text" id="last" name="last" required />

      <button type="submit">Submit</button>
    </form>
  )
}

//
import { initializeConnector } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect";
import { URLS } from "./chains";

export const [walletConnect, hooks] = initializeConnector<WalletConnect>(
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
import type { Web3ReactHooks } from "@web3-react/core";
import type { Connector } from "@web3-react/types";

export function Connect({
  activate,
  deactivate,
  isActivating,
  error,
  isActive
}: {
  activate: Connector["activate"];
  deactivate: Connector["deactivate"];
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  error: ReturnType<Web3ReactHooks["useError"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
}) {
  if (error) return <button onClick={activate}>Try Again?</button>;
  if (isActive) return <button onClick={deactivate}>Disconnect</button>;

  return (
    <button
      onClick={isActivating ? undefined : activate}
      disabled={isActivating}
    >
      Connect
    </button>
  );
}

//
import type { Web3ReactHooks } from "@web3-react/core";

export function Status({
  isActivating,
  error,
  isActive
}: {
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  error: ReturnType<Web3ReactHooks["useError"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
}) {
  return (
    <div>
      {error ? (
        <>
          🔴 {error.name ?? "Error"}
          {error.message ? `: ${error.message}` : null}
        </>
      ) : isActivating ? (
        <>🟡 Connecting</>
      ) : isActive ? (
        <>🟢 Connected</>
      ) : (
        <>⚪️ Disconnected</>
      )}
    </div>
  );
}

//
import type { Web3ReactHooks } from "@web3-react/core";
import { CHAINS } from "../connectors/chains";

export function Chain({
  chainId
}: {
  chainId: ReturnType<Web3ReactHooks["useChainId"]>;
}) {
  if (chainId === undefined) return null;

  const name = chainId ? CHAINS[chainId]?.name : undefined;

  if (name) {
    return (
      <div>
        Chain:{" "}
        <b>
          {name} ({chainId})
        </b>
      </div>
    );
  }

  return (
    <div>
      Chain Id: <b>{chainId}</b>
    </div>
  );
}

//
import type { BigNumber } from "@ethersproject/bignumber";
import { formatEther } from "@ethersproject/units";
import type { Web3ReactHooks } from "@web3-react/core";
import { useEffect, useState } from "react";

function useBalances(
  provider?: ReturnType<Web3ReactHooks["useProvider"]>,
  accounts?: string[]
): BigNumber[] | undefined {
  const [balances, setBalances] = useState<BigNumber[] | undefined>();

  useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false;

      void Promise.all(
        accounts.map((account) => provider.getBalance(account))
      ).then((balances) => {
        if (!stale) {
          setBalances(balances);
        }
      });

      return () => {
        stale = true;
        setBalances(undefined);
      };
    }
  }, [provider, accounts]);

  return balances;
}

export function Accounts({
  accounts,
  provider,
  ENSNames
}: {
  accounts: ReturnType<Web3ReactHooks["useAccounts"]>;
  provider: ReturnType<Web3ReactHooks["useProvider"]>;
  ENSNames: ReturnType<Web3ReactHooks["useENSNames"]>;
}) {
  const balances = useBalances(provider, accounts);

  if (accounts === undefined) return null;

  return (
    <div>
      Accounts:{" "}
      <b>
        {accounts.length === 0
          ? "None"
          : accounts?.map((account, i) => (
              <ul
                key={account}
                style={{
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {ENSNames?.[i] ?? account}
                {balances?.[i] ? ` (Ξ${formatEther(balances[i])})` : null}
              </ul>
            ))}
      </b>
    </div>
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

//
export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="alert alert-error mt-5">
      <div className="flex-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-6 h-6 mx-2 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
          ></path>
        </svg>
        <label>{message}</label>
      </div>
    </div>
  );
}

//
import { Fragment, useState, useEffect } from "react";
import "./styles.css";
import WebFont from "webfontloader";

//importing icons
import { FaTimes, FaCaretDown } from "react-icons/fa";

import Sidebar from "./patterns/sidebar";
import { Coins } from "./coinList";
import { defaultCoins } from "./defaultCoinList";

import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { abi } from "./pancakeabi.js";
import { ChainId, Token, WETH, Fetcher, Route } from "@pancakeswap-libs/sdk";
import ethers from "@ethersproject/providers";

//importing media assets
import info from "./assets/icons/info.svg";
import mode from "./assets/mode.svg";
import searchImg from "./assets/icons/search.svg";
import wallet from "./assets/icons/wallet.svg";
import menu from "./assets/icons/menu.svg";
import down from "./assets/icons/down.svg";
import exchange from "./assets/icons/swap.svg";
import logolandscape from "./assets/logo/logolandscape.png";
//import { getDefaultProvider, JsonRpcProvider } from "@ethersproject/providers";
import { BscConnector } from "@binance-chain/bsc-connector";
var UrlJsonRpcProvider = require("@ethersproject/providers");
var Provider = require("@ethersproject/providers");

export default function App() {
  const [myData, setMyData] = useState({ connect: "", theme: false });
  const [darkTheme, setDarkTheme] = useState(false);
  const [results, setResults] = useState();
  const [fromCoin, setFromCoin] = useState("BUSD");
  const [toCoin, setToCoin] = useState("USDT");
  const [fromAddress, setFromAddress] = useState(
    "0xe9e7cea3dedca5984780bafc599bd69add087d56"
  );
  const [toAddress, setToAddress] = useState(
    "0x55d398326f99059ff775485246999027b3197955"
  );
  const [amountIn, setAmountIn] = useState(null);
  const [amountOut, setAmountOut] = useState(null);
  const [isModalOpenOne, setModalStateOne] = useState(false);
  const [isModalOpenTwo, setModalStateTwo] = useState(false);
  const [price, setPrice] = useState(0);
  const [methodType, setMethodType] = useState("Direct");
  const [sidebarActive, setSidebarActive] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      setDarkTheme(data.theme);
    }
  }, []);

  const Ether = new Provider.StaticJsonRpcProvider(
    "https://bsc-dataseed3.defibit.io"
  );
  // useEffect(() => {
  //     localStorage.setItem('user', JSON.stringify(myData));
  //   }, [myData]);
  async function constructor() {
    const provider = new Web3(
      new Web3.providers.HttpProvider("https://bsc-dataseed3.defibit.io")
    );

    //console.log(Provider);

    console.log(Ether);

    // const providers =
    await detectEthereumProvider(provider);
    await window.ethereum.enable(provider);
    //console.log(providers);
    console.log("clicked");
  }
  WebFont.load({
    custom: {
      families: ["gilroy-medium"],
      urls: ["./assets/fonts/Gilroy-Medium.ttf"]
    }
  });

  // function test() {}

  // const pancake = new web3.eth.Contract(
  //abi,
  //"0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F"
  //);

  const mapp = Coins.map((coin) => coin).filter(
    (fil) => fil.symbol !== fromCoin && fil.symbol !== toCoin
  );
  var out = [];
  var check = [];
  var singleHop = [];
  var final = [];
  var best = 0;
  var temp = 0;
  var tem;

  //multihop
  var multiHopLevelOne = [];
  var multiHopLevelTwo = [];
  var multiHopLevelThree = [];
  var multiHopFinal = [];
  var finalPriceList = [];
  var finalPriceListSymbol = [];

  const handleThemeToggler = async () => {
    setDarkTheme(!darkTheme);
    setMyData({ theme: darkTheme });
    localStorage.setItem("user", JSON.stringify(myData));
  };

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  // async function setLocalData() {
  //   setMyData({ theme: darkTheme });
  //   console.log(myData);
  // }

  /**============ Direct Pair ==============**/
  async function directPair(value) {
    // var amt = (value * Math.pow(10, 18)).toString();
    tem = await pancake.methods
      .getAmountsOut((value * Math.pow(10, 18)).toString(), [
        fromAddress,
        toAddress
      ])
      .call();

    console.log(tem[1] / Math.pow(10, 18));
    setAmountOut((tem[1] / Math.pow(10, 18)).toString());
    return tem[1] / Math.pow(10, 18);
  }
  /**============ Direct Pair ==============**/

  var Pairi = [];
  var Pair2 = [];
  var Pair3 = [];

  /**================ SINGLE HOP =================== */
  async function singleHopMethod(value) {
    // const network = new ethers.providers.Web3Provider(web3);
    console.log("entered");
    mapp.map(async (val, index) => {
      const StartCheck = Web3.utils.toChecksumAddress(fromAddress);
      var InterCheck = Web3.utils.toChecksumAddress(Coins[index].address);

      var Tost = new Token(
        ChainId.MAINNET,
        InterCheck,
        18,
        Coins[index].symbol,
        Coins[index].name
      );

      var Inter = new Token(
        ChainId.MAINNET,
        StartCheck,
        18,
        "BUSD",
        "BUSD Token"
      );

      //const Inter = new Token(ChainId.MAINNET);

      try {
        temp = await Fetcher.fetchPairData(Inter, Tost, Ether);

        Pairi.push(temp);
        //console.log(Pairi);
      } catch {}

      //const
    });
    await thirdLevel();
    //console.log(Pairi);
    async function thirdLevel() {
      console.log("2nd entered");
      mapp.map(async (val, index) => {
        var EndCheck = Web3.utils.toChecksumAddress(toAddress);
        var InterCheck = Web3.utils.toChecksumAddress(Coins[index].address);

        const TokenB = new Token(
          ChainId.MAINNET,
          EndCheck,
          18,
          "USDT",
          "Tether USD"
        );

        const TokenA = new Token(
          ChainId.MAINNET,
          InterCheck,
          18,
          Coins[index].symbol,
          Coins[index].name
        );

        try {
          temp = await Fetcher.fetchPairData(TokenA, TokenB, Ether);
          Pair2.push(temp);

          //console.log(Pairi);
        } catch {}
      });
      console.log(Pair2);

      await nextLevel();
    }
    async function nextLevel() {
      console.log("3rd entered");
      //console.log(Pairi, Pair2);
      var mappp = mapp.map(async (val, index) => {
        console.log("2");
        const TokenA = mapp[index].tokenAmounts[0].currency;
        console.log(TokenA);
        // console.log("e");
      });

      // const TokenA = pairi[i].tokenAmounts[0].currency;
      //   console.log("e");
      // }
    }
  }

  // //let amt = (value * Math.pow(10, 18)).toString();
  // await Promise.all(
  //   mapp.map(async (val, index) => {
  //     const StartCheck = Web3.utils.toChecksumAddress(fromAddress);
  //     const InterCheck = Web3.utils.toChecksumAddress(val.address);
  //     const EndCheck = Web3.utils.toChecksumAddress(toAddress);
  //     try {
  //       const StartToken = new Token(ChainId.MAINNET, StartCheck, 18)

  //       const interToken = new Token(
  //         ChainId.MAINNET,
  //         InterCheck,
  //         val.symbol,
  //         val.name
  //       );
  //       console.log(interToken);

  //       const EndToken = new Token(ChainId.MAINNET, EndCheck, 18);

  //       // if (val.symbol === "ETH") {
  //       //   const StartInter = await Fetcher.fetchPairData(
  //       //     StartToken,
  //       //     WETH[ChainId.MAINNET]
  //       //   );
  //       //   const InterEnd = await Fetcher.fetchPairData(WETH[ChainId.MAINNET]);
  //       //   const route = new Route(
  //       //     [InterEnd, StartInter],
  //       //     WETH[ChainId.MAINNET]
  //       //   );
  //       //   console.log(val.symbol, route.midPrice.toSignificant(18));
  //       // } else {
  //       console.log("fetch1");
  //       const StartInter = await Fetcher.fetchPairData(
  //         StartToken,
  //         interToken,
  //         web3
  //       );
  //       console.log("fetch2");
  //       const InterEnd = await Fetcher.fetchPairData(interToken, EndToken);
  //       console.log("Route");
  //       const route = new Route([InterEnd, StartInter]);
  //       console.log(val.symbol, route.midPrice.toSignificant(18));
  //       //}

  //       // tem = await pancake.methods
  //       //   .getAmountsOut(amt, [fromAddress, val.address, toAddress])
  //       //   .call();

  //       // check.push(val);
  //       // singleHop.push(tem[2] / Math.pow(10, 18), val.symbol);

  //       // if (tem[2] / Math.pow(10, 18) > temp) {
  //       //   temp = tem[2] / Math.pow(10, 18);
  //       //   console.log(temp, val.symbol);
  //       //   setPrice(temp);
  //       //   setAmountOut(temp);
  //       // }
  //     } catch {
  //       console.log(Error);
  //     }
  //     return 0;
  //   })
  // );
  //}
  /**================ SINGLE HOP =================== */

  /**================ MULTI HOP =================== */
  //Multi Hop Level One
  async function multiHop(value) {
    await Promise.all(
      mapp.map(async (levelOne, index) => {
        try {
          tem = await pancake.methods
            .getAmountsOut("1000000000000000000", [
              fromAddress,
              levelOne.address
            ])
            .call();

          multiHopLevelOne.push(levelOne);
        } catch {
          //console.log("err");
        }
        return;
      })
    );
    await multiHopTwo();
  }

  //Multi Hop Level Two
  async function multiHopTwo() {
    await Promise.all(
      mapp.map(async (levelTwo, index) => {
        try {
          tem = await pancake.methods
            .getAmountsOut("1000000000000000000", [
              multiHopLevelOne[index].address,
              levelTwo.address
            ])
            .call();

          multiHopLevelTwo.push(levelTwo);
        } catch {
          //console.log("err");
        }
        return;
      })
    );
    await multiHopThree();
  }

  //Multi Hop Level Three
  async function multiHopThree() {
    console.log("level3 Entered");
    await Promise.all(
      multiHopLevelTwo.map(async (levelThree, index) => {
        try {
          tem = await pancake.methods
            .getAmountsOut("1000000000000000000", [
              levelThree.address,
              toAddress
            ])
            .call();
          multiHopLevelThree.push(levelThree);
        } catch {
          //console.log("err");
        }

        return 0;
      })
    );
    await finalFilter();
  }

  //finding best price
  function bests(arr) {
    var temp = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > temp) {
        temp = arr[i];
      }
    }
    return temp;
  }

  async function hasword(str, word) {
    return str.split(" ").includes(word);
  }

  async function bestpair(arrsymbol, arrpricelist) {
    for (let i = 0; i < arrsymbol.length; i++) {
      for (let j = 0; j < arrpricelist.length; j++) {
        if (hasword(arrsymbol[i], arrpricelist[j])) {
          console.log("555");
          console.log(arrsymbol[i], arrpricelist[j]);
        }
      }
    }
    return;
  }

  //getting the final best price list
  async function finalFilter() {
    for (var i = 0; i < multiHopLevelTwo.length; i++) {
      console.log("ENTERED looP");
      var temm = multiHopLevelTwo[i].symbol;
      console.log(temm);
      for (var j = 0; j < multiHopLevelThree.length; j++) {
        console.log("ENTERED 2looP");
        console.log(multiHopLevelThree[j].symbol);
        if (multiHopLevelThree[j].symbol === temm) {
          console.log("ENTERED IF");
          multiHopFinal = multiHopLevelThree;
          console.log(multiHopFinal);
          break;
        }
      }
    }
  }

  //Multi Hop finding best pair
  async function finalPrice(value) {
    let amt = (value * Math.pow(10, 18)).toString();
    console.log("finalprice");
    await Promise.all(
      multiHopLevelOne.map(async (levelone, indexOne) => {
        multiHopFinal.map(async (levelFinal, indexTwo) => {
          try {
            const a = levelone.address;
            const b = levelFinal.address;
            const temp = await pancake.methods
              .getAmountsOut(amt, [fromAddress, a, b, toAddress])
              .call();

            const teemp = temp[3] / Math.pow(10, 18);
            finalPriceList.push(teemp);
            var str = levelone.symbol.concat([
              " " + levelFinal.symbol + " " + teemp
            ]);
            finalPriceListSymbol.push(str);
            console.log(bestpair(finalPriceListSymbol, finalPriceList));
            setAmountOut(bests(finalPriceList));
            // console.log(finalPriceList, path1, path2.symbol);
          } catch {}
        });
        return;
      })
    );

    //empting all arrays
    multiHopLevelOne = [];
    multiHopLevelTwo = [];
    multiHopLevelThree = [];
    multiHopFinal = [];
    // finalPriceList = [];
    // finalPriceListSymbol = [];
  }
  /**================ MULTI HOP =================== */

  //fixing decimal numbers
  function getFlooredFixed(v, d) {
    return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
  }

  const list = [
    {
      id: 0,
      exchange: "Pancake swap",
      return: getFlooredFixed(amountOut, 2),
      price: isNaN(amountOut / amountIn)
        ? 0
        : getFlooredFixed(amountOut / amountIn, 2),
      fees: 10
    },

    {
      id: 1,
      exchange: "Acryptos",
      return: 224,
      price: 2,
      fees: 10
    }
  ];

  //swapping from and to of input
  function interchange() {
    setFromCoin(toCoin);
    setToCoin(fromCoin);
    setAmountOut(null);
    setAmountIn(null);
  }

  //handling user input
  const handleChange = async (e) => {
    setAmountIn(e.target.value);
    let val = e.target.value;
    if (methodType === "Direct") {
      const ret = await directPair(val);
      console.log(ret);
      console.log("direct");
    }
    if (methodType === "SingleHop") {
      console.log("single");
      await singleHopMethod(val);
    }
    if (methodType === "MultiHop") {
      console.log("multi");
      await multiHop();
      await finalPrice(val);
    }
  };

  async function swap() {
    alert("swapping success");
  }

  //rendering Header
  const renderHeader = (
    <div className={darkTheme ? "header dark" : "header"}>
      <div className="header-logo">
        <img src={menu} alt="menu" onClick={toggleSidebar} />
        <img src={logolandscape} alt="logolandscape" />
      </div>
      <div className="search-input">
        <img src={searchImg} alt="search" />
        <input type="text" placeholder="search by address, project or token" />
      </div>
      <div className="header-block">
        <img
          src={mode}
          alt="mode"
          onClick={handleThemeToggler}
          style={{
            cursor: "pointer",
            width: 25,
            filter: darkTheme ? "invert(1)" : "invert(0)"
          }}
        />
        <button className="button" onClick={() => nextLevel()}>
          <img src={wallet} alt="wallet" style={{ marginRight: 8 }} />
          Connect Wallet
        </button>
      </div>
    </div>
  );

  //rendering form In
  const renderInForm = (
    <div className={darkTheme ? "input dark" : "input"}>
      <div onClick={() => setModalStateOne(true)}>
        {fromCoin}
        <img class="icon-sm" src={down} alt="caret-down" />
      </div>
      <input
        type="number"
        name="amountIn"
        value={amountIn}
        onChange={handleChange}
      />
    </div>
  );

  //rendering form Out
  const renderOutForm = (
    <div className={darkTheme ? "input dark" : "input"}>
      <div onClick={() => setModalStateTwo(true)}>
        {toCoin}
        <img class="icon-sm" src={down} alt="caret-down" />
      </div>
      <input value={amountOut} />
    </div>
  );

  const renderIcon = (
    <img
      className="icon"
      src={exchange}
      alt="icon-interchange"
      onClick={() => interchange()}
    />
  );

  //rendring form
  const renderForm = (
    <Fragment>
      {renderInForm}
      {renderIcon}
      {renderOutForm}
    </Fragment>
  );

  //handling modal
  const handleModal = (res) => {
    if (isModalOpenOne) {
      setModalStateOne(false);
      setFromCoin(res.symbol);
      setFromAddress(res.address);
    } else {
      setModalStateTwo(false);
      setToCoin(res.symbol);
      setToAddress(res.address);
    }
  };

  async function search(keyword) {
    let keywords = keyword.toUpperCase();
    let word = "";
    const res = defaultCoins.filter((coin) =>
      coin.symbol.startsWith(word.concat(keywords))
    );
    setResults(res);
  }

  //rendering search results of modal
  const renderSearchResults = (
    <div className="list-search-results">
      <div className="list-header">
        <span>Token name</span>
        <span>Price</span>
        <span>Balance</span>
      </div>
      <div>
        {results &&
          results.map((result) => (
            <div key={result.symbol}>
              <p
                style={{ cursor: "pointer" }}
                value={result.symbol}
                onClick={() => handleModal(result)}
              >
                {result.symbol}
              </p>
              {/* <img class="icon" src={result.logoURI} /> */}
            </div>
          ))}
      </div>
    </div>
  );

  //rendering modal
  const renderMod = (
    <div className="backdrop">
      <div className={darkTheme ? "modal-coin dark" : "modal-coin"}>
        <div className="header-modal-select-coins">
          <h5>Select a token</h5>
          <span
            style={{ cursor: "pointer" }}
            onClick={() =>
              isModalOpenOne ? setModalStateOne(false) : setModalStateTwo(false)
            }
          >
            <FaTimes color="#E9A043" />
          </span>
        </div>
        <div className="search-input">
          <img src={searchImg} alt="search" />
          <input
            type="text"
            placeholder="search"
            onChange={(e) => search(e.target.value)}
          />
        </div>
        {renderSearchResults}
      </div>
    </div>
  );

  //rendering Lists
  const renderList = list.map((item) => (
    <div className="list-route" key={item.index}>
      <p>{item.exchange}</p>
      <p>
        {item.return}
        <sup>-0.07%</sup>
      </p>
      <p>{item.price}</p>
      <p>≈${item.fees}</p>
      <button className="button" onClick={() => swap()}>
        Swap
      </button>
    </div>
  ));

  //rendering routes
  const renderRoute = (
    <Fragment>
      <div className={darkTheme ? "route dark" : "route"}>
        <div className="header-list-routes">
          <b>Exchange</b>
          <b>Return</b>
          <b>Price</b>
          <b>Fees</b>
        </div>
        {renderList}
      </div>
    </Fragment>
  );

  let methods = ["Direct", "SingleHop", "MultiHop"];

  const handleRadioChange = async (e) => {
    setMethodType(e.target.value);
    setAmountIn("");
    setAmountOut("");
  };
  //rendering methods
  const renderMethod = (
    <>
      {methods.map((method) => (
        <>
          <input
            type="radio"
            value={method}
            name="methods"
            checked={methodType === method}
            onChange={handleRadioChange}
          />
          &nbsp;
          <span className="radio-input">{method}</span>
        </>
      ))}
    </>
  );

  return (
    <div className={darkTheme ? "App dark" : "App"}>
      <Sidebar
        darkTheme={darkTheme}
        sidebarActive={sidebarActive}
        setSidebarActive={setSidebarActive}
      />
      <div className="content">
        {renderHeader}
        {isModalOpenOne || isModalOpenTwo ? (
          renderMod
        ) : (
          <>
            <div className={darkTheme ? "swapper dark" : "swapper"}>
              <div className={darkTheme ? "title dark" : "title"}>
                <h1>Smart Swap</h1>
                <div>
                  <img src={info} alt="info" />
                  <p style={{ fontSize: 14 }}>
                    This feature is still in beta. Please use at your own risk
                  </p>
                </div>
              </div>
              <div className={darkTheme ? "slides dark" : "slides"}>
                <span>Swap</span>
                <span>Swap history</span>
              </div>
              <div className="block">
                <div className="form">{renderForm}</div>
                <div
                  className={
                    darkTheme ? "list-price-setting dark" : "list-price-setting"
                  }
                >
                  <p>Gas price: 120 Gwei</p>
                  <p>Max price slippage: 1%</p>
                </div>
                <div className={darkTheme ? "block-radio dark" : "block-radio"}>
                  {renderMethod}
                </div>
              </div>
            </div>
            {renderRoute}
          </>
        )}
      </div>
    </div>
  );
}

//
// import busd from "./assets/icons/busd.svg";
// import tether from "./assets/icons/tether.svg";

export const defaultCoins = [
  {
    name: "BUSD Token",
    symbol: "BUSD",
    address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    chainId: 56,
    decimals: 18
    // logoURI: busd
  },
  {
    name: "Tether USD",
    symbol: "USDT",
    address: "0x55d398326f99059ff775485246999027b3197955",
    chainId: 56,
    decimals: 18
    // logoURI: tether
  },
  {
    name: "Dai Token",
    symbol: "DAI",
    address: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
    chainId: 56,
    decimals: 18,
    logoURI: "/images/coins/DAI-icon.png"
  },
  {
    name: "Binance-Peg USD Coin",
    symbol: "USDC",
    address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    chainId: 56,
    decimals: 18
  }
];

//

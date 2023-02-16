/* pages/my-assets.js */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";

import { nftmarketaddress, nftaddress } from "../config";

import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";

export default function MyAssets() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      signer
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const data = await marketContract.fetchMyNFTs();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }
  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="py-10 px-20 text-3xl">No assets owned</h1>;
  return (
    <div className="flex justify-center">
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img src={nft.image} className="rounded" />
              <div className="p-4 bg-black">
                <p className="text-2xl font-bold text-white">
                  Price - {nft.price} Eth
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* pages/creator-dashboard.js */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";

import { nftmarketaddress, nftaddress } from "../config";

import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";

export default function CreatorDashboard() {
  const [nfts, setNfts] = useState([]);
  const [sold, setSold] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      signer
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const data = await marketContract.fetchItemsCreated();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          sold: i.sold,
          image: meta.data.image,
        };
        return item;
      })
    );
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter((i) => i.sold);
    setSold(soldItems);
    setNfts(items);
    setLoadingState("loaded");
  }
  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="py-10 px-20 text-3xl">No assets created</h1>;
  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl py-2">Items Created</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img src={nft.image} className="rounded" />
              <div className="p-4 bg-black">
                <p className="text-2xl font-bold text-white">
                  Price - {nft.price} Eth
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-4">
        {Boolean(sold.length) && (
          <div>
            <h2 className="text-2xl py-2">Items sold</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {sold.map((nft, i) => (
                <div
                  key={i}
                  className="border shadow rounded-xl overflow-hidden"
                >
                  <img src={nft.image} className="rounded" />
                  <div className="p-4 bg-black">
                    <p className="text-2xl font-bold text-white">
                      Price - {nft.price} Eth
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

//
import {
  useAccount,
  useConnect,
  useDisconnect,
  ConnectorNotFoundError,
  UserRejectedRequestError,
  useSendTransaction
} from "wagmi";

import { useCallback } from "react";

const Transaction = ({ transaction }: { transaction?: any }) => {
  const { login } = useAuth();
  const { address, isConnected } = useAccount();

  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    mode: "recklesslyUnprepared",
    request: {
      from: address || "",
      to: transaction?.to || "",
      data: transaction?.data || "",
      value: transaction?.value || ""
    }
  });

  return (
    <div>
      {!isConnected && (
        <>
          <h3>👮🏻‍♂️ Login: </h3>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "20px" }}
          >
            {connectors.map((item) => (
              <button
                key={item.connectorId}
                onClick={() => login(item.connectorId)}
              >
                {item.title}
              </button>
            ))}
          </div>
        </>
      )}

      {isConnected && !transaction && (
        <div style={{ textAlign: "left" }}>
          <p> Logged as {address}</p>
          <p>Waiting for transaction from ZapFarm...</p>
          <p>Click to 'Invest' button</p>
        </div>
      )}

      {sendTransaction && transaction && (
        <div style={{ textAlign: "left" }}>
          <p>Logged as {address}</p>
          <button
            style={{
              margin: 20,
              fontSize: 20,
              fontFamily: "Arial",
              padding: 20
            }}
            onClick={() => sendTransaction?.()}
          >
            Send Transaction from DEX{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default Transaction;

const constants = {
  DEFAULT_CHAIN_ID: "137",
  TOAST_DURATION: 3000 // 3s
};

function useAuth() {
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const login = useCallback(
    async (connectorID: string) => {
      const findConnector = connectors.find((c) => c.id === connectorID);
      try {
        await connectAsync({ connector: findConnector });
      } catch (error) {
        if (error instanceof ConnectorNotFoundError) {
          console.error({
            title: "An error occurred when connect to wallet",
            description: "No provider was found",
            isClosable: true,
            duration: constants.TOAST_DURATION,
            status: "error"
          });
          return;
        }
        if (error instanceof UserRejectedRequestError) {
          console.error({
            title: "An error occurred when connect to wallet",
            description: "User rejected request",
            isClosable: true,
            duration: constants.TOAST_DURATION,
            status: "error"
          });
          return;
        }
        if (error instanceof Error) {
          console.error({
            title: "An error occurred when connect to wallet",
            description: error.message,
            isClosable: true,
            duration: constants.TOAST_DURATION,
            status: "error"
          });
        }
      }
    },
    [connectors, connectAsync]
  );

  const logout = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return { login, logout };
}

const connectors = [
  {
    title: "Metamask",
    icon: "",
    connectorId: "metaMask",
    priority: 1,
    href: "https://metamask.app.link/dapp/example.com/"
  },

  {
    title: "WalletConnect",
    icon: "",
    connectorId: "walletConnect",
    priority: 4
  }
];
//

import { Chain, configureChains, createClient } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";

export const polygon: Chain = {
  id: 137,
  name: "Polygon",
  network: "polygon",
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  rpcUrls: {
    default: "https://polygon-rpc.com"
  },
  blockExplorers: {
    default: {
      name: "PolyScan",
      url: "https://polygonscan.com"
    }
  }
};

export const wagmiChains = [polygon];

export const { provider, chains } = configureChains(wagmiChains, [
  publicProvider()
]);

export const injectedConnector = new InjectedConnector({
  chains,
  options: {
    shimDisconnect: false
  }
});

export const coinbaseConnector = new CoinbaseWalletConnector({
  chains,
  options: {
    appName: "Hello",
    appLogoUrl: "https://example.com/logo.png"
  }
});

export const walletConnectConnector = new WalletConnectConnector({
  chains,
  options: {
    qrcode: true
  }
});

export const metaMaskConnector = new MetaMaskConnector({
  chains,
  options: {
    shimDisconnect: false
  }
});

export const client = createClient({
  autoConnect: true,
  provider,
  connectors: [
    metaMaskConnector,
    injectedConnector,
    coinbaseConnector,
    walletConnectConnector
  ]
});


//
import { ethers } from "ethers";
import { useCallback, useState } from "react";

import "./styles.css";
import Ledger from "./Ledger";
import DeriveFromXpub from "./DeriveFromXpub";
import SeedToXpub from "./SeedToXpub";

let HDNode = ethers.utils.HDNode;
// let mnemonic =
//   "radar blur cabbage chef fix engine embark joy scheme fiction master release";
// let masterNode = HDNode.fromMnemonic(mnemonic);
// let standardEthereum = masterNode.derivePath("m/44'/60'/0'/0/0");

// const xpub = masterNode.neuter().extendedKey;

// const node = HDNode.fromExtendedKey(xpub);

// console.log(node.derivePath("0/0").publicKey);

// console.log(masterNode.neuter().extendedKey);

// console.log(standardEthereum);

export default function App() {
  const [xpub, setXpub] = useState("");
  const [addresses, setAddresses] = useState<string[]>([]);

  const handleDerive = useCallback(() => {
    const node = HDNode.fromExtendedKey(xpub);

    const results: string[] = [];

    for (let i = 0; i < 100; i++) {
      // results.push(node.derivePath("0/" + i).publicKey);
      results.push(
        ethers.utils.computeAddress(node.derivePath("0/" + i).publicKey)
      );
    }

    setAddresses(results);
  }, [xpub]);

  return (
    <div className="App">
      <Ledger />
      <DeriveFromXpub />
      {/* <SeedToXpub />
      <hr />
      <h1>Derive addresses from xpub</h1>
      <div>
        <input
          type="text"
          placeholder="xpub..."
          value={xpub}
          onChange={(e) => setXpub(e.target.value)}
        />
      </div>
      <button onClick={handleDerive}>derive</button>

      {addresses.length > 0 && (
        <div>
          <h3>Derived addresses:</h3>
          {addresses.map((addr, i) => (
            <div key={i}>
              {i}: {addr}
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}

//
/* eslint-disable @typescript-eslint/no-use-before-define */

import Eth from "@ledgerhq/hw-app-eth";
import TransportWebUsb from "@ledgerhq/hw-transport-webusb";
import { encode } from "bs58";
import { ethers } from "ethers";
import { Buffer } from "buffer";

import { ripemd160, sha256 } from "./utils";
import { DerivationPath, KeyInfo } from "./types";
import { DEFAULT_ETH, LEDGER_ETH, LEDGER_LIVE_ETH } from "./constants";

const ETHEREUM_P2PKH = 76067358;
const HARDENED_SEGMENT = 0x80000000;

export async function getXpub(path: DerivationPath): Promise<string> {
  const eth = await getLedger();
  const hdNode = await getHDNode(path, eth);

  return hdNode.neuter().extendedKey;
}

export async function getLedger() {
  const transport = await TransportWebUsb.create();
  const eth = new Eth(transport);

  return eth;
}

// `44'/60'/0'/0/0`
async function main() {
  const transport = await TransportWebUsb.create();
  const eth = new Eth(transport);

  await getNonHardenedAddresses(DEFAULT_ETH, eth, 5);
  await getNonHardenedAddresses(LEDGER_ETH, eth, 5);
  await getLedgerLiveAddresses(eth, 5);
}

export function deriveAddressesFromXpub(
  xpub: string,
  start: number,
  count: number
): string[] {
  const node = ethers.utils.HDNode.fromExtendedKey(xpub);

  const res: string[] = [];
  for (let i = start; i < start + count; i++) {
    res.push(node.derivePath(`${i}`).address);
  }

  return res;
}

export async function getHardenedAddresses(
  path: DerivationPath,
  start: number,
  count: number
): Promise<string[]> {
  const eth = await getLedger();

  const res: string[] = [];
  for (let i = start; i < count + start; i++) {
    const addr = await getHardenedAddress(path, i, eth);
    res.push(addr);
  }

  return res;
}

async function getNonHardenedAddresses(
  derivationPath: DerivationPath,
  eth: Eth,
  count: number
) {
  console.log(
    `Getting ${count} addresses for ${derivationPath.name} path: ${derivationPath.path}`
  );
  const node = await getHDNode(derivationPath, eth);

  console.log("xpub:", node.neuter().extendedKey);

  for (let i = 0; i < count; i++) {
    console.log(i, node.derivePath(`${i}`).address);
  }
}

async function getLedgerLiveAddresses(eth: Eth, count: number) {
  console.log(
    `Getting ${count} addresses for ${LEDGER_LIVE_ETH.name} path: ${LEDGER_LIVE_ETH.path}`
  );

  console.log("xpub is unknown :(");

  for (let i = 0; i < count; i++) {
    const addr = await getHardenedAddress(LEDGER_LIVE_ETH, i, eth);
    console.log(i, addr);
  }
}

export async function getHDNode(derivationPath: DerivationPath, eth: Eth) {
  if (derivationPath.isHardened) {
    throw new Error(`Cannot get xpub for hardened path ${derivationPath.path}`);
  }

  const childPath = getPathPrefix(derivationPath.path);
  const childInfo = await getKeyInfo(childPath, eth);

  // console.log({
  //   childPath,
  //   childInfo,
  // });

  const parentPath = getPathPrefix(childPath);
  const parentInfo = await getKeyInfo(parentPath, eth);

  // console.log({
  //   parentPath,
  //   parentInfo,
  // });

  const extendedKey = await createExtendedPublicKey(
    childPath,
    parentInfo as KeyInfo,
    childInfo as KeyInfo
  );
  return ethers.utils.HDNode.fromExtendedKey(extendedKey);
}

async function getKeyInfo(derivationPath: string, eth: Eth) {
  //   const app = await transport.getApplication();

  const { publicKey, chainCode } = await eth.getAddress(
    derivationPath,
    false,
    true
  );

  return {
    publicKey,
    chainCode
  };
}

async function getAddress(
  derivationPath: DerivationPath,
  index: number,
  eth: Eth
): Promise<string> {
  if (derivationPath.isHardened) {
    return getHardenedAddress(derivationPath, index, eth);
  }

  const hdNode = await getHDNode(derivationPath, eth);
  return hdNode.derivePath(`${index}`).address;
}

export async function getHardenedAddress(
  derivationPath: DerivationPath,
  index: number,
  eth: Eth
): Promise<string> {
  const { address } = await eth.getAddress(getFullPath(derivationPath, index));
  return address;
}

async function createExtendedPublicKey(
  childDerivationPath: string,
  parent: KeyInfo,
  child: KeyInfo
) {
  const pathSegments = childDerivationPath.substring(2).split("/");
  const parentPublicKey = compressPublicKey(parent.publicKey);
  const fingerprint = getFingerprint(parentPublicKey);

  return encodeBase58Check(
    toHex(ETHEREUM_P2PKH) +
      toHex(pathSegments.length, 2) +
      toHex(fingerprint) +
      toHex(getSegmentNumber(pathSegments[pathSegments.length - 1])) +
      child.chainCode +
      compressPublicKey(child.publicKey).toString("hex")
  );
}

function compressPublicKey(publicKey: string): Buffer {
  const publicKeyBuffer = Buffer.from(publicKey, "hex");
  const prefix = Buffer.alloc(1);
  prefix[0] = (publicKeyBuffer[64] & 1) !== 0 ? 0x03 : 0x02;

  return Buffer.concat([prefix, publicKeyBuffer.slice(1, 1 + 32)]);
}

function getFingerprint(publicKey: Buffer): number {
  const buffer = ripemd160(sha256(publicKey));

  return (
    ((buffer[0] << 24) | (buffer[1] << 16) | (buffer[2] << 8) | buffer[3]) >>> 0
  );
}

function encodeBase58Check(input: string): string {
  const buffer = Buffer.from(input, "hex");
  const checksum = sha256(sha256(buffer)).slice(0, 4);

  const hash = Buffer.concat([buffer, checksum]);
  return encode(Buffer.from(hash));
}

function toHex(num: number, maxLength: number = 8) {
  return num.toString(16).padStart(maxLength, "0");
}

function getSegmentNumber(segment: string) {
  const result = /^(\d+)('?)$/.exec(segment);
  if (!result) {
    throw new Error(`Invalid derivation path: ${segment}`);
  }

  const item = parseInt(result[1], 10);
  if (result[2] === `'`) {
    return item + HARDENED_SEGMENT;
  }

  return item;
}

function getFullPath(derivationPath: DerivationPath, index: number) {
  return derivationPath.path.replace("<account>", index.toString(10));
}

function getPathPrefix(derivationPath: string) {
  const segments = derivationPath.split("/").slice(0, -1);

  return segments.join("/");
}

//
/* eslint-disable @typescript-eslint/no-use-before-define */

import CryptoJS from "crypto-js";
import sha256Crypto from "crypto-js/sha256";
import ripemd160Crypto from "crypto-js/ripemd160";
import { Buffer } from "buffer";

export function ripemd160(input: Buffer): Buffer {
  const wa = byteArrayToWordArray(input);
  const resWa = ripemd160Crypto(wa);

  return Buffer.from(wordArrayToByteArray(resWa));
}

export function sha256(input: Buffer): Buffer {
  const wa = byteArrayToWordArray(input);
  const resWa = sha256Crypto(wa);

  return Buffer.from(wordArrayToByteArray(resWa));
}

// console.log(ripemd160(Buffer.from("abc")));

function byteArrayToWordArray(ba: any) {
  var wa: any = [],
    i;
  for (i = 0; i < ba.length; i++) {
    wa[(i / 4) | 0] |= ba[i] << (24 - 8 * i);
  }

  return CryptoJS.lib.WordArray.create(wa, ba.length);
}

function wordToByteArray(word: any, length: any) {
  var ba = [],
    i,
    xFF = 0xff;
  if (length > 0) ba.push(word >>> 24);
  if (length > 1) ba.push((word >>> 16) & xFF);
  if (length > 2) ba.push((word >>> 8) & xFF);
  if (length > 3) ba.push(word & xFF);

  return ba;
}

function wordArrayToByteArray(wordArray: any, length = 0) {
  if (
    wordArray.hasOwnProperty("sigBytes") &&
    wordArray.hasOwnProperty("words")
  ) {
    length = wordArray.sigBytes;
    wordArray = wordArray.words;
  }

  var result = [],
    bytes,
    i = 0;
  while (length > 0) {
    bytes = wordToByteArray(wordArray[i], Math.min(4, length));
    length -= bytes.length;
    result.push(bytes);
    i++;
  }
  return [].concat.apply([], result as any);
}

//
import { ethers } from "ethers";
import { useCallback, useState } from "react";

import "./styles.css";

let HDNode = ethers.utils.HDNode;
// let mnemonic =
//   "radar blur cabbage chef fix engine embark joy scheme fiction master release";
// let masterNode = HDNode.fromMnemonic(mnemonic);
// let standardEthereum = masterNode.derivePath("m/44'/60'/0'/0/0");

// const xpub = masterNode.neuter().extendedKey;

// const node = HDNode.fromExtendedKey(xpub);

// console.log(node.derivePath("0/0").publicKey);

// console.log(masterNode.neuter().extendedKey);

// console.log(standardEthereum);

export default function SeedToXpub() {
  const [xpub, setXpub] = useState("");
  const [seed, setSeed] = useState("");

  const handleDerive = useCallback(() => {
    let masterNode = HDNode.fromMnemonic(seed);
    setXpub(masterNode.derivePath("m/44'/60'/0'").neuter().extendedKey);
  }, [seed]);

  return (
    <div className="App">
      <h1>Get Eth xpub from seed</h1>
      <div>
        <input
          type="text"
          placeholder="seed"
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
        />
      </div>
      <button onClick={handleDerive}>generate</button>

      {!!xpub && (
        <div>
          <h3>Xpub: {xpub}</h3>
        </div>
      )}
    </div>
  );
}

//


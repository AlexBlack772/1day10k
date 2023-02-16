//import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
const BEETSURL =
  "https://graph-node.beets-ftm-node.com/subgraphs/name/beethovenx";
const SPOOKYURL =
  "https://thegraph.com/hosted-service/subgraph/eerieeight/spookyswap";
const SPIRITURL =
  "https://thegraph.com/hosted-service/subgraph/layer3org/spiritswap-analytics?selected=playground";

const client = new ApolloClient({
  uri: "https://graph-node.beets-ftm-node.com/subgraphs/name/beethovenx",
  cache: new InMemoryCache(),
});

function App() {
  return <div className="App">hello</div>;
}

export default App;
//<HolderBalance />
//import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
const BEETSURL =
  "https://graph-node.beets-ftm-node.com/subgraphs/name/beethovenx";
const SPOOKYURL =
  "https://thegraph.com/hosted-service/subgraph/eerieeight/spookyswap";
const SPIRITURL =
  "https://thegraph.com/hosted-service/subgraph/layer3org/spiritswap-analytics?selected=playground";

const client = new ApolloClient({
  uri: "https://graph-node.beets-ftm-node.com/subgraphs/name/beethovenx",
  cache: new InMemoryCache()
});

function App() {
  return <div className="App">hello</div>;
}

export default App;
//<HolderBalance />
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tooltip from '@material-ui/core/Tooltip';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/lab/Skeleton';
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import { backgroundColor, cardColor, pickleGreen, pickleWhite, materialBlack } from '../util/constants';
import { getProtocolData, getStakingData, getFarmData, getPerformanceData, getCoinData } from "../util/api";
import { powerPool, jars } from "../util/jars";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    color: pickleGreen,
    backgroundColor: backgroundColor,
  },
  claimContent: {
    justifyContent: "center",
  },
  claimLink: {
    cursor: "pointer",
    color: "#0492c2",
    textShadow: "0px 0px 3px #0492c2",
  },
  warning: {
    fontSize: "1rem",
    display: "flex",
    color: "red",
    justifyContent: "center",
    alignContent: "center",
  },
  warningContent: {
    display: "flex",
    flexDirection: "column",
  },
  warningLink: {
    textDecoration: "none",
    marginLeft: "5px",
    color: pickleGreen,
  },
  card: {
    color: materialBlack,
    backgroundColor: cardColor,
    border: `1px solid ${pickleGreen}`,
    borderRadius: "3px",
  },
  cardContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tableAsset: {
    display: "flex",
    alignItems: "center",
  },
  cardIcon: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
  cardInfo: {
    display: "flex",
    flexDirection: "column",
  },
  cardTitle: {
    fontSize: "1rem",
  },
  cardValue: {
    fontSize: "1.6rem",
    letterSpacing: "2px",
  },
  cardSubText: {
    fontSize: ".8rem",
  },
  tagline: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    fontSize: "2rem",
    letterSpacing: "6px",
  },
  subtitle: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    fontSize: "1.3rem",
    letterSpacing: "4px",
    color: materialBlack,
  },
  farmTable: {
    backgroundColor: cardColor,
    borderTopLeftRadius: "3px",
    borderTopRightRadius: "3px",
    border: `1px solid ${pickleGreen}`,
  },
  farmTableCell: {
    color: materialBlack,
    borderBottom: "1px solid gray",
  },
  farmIcon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(3),
    height: "25px",
    width: "25px",
  },
  emissionIcon: {
    marginRight: theme.spacing(1),
    height: "15px",
    width: "15px",
  },
  disclaimer: {
    textAlign: "center",
    fontSize: ".6rem",
    color: pickleGreen,
    borderBottom: "none",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  skeletonRow: {
    backgroundColor: "darkgreen",
    opacity: "30%",
  },
  pickleHeader: {
    maxWidth: "80%",
    margin: "auto",
  }
}));

const jarOptions = jars.concat([powerPool]);

const DashboardCard = (props) => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card} variant="outlined">
        <CardContent className={classes.cardContent}>
          <Avatar variant="rounded" src={props.icon} className={classes.cardIcon} />
          <div className={classes.cardInfo}>
            <div className={classes.cardTitle}>
              {props.title}
            </div>
            <div className={classes.cardValue}>
              {props.value ? props.value : <Skeleton />}
            </div>
            <div className={classes.cardSubText}>
              {props.subtext ? props.subtext : <Skeleton />}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
};

const FarmRow = (props) => {
  const classes = useStyles();

  const { farm, item, jar, isFarm = true} = props;
  const farmName = jarOptions.find(jar => jar.toLowerCase() === farm.toLowerCase());
  const icon = `./assets/${farm.toLowerCase()}.png`;
  const picklePerDay = 1000 / item.valueBalance * item.picklePerDay;

  if (!item.tokenBalance && !item.valueBalance) {
    item.tokenBalance = 0;
    item.valueBalance = 0;
  }

  if (!jar) return <></>;

  return (
    <TableRow key={farm}>
      <TableCell className={classes.farmTableCell}>
        <div className={clsx(classes.cardTitle, classes.tableAsset)}>
          <Avatar variant="square" src={icon} className={classes.farmIcon} />
          {farmName}
        </div>
      </TableCell>
      <TableCell className={classes.farmTableCell}>
        <div className={clsx(classes.cardTitle, classes.cardContent)}>
          {formatNumber(item.tokenBalance)}
        </div>
      </TableCell>
      <TableCell className={classes.farmTableCell}>
        <div className={clsx(classes.cardTitle, classes.cardContent)}>
          {`${getUSD(item.valueBalance)}`}
        </div>
      </TableCell>
      {isFarm && 
        <Tooltip title={`${(item.apy * 100).toFixed(2)}% pickle apy`}>
          <TableCell className={classes.farmTableCell}>
            <div className={clsx(classes.cardTitle, classes.cardContent)}>
              <Avatar variant="square" src="./assets/pickle.png" className={classes.emissionIcon} />
              {`${picklePerDay.toFixed(3)}`} / day
            </div>
          </TableCell>
        </Tooltip>
      }
      <Tooltip title={`${((isFarm ? jar.oneDayFarm : jar.oneDay) / 365).toFixed(2)}% daily`}>
        <TableCell className={classes.farmTableCell}>
          <div className={clsx(classes.cardTitle, classes.cardContent)}>
            {isFarm ? 
              jar.oneDayFarm ? `${jar.oneDayFarm}%` : "-" :
              jar.oneDay ? `${jar.oneDay}%` : "-"
            }
          </div>
        </TableCell>
      </Tooltip>
      <Tooltip title={`${((isFarm ? jar.sevenDayFarm : jar.sevenDay) / 52).toFixed(2)}% weekly`}>
        <TableCell className={classes.farmTableCell}>
          <div className={clsx(classes.cardTitle, classes.cardContent)}>
            {isFarm ? 
              jar.sevenDayFarm ? `${jar.sevenDayFarm}%` : "-" :
              jar.sevenDay ? `${jar.sevenDay}%` : "-"
            }
          </div>
        </TableCell>
      </Tooltip>
      <Tooltip title={`${((isFarm ? jar.thirtyDayFarm : jar.thirtyDay) / (365 / 30)).toFixed(2)}% monthly`}>
        <TableCell className={classes.farmTableCell}>
          <div className={clsx(classes.cardTitle, classes.cardContent)}>
            {isFarm ? 
              jar.thirtyDayFarm ? `${jar.thirtyDayFarm}%` : "-" :
              jar.thirtyDay ? `${jar.thirtyDay}%` : "-"
            }
          </div>
        </TableCell>
      </Tooltip>
    </TableRow>
  );
};

const SkeletonChart = (props) => {
  const classes = useStyles();
  const { isFarm = true } = props;
  return (
    <>
    {Array.from({length: props.length}, (c, i) => i).map(i => {
      return (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className={classes.skeletonRow}>
              <Avatar variant="square" src={"./assets/pickle.png"} className={classes.farmIcon} /> 
            </Skeleton>
          </TableCell>
          <TableCell>
            <Skeleton className={classes.skeletonRow}>
              <Avatar variant="square" src={"./assets/pickle.png"} className={classes.farmIcon} /> 
            </Skeleton>
          </TableCell>
          <TableCell>
            <Skeleton className={classes.skeletonRow}>
              <Avatar variant="square" src={"./assets/pickle.png"} className={classes.farmIcon} /> 
            </Skeleton>
          </TableCell>
          {isFarm &&
            <TableCell>
              <Skeleton className={classes.skeletonRow}>
                <Avatar variant="square" src={"./assets/pickle.png"} className={classes.farmIcon} /> 
              </Skeleton>
            </TableCell>
          }
          <TableCell>
            <Skeleton className={classes.skeletonRow}>
              <Avatar variant="square" src={"./assets/pickle.png"} className={classes.farmIcon} /> 
            </Skeleton>
          </TableCell>
          <TableCell>
            <Skeleton className={classes.skeletonRow}>
              <Avatar variant="square" src={"./assets/pickle.png"} className={classes.farmIcon} /> 
            </Skeleton>
          </TableCell>
          <TableCell>
            <Skeleton className={classes.skeletonRow}>
              <Avatar variant="square" src={"./assets/pickle.png"} className={classes.farmIcon} /> 
            </Skeleton>
          </TableCell>
        </TableRow>
      )
    })}
    </>
  );
};

const FarmHeader = (props) => {
  const classes = useStyles();
  const { isFarm = true } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell className={classes.farmTableCell}>
          <div className={classes.cardTitle}>
            {isFarm ? "Farm" : "Jar"}
          </div>
        </TableCell>
        <Tooltip className={classes.cardTitle} title={`Current deposit token balance in ${isFarm ? "Farm" : "Jar"}`}>
          <TableCell className={classes.farmTableCell}>Tokens</TableCell>
        </Tooltip>
        <Tooltip className={classes.cardTitle} title={`Current USD value in ${isFarm ? "Farm" : "Jar"}`}>
          <TableCell className={classes.farmTableCell}>Value</TableCell>
        </Tooltip>
        {isFarm && 
          <TableCell className={classes.farmTableCell}>
            <div className={classes.cardTitle}>
              Pickle / $1000
            </div>
          </TableCell>
        }
        <Tooltip className={classes.cardTitle} title="Current day APY">
          <TableCell className={classes.farmTableCell}>Day</TableCell>
        </Tooltip>
        <Tooltip className={classes.cardTitle} title="Weekly APY">
          <TableCell className={classes.farmTableCell}>Week</TableCell>
        </Tooltip>
        <Tooltip className={classes.cardTitle} title="Monthly APY">
          <TableCell className={classes.farmTableCell}>Month</TableCell>
        </Tooltip>
      </TableRow>
    </TableHead>
  );
};

// helper functions
const formatNumber = (value) => {
  if (value < 1) {
    return value.toFixed(8);
  } else {
    return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};
const getUSD = (value) => {
  return `$${formatNumber(value)}`;
};

export default function Brining() {
  const classes = useStyles();

  const [picklePerBlock, setPicklePerBlock] = useState(undefined);
  const [jarInfo, setJarInfo] = useState(undefined);
  const [farmInfo, setFarmInfo] = useState(undefined);
  const [protocolInfo, setProtocolInfo] = useState(undefined);
  const [pickleData, setPickleData] = useState(undefined);
  useEffect(() => {
    const updateProtocol = async () => setProtocolInfo(await getProtocolData());
    const updateJars = async () => setJarInfo(await getPerformanceData(jarOptions));
    const updateFarms = async () => {
      const farms = await getFarmData();
      setPicklePerBlock(farms.picklePerBlock);
      delete farms.picklePerBlock;
      setFarmInfo(farms);
    };
    const updatePickleData = async () => setPickleData(await getCoinData('pickle-finance'));
    const updateInfo = async () => {
      updateProtocol();
      updateFarms();
      updateJars();
      updatePickleData();
    };
    updateInfo();
    const interval = setInterval(() => updateInfo(), 600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container className={classes.root}>
      <Grid container spacing={10} className={classes.pickleHeader}>
        <Grid item xs={12} sm={6}>
          <DashboardCard 
            title="Total Value Locked"
            value={protocolInfo ? getUSD(protocolInfo.totalValue) : undefined}
            subtext={protocolInfo ? `Jar Value Locked: ${getUSD(protocolInfo.jarValue)}` : undefined}
            icon="/assets/jar-icon.png"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DashboardCard
            title="Pickle Price"
            value={pickleData ? `$${pickleData.market_data.current_price.usd}` : undefined}
            subtext={pickleData ? `Daily Volume: ${getUSD(pickleData.market_data.total_volume.usd)}` : undefined}
            icon="/assets/pickle.png"
          />
        </Grid>
      </Grid>
      <Typography variant="h6" className={classes.subtitle}>Farms</Typography>
      <TableContainer component={Paper} className={classes.farmTable}>
        <Table className={classes.table}>
          <FarmHeader />
          <TableBody>
            {farmInfo && jarInfo ? Object.keys(farmInfo)
              .sort((a, b) => farmInfo[b].allocShare - farmInfo[a].allocShare)
              .map((farm, i) => {
                const item = farmInfo[farm];
                const jar = jarInfo.find(jar => jar.asset.toLowerCase() === farm);
                return (
                  <FarmRow key={farm} farm={farm} item={item} jar={jar} />
                );
            }) : <SkeletonChart length={8} />}
            <TableRow>
              <TableCell colSpan={8} className={classes.disclaimer}>
                Emission Rate: {picklePerBlock ? picklePerBlock.toFixed(4) : "-"} pickle per block
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer><Typography variant="h6" className={classes.subtitle}>Jars</Typography>
      <TableContainer component={Paper} className={classes.farmTable}>
        <Table className={classes.table}>
          <FarmHeader isFarm={false} />
          <TableBody>
            {protocolInfo && farmInfo && jarInfo ? jarInfo
              .filter(jar => jar.asset.toLowerCase() !== "pickle-eth")
              .sort((a, b) => {
                const aBalance = protocolInfo[a.asset.toLowerCase()];
                const bBalance = protocolInfo[b.asset.toLowerCase()];
                return bBalance - aBalance;
              })
              .map((jar, i) => {
                const key = jar.asset.toLowerCase();
                const itemTokenBalance = protocolInfo[key + "Tokens"];
                const itemBalance = protocolInfo[key];
                const item = {tokenBalance: itemTokenBalance, valueBalance: itemBalance};
                return (
                  <FarmRow key={jar.asset} farm={jar.asset} item={item} jar={jar} isFarm={false} />
                );
            }) : <SkeletonChart length={7} isFarm={false} />}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
import { FC } from "react";
import { Page } from "@geist-ui/react";
import { TopBar } from "../features/TopBar/TopBar";
import { Footer } from "../features/Footer/Footer";
import { Swap as Swapper } from "../features/Swap/Swap";

const Swap: FC = () => {
  return (
    <>
      <TopBar />
      <Page>
        <Page.Content>
          <h1 style={{ fontSize: `2rem`, fontFamily: `Source Code Pro` }}>
            PickleSwap
          </h1>
          <p>Swap your assets from one jar to another.</p>
          <Swapper />
        </Page.Content>
        <Footer />
      </Page>
    </>
  );
};

export default Swap;

import { FC } from "react";
import { Page } from "@geist-ui/react";

import { TopBar } from "../features/TopBar/TopBar";
import { Footer } from "../features/Footer/Footer";
import { FarmList } from "../features/Farms/FarmList";

const Farms: FC = () => {
  return (
    <>
      <TopBar />
      <Page>
        <Page.Content>
          <h1 style={{ fontSize: `2rem`, fontFamily: `Source Code Pro` }}>
            Farms
          </h1>
          <FarmList />
        </Page.Content>
        <Footer />
      </Page>
    </>
  );
};

export default Farms;

import { FC } from "react";
import { Page } from "@geist-ui/react";

import { TopBar } from "../features/TopBar/TopBar";
import { Footer } from "../features/Footer/Footer";
import { FarmList } from "../features/Farms/FarmList";

const Farms: FC = () => {
  return (
    <>
      <TopBar />
      <Page>
        <Page.Content>
          <h1 style={{ fontSize: `2rem`, fontFamily: `Source Code Pro` }}>
            Farms
          </h1>
          <FarmList />
        </Page.Content>
        <Footer />
      </Page>
    </>
  );
};

export default Farms;

import { ethers } from "ethers";
import styled from "styled-components";
import { useState, FC, useEffect } from "react";
import { Button, Link, Input, Grid, Spacer, Tooltip } from "@geist-ui/react";
import { formatEther } from "ethers/lib/utils";

import { JAR_FARM_MAP, PICKLE_ETH_FARM } from "../../containers/Farms/farms";
import { UserFarmData } from "../../containers/UserFarms";
import { Connection } from "../../containers/Connection";
import { Contracts } from "../../containers/Contracts";
import { Jars } from "../../containers/Jars";
import {
  ERC20Transfer,
  Status as ERC20TransferStatus,
} from "../../containers/Erc20Transfer";
import Collapse from "../Collapsible/Collapse";
import { JarApy } from "../../containers/Jars/useJarsWithAPY";
import { useUniPairDayData } from "../../containers/Jars/useUniPairDayData";
import { LpIcon, TokenIcon } from "../../components/TokenIcon";

interface ButtonStatus {
  disabled: boolean;
  text: string;
}

interface DataProps {
  isZero?: boolean;
}

const Data = styled.div<DataProps>`
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => (props.isZero ? "#444" : "unset")};
`;

const Label = styled.div`
  font-family: "Source Sans Pro";
`;

const FARM_LP_TO_ICON = {
  "0xdc98556Ce24f007A5eF6dC1CE96322d65832A819": "/pickle.png",
  "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11": "/dai.png",
  "0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc": "/usdc.png",
  "0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852": "/usdt.png",
  "0xf80758aB42C3B07dA84053Fd88804bCB6BAA4b5c": "/susd.png",
  "0xf79Ae82DCcb71ca3042485c85588a3E0C395D55b": "/punidai.png",
  "0x46206E9BDaf534d057be5EcF231DaD2A1479258B": "/puniusdc.png",
  "0x3a41AB1e362169974132dEa424Fb8079Fd0E94d8": "/puniusdt.png",
  "0x2385D31f1EB3736bE0C3629E6f03C4b3cd997Ffd": "/pscrv.png",
  "0xCffA068F1E44D98D3753966eBd58D4CFe3BB5162": "/dai-gold.png",
  "0x53Bf2E62fA20e2b4522f05de3597890Ec1b352C6": "/usdc-gold.png",
  "0x09FC573c502037B149ba87782ACC81cF093EC6ef": "/usdt-gold.png",
  "0x68d14d66B2B0d6E157c06Dc8Fefa3D8ba0e66a89": "/curve-gold.png",
  "0xc80090AA05374d336875907372EE4ee636CBC562": "/btc.png",
  "0x1BB74b5DdC1f4fC91D6f9E7906cf68bc93538e33": "/3crv.png",
  "0x2E35392F4c36EBa7eCAFE4de34199b2373Af22ec": "/rencrv.png",
  "0x6949Bb624E8e8A90F87cD2058139fcd77D2F3F87": "/dai.png",
  "0x3Bcd97dCA7b1CED292687c97702725F37af01CaC": (
    <LpIcon swapIconSrc={"/uniswap.png"} tokenIconSrc={"/mir-ust.png"} />
  ),
  "0xaFB2FE266c215B5aAe9c4a9DaDC325cC7a497230": (
    <LpIcon swapIconSrc={"/uniswap.png"} tokenIconSrc={"/tesla.png"} />
  ),
  "0xF303B35D5bCb4d9ED20fB122F5E268211dEc0EBd": (
    <LpIcon swapIconSrc={"/uniswap.png"} tokenIconSrc={"/apple.png"} />
  ),
  "0x7C8de3eE2244207A54b57f45286c9eE1465fee9f": (
    <LpIcon swapIconSrc={"/uniswap.png"} tokenIconSrc={"/qqq.png"} />
  ),
  "0x1ed1fD33b62bEa268e527A622108fe0eE0104C07": (
    <LpIcon swapIconSrc={"/uniswap.png"} tokenIconSrc={"/slv.png"} />
  ),
  "0x1CF137F651D8f0A4009deD168B442ea2E870323A": (
    <LpIcon swapIconSrc={"/uniswap.png"} tokenIconSrc={"/baba.png"} />
  ),
  "0x55282dA27a3a02ffe599f6D11314D239dAC89135": (
    <LpIcon swapIconSrc={"/sushiswap.png"} tokenIconSrc={"/dai.png"} />
  ),
  "0x8c2D16B7F6D3F989eb4878EcF13D695A7d504E43": (
    <LpIcon swapIconSrc={"/sushiswap.png"} tokenIconSrc={"/usdc.png"} />
  ),
  "0xa7a37aE5Cb163a3147DE83F15e15D8E5f94D6bCE": (
    <LpIcon swapIconSrc={"/sushiswap.png"} tokenIconSrc={"/usdt.png"} />
  ),
  "0xde74b6c547bd574c3527316a2eE30cd8F6041525": (
    <LpIcon swapIconSrc={"/sushiswap.png"} tokenIconSrc={"/btc.png"} />
  ),
  "0x3261D9408604CC8607b687980D40135aFA26FfED": (
    <LpIcon swapIconSrc={"/sushiswap.png"} tokenIconSrc={"/yfi.png"} />
  ),
  "0x2350fc7268F3f5a6cC31f26c38f706E41547505d": (
    <LpIcon swapIconSrc={"/uniswap.png"} tokenIconSrc={"/bac.png"} />
  ),
  "0x748712686a78737DA0b7643DF78Fdf2778dC5944": (
    <LpIcon swapIconSrc={"/uniswap.png"} tokenIconSrc={"/bas.svg"} />
  ),
  "0xC66583Dd4E25b3cfc8D881F6DbaD8288C7f5Fd30": (
    <LpIcon swapIconSrc={"/sushiswap.png"} tokenIconSrc={"/mic.png"} />
  ),
  "0x0FAA189afE8aE97dE1d2F01E471297678842146d": (
    <LpIcon swapIconSrc={"/sushiswap.png"} tokenIconSrc={"/mis.png"} />
  ),
  "0x77C8A58D940a322Aea02dBc8EE4A30350D4239AD": (
    <LpIcon swapIconSrc={"/curve.png"} tokenIconSrc={"/steth.png"} />
  ),
  "0x5Eff6d166D66BacBC1BF52E2C54dD391AE6b1f48": (
    <LpIcon swapIconSrc={"/sushiswap.png"} tokenIconSrc={"/yvecrv.png"} />
  ),
};

const setButtonStatus = (
  status: ERC20TransferStatus,
  transfering: string,
  idle: string,
  setButtonText: (arg0: ButtonStatus) => void,
) => {
  // Deposit
  if (status === ERC20TransferStatus.Approving) {
    setButtonText({
      disabled: true,
      text: "Approving...",
    });
  }
  if (status === ERC20TransferStatus.Transfering) {
    setButtonText({
      disabled: true,
      text: transfering,
    });
  }
  if (
    status === ERC20TransferStatus.Success ||
    status === ERC20TransferStatus.Failed ||
    status === ERC20TransferStatus.Cancelled
  ) {
    setButtonText({
      disabled: false,
      text: idle,
    });
  }
};

export const FarmCollapsible: FC<{ farmData: UserFarmData }> = ({
  farmData,
}) => {
  const { jars } = Jars.useContainer();

  const {
    poolName,
    poolIndex,
    depositToken,
    depositTokenName,
    balance,
    staked,
    harvestable,
    usdPerToken,
    apy,
  } = farmData;
  const stakedNum = parseFloat(formatEther(staked));
  const valueStr = (stakedNum * usdPerToken).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const bal = parseFloat(formatEther(balance));
  const balStr = bal.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: bal < 1 ? 18 : 4,
  });
  const stakedStr = stakedNum.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: stakedNum < 1 ? 18 : 4,
  });
  const harvestableStr = parseFloat(
    formatEther(harvestable || 0),
  ).toLocaleString();

  const {
    status: erc20TransferStatuses,
    transfer,
    getTransferStatus,
  } = ERC20Transfer.useContainer();
  const { masterchef } = Contracts.useContainer();
  const { signer } = Connection.useContainer();

  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");

  const [stakeButton, setStakeButton] = useState<ButtonStatus>({
    disabled: false,
    text: "Stake",
  });
  const [unstakeButton, setUnstakeButton] = useState<ButtonStatus>({
    disabled: false,
    text: "Unstake",
  });
  const [harvestButton, setHarvestButton] = useState<ButtonStatus>({
    disabled: false,
    text: "Harvest",
  });

  // Get Jar APY (if its from a Jar)
  let APYs: JarApy[] = [{ pickle: apy * 100 }];

  const maybeJar =
    JAR_FARM_MAP[depositToken.address as keyof typeof JAR_FARM_MAP];
  if (jars && maybeJar) {
    const farmingJar = jars.filter((x) => x.jarName === maybeJar.jarName)[0];
    APYs = farmingJar?.APYs ? [...APYs, ...farmingJar.APYs] : APYs;
  }

  const { getUniPairDayAPY } = useUniPairDayData();
  if (depositToken.address.toLowerCase() === PICKLE_ETH_FARM.toLowerCase()) {
    APYs = [...APYs, ...getUniPairDayAPY(PICKLE_ETH_FARM)];
  }

  const tooltipText = APYs.map((x) => {
    const k = Object.keys(x)[0];
    const v = Object.values(x)[0];
    return `${k}: ${v.toFixed(2)}%`;
  }).join(" + ");

  const totalAPY = APYs.map((x) => {
    return Object.values(x).reduce((acc, y) => acc + y, 0);
  }).reduce((acc, x) => acc + x, 0);

  useEffect(() => {
    if (masterchef) {
      const stakeStatus = getTransferStatus(
        depositToken.address,
        masterchef.address,
      );
      const unstakeStatus = getTransferStatus(
        masterchef.address,
        depositToken.address,
      );
      const harvestStatus = getTransferStatus(
        masterchef.address,
        poolIndex.toString(),
      );

      setButtonStatus(stakeStatus, "Staking...", "Stake", setStakeButton);
      setButtonStatus(
        unstakeStatus,
        "Unstaking...",
        "Unstake",
        setUnstakeButton,
      );
      setButtonStatus(
        harvestStatus,
        "Harvesting...",
        "Harvest",
        setHarvestButton,
      );
    }
  }, [erc20TransferStatuses]);

  return (
    <Collapse
      style={{ borderWidth: "1px", boxShadow: "none" }}
      shadow
      preview={
        <Grid.Container gap={1}>
          <Grid xs={24} sm={12} md={5} lg={5}>
            <TokenIcon
              src={
                FARM_LP_TO_ICON[
                  depositToken.address as keyof typeof FARM_LP_TO_ICON
                ]
              }
            />
            <div style={{ width: "100%" }}>
              <div style={{ fontSize: `1rem` }}>{poolName}</div>
              <Label style={{ fontSize: `1rem` }}>{depositTokenName}</Label>
            </div>
          </Grid>
          <Grid xs={24} sm={12} md={3} lg={3}>
            <Tooltip text={apy === 0 ? "--" : tooltipText}>
              <div>{apy === 0 ? "--%" : totalAPY.toFixed(2) + "%"}</div>
              <Label>Total APY</Label>
            </Tooltip>
          </Grid>
          <Grid xs={24} sm={6} md={4} lg={4}>
            <Data isZero={parseFloat(formatEther(harvestable || 0)) === 0}>
              {harvestableStr}
            </Data>
            <Label>Earned</Label>
          </Grid>
          <Grid xs={24} sm={6} md={4} lg={4}>
            <Data isZero={bal === 0}>{balStr}</Data>
            <Label>Balance</Label>
          </Grid>
          <Grid xs={24} sm={6} md={4} lg={4}>
            <Data isZero={stakedNum === 0}>{stakedStr}</Data>
            <Label>Staked</Label>
          </Grid>
          <Grid xs={24} sm={6} md={4} lg={4}>
            <Data isZero={stakedNum * usdPerToken === 0}>${valueStr}</Data>
            <Label>Value Staked</Label>
          </Grid>
        </Grid.Container>
      }
    >
      <Spacer y={1} />
      <Grid.Container gap={2}>
        <Grid xs={24} md={12}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Balance: {balStr}</div>
            <Link
              color
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setStakeAmount(formatEther(balance));
              }}
            >
              Max
            </Link>
          </div>
          <Input
            onChange={(e) => setStakeAmount(e.target.value)}
            value={stakeAmount}
            width="100%"
            type="number"
            size="large"
          />
          <Spacer y={0.5} />
          <Button
            disabled={stakeButton.disabled}
            onClick={() => {
              if (masterchef && signer) {
                transfer({
                  token: depositToken.address,
                  recipient: masterchef.address,
                  transferCallback: async () => {
                    return masterchef
                      .connect(signer)
                      .deposit(poolIndex, ethers.utils.parseEther(stakeAmount));
                  },
                });
              }
            }}
            style={{ width: "100%" }}
          >
            {stakeButton.text}
          </Button>
        </Grid>
        <Grid xs={24} md={12}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Staked: {stakedStr}</div>
            <Link
              color
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setUnstakeAmount(formatEther(staked));
              }}
            >
              Max
            </Link>
          </div>
          <Input
            onChange={(e) => setUnstakeAmount(e.target.value)}
            value={unstakeAmount}
            width="100%"
            type="number"
            size="large"
          />
          <Spacer y={0.5} />
          <Button
            disabled={unstakeButton.disabled}
            onClick={() => {
              if (masterchef && signer) {
                transfer({
                  token: masterchef.address,
                  recipient: depositToken.address,
                  approval: false,
                  transferCallback: async () => {
                    return masterchef
                      .connect(signer)
                      .withdraw(
                        poolIndex,
                        ethers.utils.parseEther(unstakeAmount),
                      );
                  },
                });
              }
            }}
            style={{ width: "100%" }}
          >
            {unstakeButton.text}
          </Button>
        </Grid>
        <Spacer />
        <Grid xs={24}>
          <Spacer />
          <Button
            disabled={harvestButton.disabled}
            onClick={() => {
              if (masterchef && signer) {
                transfer({
                  token: masterchef.address,
                  recipient: masterchef.address + poolIndex.toString(), // Doesn't matter since we don't need approval
                  approval: false,
                  transferCallback: async () => {
                    return masterchef.connect(signer).withdraw(poolIndex, 0);
                  },
                });
              }
            }}
            style={{ width: "100%" }}
          >
            {harvestButton.text}
          </Button>
          <div
            style={{
              width: "100%",
              textAlign: "center",
              fontFamily: "Source Sans Pro",
              fontSize: "0.8rem",
            }}
          >
            PICKLEs are automatically harvested on staking and unstaking.
          </div>
        </Grid>
      </Grid.Container>
    </Collapse>
  );
};

//
import { FC, useState, useEffect } from "react";
import { ethers } from "ethers";
import { Card, Grid, Button, Spacer } from "@geist-ui/react";

import { Jars } from "../../containers/Jars";
import { UserJars } from "../../containers/UserJars";
import { Connection } from "../../containers/Connection";
import { Contracts } from "../../containers/Contracts";

import { parseEther } from "ethers/lib/utils";

import { getTargetAndData } from "./getTargetAndData";
import { PreviewFooter } from "./PreviewFooter";
import { JarSelectors } from "./JarSelectors";
import { InputOptions } from "./InputOptions";

export const Swap: FC = () => {
  const { address, signer, blockNum } = Connection.useContainer();
  const { jars } = Jars.useContainer();
  const { jarData } = UserJars.useContainer();
  const {
    controller,
    curveProxyLogic,
    uniswapv2ProxyLogic,
  } = Contracts.useContainer();

  const [from, setFrom] = useState("pJar 0a");
  const [to, setTo] = useState("pJar 0b");

  const [approving, setApproving] = useState<boolean>(false);
  const [swapping, setSwapping] = useState<boolean>(false);
  const [querying, setQuerying] = useState<boolean>(false);
  const [queryEstimateReturnId, setQueryEstimateReturnId] = useState<
    number | null
  >(null);
  const [
    estimatedReturns,
    setEstimatedReturns,
  ] = useState<ethers.BigNumber | null>(null);
  const [swapAmount, setSwapAmount] = useState<string>("");
  const [slippage, setSlippage] = useState<number>(0.5);
  const [allowance, setAllowance] = useState<ethers.BigNumber | null>(null);

  const toJar = jarData?.filter((jar) => jar.name === to)[0];
  const fromJar = jarData?.filter((jar) => jar.name === from)[0];

  const handleFromSelect = (val: string | string[]) => setFrom(val.toString());
  const handleToSelect = (val: string | string[]) => setTo(val.toString());

  const queryAllowance = async () => {
    if (!controller || !fromJar || !address) return;

    const a = await fromJar.jarContract.allowance(address, controller.address);

    setAllowance(a);
  };

  useEffect(() => {
    queryAllowance();
  }, [from, to, blockNum]);

  useEffect(() => {
    const g = async () => {
      // Start the querying
      if (
        !signer ||
        !fromJar ||
        !toJar ||
        !allowance ||
        !controller ||
        !uniswapv2ProxyLogic ||
        !curveProxyLogic ||
        !address ||
        swapAmount === "" ||
        !swapAmount
      )
        return;

      // Make sure its a number
      try {
        parseFloat(swapAmount);
      } catch {
        return;
      }

      // Remove previous query thread
      if (queryEstimateReturnId) {
        clearTimeout(queryEstimateReturnId);
      }

      if (allowance.gt(ethers.constants.Zero)) {
        setQuerying(true);
        setEstimatedReturns(null);

        const [targets, data] = getTargetAndData(
          fromJar,
          toJar,
          curveProxyLogic,
          uniswapv2ProxyLogic,
          address,
        );

        try {
          const ret = await controller
            .connect(signer)
            .callStatic.swapExactJarForJar(
              fromJar.jarContract.address,
              toJar.jarContract.address,
              ethers.utils.parseEther(swapAmount),
              ethers.constants.Zero,
              targets,
              data,
              {
                gasLimit: 8000000,
              },
            );
          setEstimatedReturns(ret);
        } catch (e) {
          console.log("error estimating jar", e.toString());
        }

        setQuerying(false);
      }
    };

    const id = setTimeout(g, 750);
    setQueryEstimateReturnId(id);
  }, [from, to, allowance, swapAmount]);

  const needsApproval =
    !allowance || (allowance && allowance.lte(ethers.constants.Zero));

  return (
    <Grid.Container gap={2}>
      <Grid xs={24} sm={24} md={24}>
        <Card>
          <Card.Content>
            <Grid.Container gap={2}>
              <JarSelectors
                jars={jars}
                from={from}
                to={to}
                handleFromSelect={handleFromSelect}
                handleToSelect={handleToSelect}
              />
              <InputOptions
                fromJar={fromJar}
                swapAmount={swapAmount}
                setSwapAmount={setSwapAmount}
                slippage={slippage}
                setSlippage={setSlippage}
              />
              <Spacer y={1} />
              <Grid xs={24}>
                <Button
                  disabled={approving || swapping}
                  onClick={async () => {
                    if (
                      !fromJar ||
                      !toJar ||
                      !controller ||
                      !signer ||
                      !curveProxyLogic ||
                      !uniswapv2ProxyLogic ||
                      !address
                    )
                      return;

                    if (needsApproval) {
                      setApproving(true);
                      try {
                        const tx = await fromJar.jarContract
                          .connect(signer)
                          .approve(
                            controller.address,
                            ethers.constants.MaxUint256,
                          );
                        await tx.wait();
                      } catch (e) {
                        console.log("swap: approving: error", e.toString());
                      }
                      await queryAllowance();
                      setApproving(false);
                    }

                    if (!needsApproval) {
                      if (!estimatedReturns) return;

                      setSwapping(true);
                      const [targets, data] = getTargetAndData(
                        fromJar,
                        toJar,
                        curveProxyLogic,
                        uniswapv2ProxyLogic,
                        address,
                      );

                      try {
                        const tx = await controller
                          .connect(signer)
                          .swapExactJarForJar(
                            fromJar.jarContract.address,
                            toJar.jarContract.address,
                            ethers.utils.parseEther(swapAmount),
                            estimatedReturns.sub(
                              estimatedReturns
                                .mul(parseEther(slippage.toString()))
                                .div(parseEther("100")),
                            ),
                            targets,
                            data,
                            {
                              gasLimit: 2600000,
                            },
                          );
                        await tx.wait();
                      } catch (e) {
                        console.log("swap: swapping: error", e.toString());
                      }

                      setSwapping(false);
                    }
                  }}
                  style={{ width: `100%` }}
                >
                  {needsApproval && !approving && "Approve"}
                  {needsApproval && approving && "Approving..."}
                  {!needsApproval && !swapping && "Swap"}
                  {!needsApproval && swapping && "Swapping..."}
                </Button>
              </Grid>
            </Grid.Container>
          </Card.Content>
          <PreviewFooter
            swapAmount={swapAmount}
            fromJar={fromJar}
            toJar={toJar}
            needsApproval={needsApproval}
            querying={querying}
            estimatedReturns={estimatedReturns}
          />
        </Card>
      </Grid>
    </Grid.Container>
  );
};

//
import { useState, useEffect } from "react";
import { createContainer } from "unstated-next";
import { ethers } from "ethers";
import { Provider as MulticallProvider } from "ethers-multicall";
import { Observable } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { useWeb3React } from "@web3-react/core";

type Network = ethers.providers.Network;

function useConnection() {
  const { account, library } = useWeb3React();

  const [
    multicallProvider,
    setMulticallProvider,
  ] = useState<MulticallProvider | null>(null);

  const [network, setNetwork] = useState<Network | null>(null);
  const [blockNum, setBlockNum] = useState<number | null>(null);

  // create observable to stream new blocks
  useEffect(() => {
    if (library) {
      library.getNetwork().then((network: any) => setNetwork(network));

      const ethMulticallProvider = new MulticallProvider(library);
      ethMulticallProvider
        .init()
        .then(() => setMulticallProvider(ethMulticallProvider));

      const observable = new Observable<number>((subscriber) => {
        library.on("block", (blockNumber: number) =>
          subscriber.next(blockNumber),
        );
      });

      // debounce to prevent subscribers making unnecessary calls
      observable.pipe(debounceTime(1000)).subscribe((blockNumber) => {
        // Update every 5 blocks otherwise its very laggy
        if (blockNumber > (blockNum || 0) + 5) {
          setBlockNum(blockNumber);
        }
      });
    } else {
      setMulticallProvider(null);
      setBlockNum(null);
    }
  }, [library]);

  return {
    multicallProvider,
    provider: library,
    address: account,
    network,
    blockNum,
    signer: library?.getSigner(),
  };
}

export const Connection = createContainer(useConnection);

//
import { createContainer } from "unstated-next";
import { useEffect, useState } from "react";

import { Connection } from "./Connection";
import { Contracts } from "./Contracts";
import { ethers } from "ethers";

import { Contract as MulticallContract } from "ethers-multicall";

interface TokenBalances {
  [k: string]: ethers.BigNumber;
}

function useBalances() {
  const {
    address,
    provider,
    blockNum,
    multicallProvider,
  } = Connection.useContainer();
  const { erc20 } = Contracts.useContainer();

  const [tokenBalances, setTokenBalances] = useState<TokenBalances>({});
  const [tokenAddresses, setTokenAddresses] = useState<Array<string>>([]);

  const updateBalances = async () => {
    if (erc20 && address && provider && multicallProvider) {
      const balances = await multicallProvider.all(
        tokenAddresses.map((x) => {
          const c = new MulticallContract(x, erc20.interface.fragments);
          return c.balanceOf(address);
        }),
      );

      const res = tokenAddresses.map((x, idx) => {
        return {
          [x]: balances[idx],
        };
      });

      const newTokenBalances = res.reduce((acc, x) => {
        return { ...acc, ...x };
      }, {});

      setTokenBalances(newTokenBalances);
    }
  };

  useEffect(() => {
    updateBalances();
  }, [blockNum, tokenAddresses]);

  const addTokens = async (addresses: Array<string>) => {
    const newAddresses = addresses
      .map((x) => x.toLowerCase())
      .filter((x) => !tokenAddresses.includes(x));
    setTokenAddresses([...tokenAddresses, ...newAddresses]);
  };

  const getBalance = async (address: string) => {
    return tokenBalances[address.toLowerCase()];
  };

  return {
    tokenBalances,
    addTokens,
    getBalance,
  };
}

export const Balances = createContainer(useBalances);

//
import { createContainer } from "unstated-next";
import { useState } from "react";
import { TransactionResponse } from "@ethersproject/abstract-provider";

import { Connection } from "./Connection";
import { Contracts } from "./Contracts";
import { ethers } from "ethers";

export enum Status {
  Approving,
  Transfering,
  Success,
  Failed,
  Cancelled,
}

interface TransferStatus {
  [k: string]: Status;
}

interface TransferFunction {
  token: string;
  recipient: string;
  transferCallback: () => Promise<TransactionResponse>;
  approval?: boolean;
}

function useERC20Transfer() {
  const { address, provider, signer } = Connection.useContainer();
  const { erc20 } = Contracts.useContainer();

  const [status, setStatus] = useState<TransferStatus>({});

  const transfer = async ({
    token,
    recipient,
    transferCallback,
    approval = true,
  }: TransferFunction) => {
    if (erc20 && address && provider && signer) {
      if (approval) {
        const Token = erc20.attach(token).connect(signer);
        const allowance = await Token.allowance(address, recipient);

        if (allowance.lte(ethers.constants.Zero)) {
          setTransferStatus(token, recipient, Status.Approving);

          try {
            const tx = await Token.approve(
              recipient,
              ethers.constants.MaxUint256,
            );
            await tx.wait();
          } catch (e) {
            setTransferStatus(token, recipient, Status.Failed);
            return;
          }
        }
      }

      setTransferStatus(token, recipient, Status.Transfering);

      try {
        const tx = await transferCallback();
        await tx.wait();
      } catch (e) {
        console.log("error", e.toString());
        setTransferStatus(token, recipient, Status.Failed);
        return;
      }

      setTransferStatus(token, recipient, Status.Success);
    }
  };

  const setTransferStatus = (token: string, recipient: string, s: Status) => {
    setStatus({
      ...status,
      [`${token.toLowerCase()},${recipient.toLowerCase()}`]: s,
    });
  };

  const getTransferStatus = (token: string, recipient: string): Status => {
    return status[`${token.toLowerCase()},${recipient.toLowerCase()}`];
  };

  return {
    status,
    getTransferStatus,
    transfer,
  };
}

export const ERC20Transfer = createContainer(useERC20Transfer);

//
//const expect = require('chai').expect;
const ethers = require("ethers");
const ganache = require("ganache-cli");
const CONSTANTS = require("./utils/constants");
const TOKEN_JSON = require("./../build/contracts/Token.json");

const getProvider = network => {
  switch (network) {
    case "local":
      return new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545");
    case "cli":
      return new ethers.providers.Web3Provider(
        ganache.provider({
          mnemonic:
            "weapon stamp galaxy acquire copy ready soft pole depart tool task blind",
          gasLimit: 8000000,
          // "gasPrice": 0,
          // "hardfork": "petersburg",
          // "default_balance_ether": 0,
          // "network_id": 5799,
          // "locked": false,
          // "port": 5799,
          // "total_accounts": 1,
          // "unlocked_accounts": [],
          verbose: true,
          vmErrorsOnRPCResponse: true
        })
      );
    default:
      break;
  }
};

const provider = getProvider("cli");

describe("setup test env", async function() {
  this.timeout(9000);

  it("Setup accounts", async () => {
    this.DEVELOPER_SIGNER = ethers.Wallet.fromMnemonic(
      "weapon stamp galaxy acquire copy ready soft pole depart tool task blind"
    ).connect(provider);
    this.DEVELOPER = await this.DEVELOPER_SIGNER.getAddress();
  });

  it("Deploy EXCHANGE_CONTRACT", async () => {
    const exchangeContractFactory = new ethers.ContractFactory(
      CONSTANTS.exchangeByteAbi,
      CONSTANTS.exchangeByteCode,
      this.DEVELOPER_SIGNER
    );
    this.EXCHANGE_CONTRACT = await exchangeContractFactory.deploy();
    await this.EXCHANGE_CONTRACT.deployed();
    console.log(
      "EXCHANGE_CONTRACT deployed => ",
      this.EXCHANGE_CONTRACT.address
    );
  });

  it("Deploy FACTORY_CONTRACT", async () => {
    const factoryContractFactory = new ethers.ContractFactory(
      CONSTANTS.factoryAbi,
      CONSTANTS.factoryByteCode,
      this.DEVELOPER_SIGNER
    );
    this.FACTORY_CONTRACT = await factoryContractFactory.deploy();
    await this.FACTORY_CONTRACT.deployed();
    console.log("FACTORY_CONTRACT deployed => ", this.FACTORY_CONTRACT.address);
  });

  it("setup tokenFactory", async () => {
    this.TOKEN_FACTORY = new ethers.ContractFactory(
      TOKEN_JSON.abi,
      TOKEN_JSON.bytecode,
      this.DEVELOPER_SIGNER
    );
    console.log("TOKEN_FACTORY has been setup");
  });

  it("Deploy TOKEN_ONE", async () => {
    this.TOKEN_ONE = await this.TOKEN_FACTORY.deploy("FIRST TOKEN", "ONE");
    await this.TOKEN_ONE.deployed();
    console.log("TOKEN_ONE deployed => ", this.TOKEN_ONE.address);
    console.log(
      "TOKEN_ONE balance developer => ",
      (await this.TOKEN_ONE.balanceOf(this.DEVELOPER)).toString()
    );
  });

  it("init Factory", async () => {
    const tx = await this.FACTORY_CONTRACT.initializeFactory(
      this.EXCHANGE_CONTRACT.address
    );
    await tx.wait();
  });

  it("create Exchange", async () => {
    await this.FACTORY_CONTRACT.createExchange(this.TOKEN_ONE.address, {
      gasLimit: 8000000
    });
    this.TOKEN_ONE_EXCHANGE_ADDRESS = await this.FACTORY_CONTRACT.getExchange(
      this.TOKEN_ONE.address
    );
    console.log(
      "TOKEN_ONE_EXCHANGE_ADDRESS => ",
      this.TOKEN_ONE_EXCHANGE_ADDRESS
    );

    this.TOKEN_ONE_EXCHANGE = new ethers.Contract(
      this.TOKEN_ONE_EXCHANGE_ADDRESS,
      CONSTANTS.exchangeByteAbi,
      this.DEVELOPER_SIGNER
    );

    await this.TOKEN_ONE.approve(
      this.TOKEN_ONE_EXCHANGE_ADDRESS,
      await this.TOKEN_ONE.balanceOf(this.DEVELOPER)
    );
    console.log(
      "Allowance for TOKEN ONE in exchange => ",
      (await this.TOKEN_ONE.allowance(
        this.DEVELOPER,
        this.TOKEN_ONE_EXCHANGE_ADDRESS
      )).toString()
    );
  });

  it("add Liquidity", async () => {
    const tx = await this.TOKEN_ONE_EXCHANGE.addLiquidity(
      1,
      ethers.utils.parseEther("1"),
      1739591241,
      { value: ethers.utils.parseEther("1"), gasLimit: 8000000 }
    );
    await tx.wait();
  });
});

//
import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react'
import { useWeb3Context } from 'web3-react'
import { ethers } from 'ethers'

import {
  isAddress,
  getTokenName,
  getTokenSymbol,
  getTokenDecimals,
  getTokenExchangeAddressFromFactory,
  safeAccess
} from '../utils'

const NAME = 'name'
const SYMBOL = 'symbol'
const DECIMALS = 'decimals'
const EXCHANGE_ADDRESS = 'exchangeAddress'

const UPDATE = 'UPDATE'

const ETH = {
  ETH: {
    [NAME]: 'Ethereum',
    [SYMBOL]: 'ETH',
    [DECIMALS]: 18,
    [EXCHANGE_ADDRESS]: null
  }
}

const INITIAL_TOKENS_CONTEXT = {
  1: {
    '0x960b236A07cf122663c4303350609A66A7B288C0': {
      [NAME]: 'Aragon Network Token',
      [SYMBOL]: 'ANT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x077d52B047735976dfdA76feF74d4d988AC25196'
    },
    '0x0D8775F648430679A709E98d2b0Cb6250d2887EF': {
      [NAME]: 'Basic Attention Token',
      [SYMBOL]: 'BAT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x2E642b8D59B45a1D8c5aEf716A84FF44ea665914'
    },
    '0x107c4504cd79C5d2696Ea0030a8dD4e92601B82e': {
      [NAME]: 'Bloom Token',
      [SYMBOL]: 'BLT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x0E6A53B13688018A3df8C69f99aFB19A3068D04f'
    },
    '0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C': {
      [NAME]: 'Bancor Network Token',
      [SYMBOL]: 'BNT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x87d80DBD37E551F58680B4217b23aF6a752DA83F'
    },
    '0x26E75307Fc0C021472fEb8F727839531F112f317': {
      [NAME]: 'Crypto20',
      [SYMBOL]: 'C20',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xF7B5A4b934658025390ff69dB302BC7F2AC4a542'
    },
    '0xF5DCe57282A584D2746FaF1593d3121Fcac444dC': {
      [NAME]: 'Compound Dai',
      [SYMBOL]: 'cDAI',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x45A2FDfED7F7a2c791fb1bdF6075b83faD821ddE'
    },
    '0x41e5560054824eA6B0732E656E3Ad64E20e94E45': {
      [NAME]: 'Civic',
      [SYMBOL]: 'CVC',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x1C6c712b1F4a7c263B1DBd8F97fb447c945d3b9a'
    },
    '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359': {
      [NAME]: 'Dai Stablecoin v1.0',
      [SYMBOL]: 'DAI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x09cabEC1eAd1c0Ba254B09efb3EE13841712bE14'
    },
    '0x4f3AfEC4E5a3F2A6a1A411DEF7D7dFe50eE057bF': {
      [NAME]: 'Digix Gold Token',
      [SYMBOL]: 'DGX',
      [DECIMALS]: 9,
      [EXCHANGE_ADDRESS]: '0xb92dE8B30584392Af27726D5ce04Ef3c4e5c9924'
    },
    '0x4946Fcea7C692606e8908002e55A582af44AC121': {
      [NAME]: 'FOAM Token',
      [SYMBOL]: 'FOAM',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xf79cb3BEA83BD502737586A6E8B133c378FD1fF2'
    },
    '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b': {
      [NAME]: 'FunFair',
      [SYMBOL]: 'FUN',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x60a87cC7Fca7E53867facB79DA73181B1bB4238B'
    },
    '0x543Ff227F64Aa17eA132Bf9886cAb5DB55DCAddf': {
      [NAME]: 'DAOstack',
      [SYMBOL]: 'GEN',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x26Cc0EAb6Cb650B0Db4D0d0dA8cB5BF69F4ad692'
    },
    '0x6810e776880C02933D47DB1b9fc05908e5386b96': {
      [NAME]: 'Gnosis Token',
      [SYMBOL]: 'GNO',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xe8e45431b93215566BA923a7E611B7342Ea954DF'
    },
    '0x12B19D3e2ccc14Da04FAe33e63652ce469b3F2FD': {
      [NAME]: 'GRID Token',
      [SYMBOL]: 'GRID',
      [DECIMALS]: 12,
      [EXCHANGE_ADDRESS]: '0x4B17685b330307C751B47f33890c8398dF4Fe407'
    },
    '0x818Fc6C2Ec5986bc6E2CBf00939d90556aB12ce5': {
      [NAME]: 'Kin',
      [SYMBOL]: 'KIN',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xb7520a5F8c832c573d6BD0Df955fC5c9b72400F7'
    },
    '0xdd974D5C2e2928deA5F71b9825b8b646686BD200': {
      [NAME]: 'Kyber Network Crystal',
      [SYMBOL]: 'KNC',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x49c4f9bc14884f6210F28342ceD592A633801a8b'
    },
    '0x514910771AF9Ca656af840dff83E8264EcF986CA': {
      [NAME]: 'ChainLink Token',
      [SYMBOL]: 'LINK',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xF173214C720f58E03e194085B1DB28B50aCDeeaD'
    },
    '0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD': {
      [NAME]: 'LoopringCoin V2',
      [SYMBOL]: 'LRC',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xA539BAaa3aCA455c986bB1E25301CEF936CE1B65'
    },
    '0x6c6EE5e31d828De241282B9606C8e98Ea48526E2': {
      [NAME]: 'HoloToken',
      [SYMBOL]: 'HOT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xd4777E164c6C683E10593E08760B803D58529a8E'
    },
    '0xD29F0b5b3F50b07Fe9a9511F7d86F4f4bAc3f8c4': {
      [NAME]: 'Liquidity.Network Token',
      [SYMBOL]: 'LQD',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xe3406e7D0155E0a83236eC25D34Cd3D903036669'
    },
    '0xA4e8C3Ec456107eA67d3075bF9e3DF3A75823DB0': {
      [NAME]: 'LoomToken',
      [SYMBOL]: 'LOOM',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x417CB32bc991fBbDCaE230C7c4771CC0D69daA6b'
    },
    '0x58b6A8A3302369DAEc383334672404Ee733aB239': {
      [NAME]: 'Livepeer Token',
      [SYMBOL]: 'LPT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xc4a1C45D5546029Fd57128483aE65b56124BFA6A'
    },
    '0x0F5D2fB29fb7d3CFeE444a200298f468908cC942': {
      [NAME]: 'Decentraland MANA',
      [SYMBOL]: 'MANA',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xC6581Ce3A005e2801c1e0903281BBd318eC5B5C2'
    },
    '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0': {
      [NAME]: 'Matic Token',
      [SYMBOL]: 'MATIC',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x9a7A75E66B325a3BD46973B2b57c9b8d9D26a621'
    },
    '0x80f222a749a2e18Eb7f676D371F19ad7EFEEe3b7': {
      [NAME]: 'Magnolia Token',
      [SYMBOL]: 'MGN',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xdd80Ca8062c7Ef90FcA2547E6a2A126C596e611F'
    },
    '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2': {
      [NAME]: 'Maker',
      [SYMBOL]: 'MKR',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x2C4Bd064b998838076fa341A83d007FC2FA50957'
    },
    '0x957c30aB0426e0C93CD8241E2c60392d08c6aC8e': {
      [NAME]: 'Modum Token',
      [SYMBOL]: 'MOD',
      [DECIMALS]: 0,
      [EXCHANGE_ADDRESS]: '0xCCB98654CD486216fFF273dd025246588E77cFC1'
    },
    '0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206': {
      [NAME]: 'Nexo',
      [SYMBOL]: 'NEXO',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x069C97DBA948175D10af4b2414969e0B88d44669'
    },
    '0x1776e1F26f98b1A5dF9cD347953a26dd3Cb46671': {
      [NAME]: 'Numeraire',
      [SYMBOL]: 'NMR',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x2Bf5A5bA29E60682fC56B2Fcf9cE07Bef4F6196f'
    },
    '0x8E870D67F660D95d5be530380D0eC0bd388289E1': {
      [NAME]: 'PAX',
      [SYMBOL]: 'PAX',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xC040d51b07Aea5d94a89Bc21E8078B77366Fc6C7'
    },
    '0x93ED3FBe21207Ec2E8f2d3c3de6e058Cb73Bc04d': {
      [NAME]: 'Pinakion',
      [SYMBOL]: 'PNK',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xF506828B166de88cA2EDb2A98D960aBba0D2402A'
    },
    '0x6758B7d441a9739b98552B373703d8d3d14f9e62': {
      [NAME]: 'POA ERC20 on Foundation',
      [SYMBOL]: 'POA20',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xA2E6B3EF205FeAEe475937c4883b24E6eB717eeF'
    },
    '0x687BfC3E73f6af55F0CccA8450114D107E781a0e': {
      [NAME]: 'QChi',
      [SYMBOL]: 'QCH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x755899F0540c3548b99E68C59AdB0f15d2695188'
    },
    '0x255Aa6DF07540Cb5d3d297f0D0D4D84cb52bc8e6': {
      [NAME]: 'Raiden Token',
      [SYMBOL]: 'RDN',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x7D03CeCb36820b4666F45E1b4cA2538724Db271C'
    },
    '0x408e41876cCCDC0F92210600ef50372656052a38': {
      [NAME]: 'Republic Token',
      [SYMBOL]: 'REN',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x43892992B0b102459E895B88601Bb2C76736942c'
    },
    '0x1985365e9f78359a9B6AD760e32412f4a445E862': {
      [NAME]: 'Reputation',
      [SYMBOL]: 'REP',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x48B04d2A05B6B604d8d5223Fd1984f191DED51af'
    },
    '0x168296bb09e24A88805CB9c33356536B980D3fC5': {
      [NAME]: 'RHOC',
      [SYMBOL]: 'RHOC',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x394e524b47A3AB3D3327f7fF6629dC378c1494a3'
    },
    '0x607F4C5BB672230e8672085532f7e901544a7375': {
      [NAME]: 'iEx.ec Network Token',
      [SYMBOL]: 'RLC',
      [DECIMALS]: 9,
      [EXCHANGE_ADDRESS]: '0xA825CAE02B310E9901b4776806CE25db520c8642'
    },
    '0x4156D3342D5c385a87D264F90653733592000581': {
      [NAME]: 'Salt',
      [SYMBOL]: 'SALT',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0xC0C59cDe851bfcbdddD3377EC10ea54A18Efb937'
    },
    '0x744d70FDBE2Ba4CF95131626614a1763DF805B9E': {
      [NAME]: 'Status Network Token',
      [SYMBOL]: 'SNT',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x1aEC8F11A7E78dC22477e91Ed924Fab46e3A88Fd'
    },
    '0x5a4aDe4f3E934a0885f42884F7077261C3F4f66F': {
      [NAME]: 'Synthetix Network Token',
      [SYMBOL]: 'SNX',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x8Da198A049426bFCf1522B0Dc52f84beDa6e38FF'
    },
    '0x42d6622deCe394b54999Fbd73D108123806f6a18': {
      [NAME]: 'SPANK',
      [SYMBOL]: 'SPANK',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x4e395304655F0796bc3bc63709DB72173b9DdF98'
    },
    '0x0cbe2df57ca9191b64a7af3baa3f946fa7df2f25': {
      [NAME]: 'Synth sUSD',
      [SYMBOL]: 'sUSD',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xA1ECDcca26150cF69090280eE2EE32347C238c7b'
    },
    '0xaAAf91D9b90dF800Df4F55c205fd6989c977E73a': {
      [NAME]: 'Monolith TKN',
      [SYMBOL]: 'TKN',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0xb6cFBf322db47D39331E306005DC7E5e6549942B'
    },
    '0x8dd5fbCe2F6a956C3022bA3663759011Dd51e73E': {
      [NAME]: 'TrueUSD',
      [SYMBOL]: 'TUSD',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x4F30E682D0541eAC91748bd38A648d759261b8f3'
    },
    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': {
      [NAME]: 'USD//C',
      [SYMBOL]: 'USDC',
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: '0x97deC872013f6B5fB443861090ad931542878126'
    },
    '0x8f3470A7388c05eE4e7AF3d01D8C722b0FF52374': {
      [NAME]: 'Veritaseum',
      [SYMBOL]: 'VERI',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x17e5BF07D696eaf0d14caA4B44ff8A1E17B34de3'
    },
    '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599': {
      [NAME]: 'Wrapped BTC',
      [SYMBOL]: 'WBTC',
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: '0x4d2f5cFbA55AE412221182D8475bC85799A5644b'
    },
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': {
      [NAME]: 'Wrapped Ether',
      [SYMBOL]: 'WETH',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xA2881A90Bf33F03E7a3f803765Cd2ED5c8928dFb'
    },
    '0xB4272071eCAdd69d933AdcD19cA99fe80664fc08': {
      [NAME]: 'CryptoFranc',
      [SYMBOL]: 'XCHF',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0x8dE0d002DC83478f479dC31F76cB0a8aa7CcEa17'
    },
    '0xE41d2489571d322189246DaFA5ebDe1F4699F498': {
      [NAME]: '0x Protocol Token',
      [SYMBOL]: 'ZRX',
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: '0xaE76c84C9262Cdb9abc0C2c8888e62Db8E22A0bF'
    }
  }
}

const TokensContext = createContext()

function useTokensContext() {
  return useContext(TokensContext)
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE: {
      const { networkId, tokenAddress, name, symbol, decimals, exchangeAddress } = payload
      return {
        ...state,
        [networkId]: {
          ...(safeAccess(state, [networkId]) || {}),
          [tokenAddress]: {
            [NAME]: name,
            [SYMBOL]: symbol,
            [DECIMALS]: decimals,
            [EXCHANGE_ADDRESS]: exchangeAddress
          }
        }
      }
    }
    default: {
      throw Error(`Unexpected action type in TokensContext reducer: '${type}'.`)
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_TOKENS_CONTEXT)

  const update = useCallback((networkId, tokenAddress, name, symbol, decimals, exchangeAddress) => {
    dispatch({ type: UPDATE, payload: { networkId, tokenAddress, name, symbol, decimals, exchangeAddress } })
  }, [])

  return (
    <TokensContext.Provider value={useMemo(() => [state, { update }], [state, update])}>
      {children}
    </TokensContext.Provider>
  )
}

export function useTokenDetails(tokenAddress) {
  const { networkId, library } = useWeb3Context()

  const [state, { update }] = useTokensContext()
  const allTokensInNetwork = { ...ETH, ...(safeAccess(state, [networkId]) || {}) }
  const { [NAME]: name, [SYMBOL]: symbol, [DECIMALS]: decimals, [EXCHANGE_ADDRESS]: exchangeAddress } =
    safeAccess(allTokensInNetwork, [tokenAddress]) || {}

  useEffect(() => {
    if (
      isAddress(tokenAddress) &&
      (name === undefined || symbol === undefined || decimals === undefined || exchangeAddress === undefined) &&
      (networkId || networkId === 0) &&
      library
    ) {
      let stale = false

      const namePromise = getTokenName(tokenAddress, library).catch(() => null)
      const symbolPromise = getTokenSymbol(tokenAddress, library).catch(() => null)
      const decimalsPromise = getTokenDecimals(tokenAddress, library).catch(() => null)
      const exchangeAddressPromise = getTokenExchangeAddressFromFactory(tokenAddress, networkId, library).catch(
        () => null
      )

      Promise.all([namePromise, symbolPromise, decimalsPromise, exchangeAddressPromise]).then(
        ([resolvedName, resolvedSymbol, resolvedDecimals, resolvedExchangeAddress]) => {
          if (!stale) {
            update(networkId, tokenAddress, resolvedName, resolvedSymbol, resolvedDecimals, resolvedExchangeAddress)
          }
        }
      )

      return () => {
        stale = true
      }
    }
  }, [tokenAddress, name, symbol, decimals, exchangeAddress, networkId, library, update])

  return { name, symbol, decimals, exchangeAddress }
}

export function useAllTokenDetails(requireExchange = true) {
  const { networkId } = useWeb3Context()

  const [state] = useTokensContext()
  const tokenDetails = { ...ETH, ...(safeAccess(state, [networkId]) || {}) }

  return requireExchange
    ? Object.keys(tokenDetails)
        .filter(
          tokenAddress =>
            tokenAddress === 'ETH' ||
            (safeAccess(tokenDetails, [tokenAddress, EXCHANGE_ADDRESS]) &&
              safeAccess(tokenDetails, [tokenAddress, EXCHANGE_ADDRESS]) !== ethers.constants.AddressZero)
        )
        .reduce((accumulator, tokenAddress) => {
          accumulator[tokenAddress] = tokenDetails[tokenAddress]
          return accumulator
        }, {})
    : tokenDetails
}

//
import React, { useState, useReducer, useEffect } from 'react'
import ReactGA from 'react-ga'
import { useTranslation } from 'react-i18next'
import { useWeb3Context } from 'web3-react'
import { ethers } from 'ethers'
import styled from 'styled-components'

import { Button } from '../../theme'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import NewContextualInfo from '../../components/ContextualInfoNew'
import OversizedPanel from '../../components/OversizedPanel'
import ArrowDownBlue from '../../assets/images/arrow-down-blue.svg'
import ArrowDownGrey from '../../assets/images/arrow-down-grey.svg'
import { amountFormatter, calculateGasMargin } from '../../utils'
import { useExchangeContract } from '../../hooks'
import { useTokenDetails } from '../../contexts/Tokens'
import { useTransactionAdder } from '../../contexts/Transactions'
import { useAddressBalance, useExchangeReserves } from '../../contexts/Balances'
import { useAddressAllowance } from '../../contexts/Allowances'

const INPUT = 0
const OUTPUT = 1

const ETH_TO_TOKEN = 0
const TOKEN_TO_ETH = 1
const TOKEN_TO_TOKEN = 2

// denominated in bips
const ALLOWED_SLIPPAGE = ethers.utils.bigNumberify(200)
const TOKEN_ALLOWED_SLIPPAGE = ethers.utils.bigNumberify(400)

// denominated in seconds
const DEADLINE_FROM_NOW = 60 * 15

// denominated in bips
const GAS_MARGIN = ethers.utils.bigNumberify(1000)

const BlueSpan = styled.span`
  color: ${({ theme }) => theme.royalBlue};
`

const LastSummaryText = styled.div`
  margin-top: 1rem;
`

const DownArrowBackground = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  justify-content: center;
  align-items: center;
`

const DownArrow = styled.img`
  width: 0.625rem;
  height: 0.625rem;
  position: relative;
  padding: 0.875rem;
  cursor: ${({ clickable }) => clickable && 'pointer'};
`

const ExchangeRateWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  color: ${({ theme }) => theme.doveGray};
  font-size: 0.75rem;
  padding: 0.5rem 1rem;
`

const ExchangeRate = styled.span`
  flex: 1 1 auto;
  width: 0;
  color: ${({ theme }) => theme.chaliceGray};
`

const Flex = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;

  button {
    max-width: 20rem;
  }
`

function calculateSlippageBounds(value, token = false) {
  if (value) {
    const offset = value.mul(token ? TOKEN_ALLOWED_SLIPPAGE : ALLOWED_SLIPPAGE).div(ethers.utils.bigNumberify(10000))
    const minimum = value.sub(offset)
    const maximum = value.add(offset)
    return {
      minimum: minimum.lt(ethers.constants.Zero) ? ethers.constants.Zero : minimum,
      maximum: maximum.gt(ethers.constants.MaxUint256) ? ethers.constants.MaxUint256 : maximum
    }
  } else {
    return {}
  }
}

function getSwapType(inputCurrency, outputCurrency) {
  if (!inputCurrency || !outputCurrency) {
    return null
  } else if (inputCurrency === 'ETH') {
    return ETH_TO_TOKEN
  } else if (outputCurrency === 'ETH') {
    return TOKEN_TO_ETH
  } else {
    return TOKEN_TO_TOKEN
  }
}

// this mocks the getInputPrice function, and calculates the required output
function calculateEtherTokenOutputFromInput(inputAmount, inputReserve, outputReserve) {
  const inputAmountWithFee = inputAmount.mul(ethers.utils.bigNumberify(997))
  const numerator = inputAmountWithFee.mul(outputReserve)
  const denominator = inputReserve.mul(ethers.utils.bigNumberify(1000)).add(inputAmountWithFee)
  return numerator.div(denominator)
}

// this mocks the getOutputPrice function, and calculates the required input
function calculateEtherTokenInputFromOutput(outputAmount, inputReserve, outputReserve) {
  const numerator = inputReserve.mul(outputAmount).mul(ethers.utils.bigNumberify(1000))
  const denominator = outputReserve.sub(outputAmount).mul(ethers.utils.bigNumberify(997))
  return numerator.div(denominator).add(ethers.constants.One)
}

function getInitialSwapState(outputCurrency) {
  return {
    independentValue: '', // this is a user input
    dependentValue: '', // this is a calculated number
    independentField: INPUT,
    inputCurrency: 'ETH',
    outputCurrency: outputCurrency ? outputCurrency : ''
  }
}

function swapStateReducer(state, action) {
  switch (action.type) {
    case 'FLIP_INDEPENDENT': {
      const { independentField, inputCurrency, outputCurrency } = state
      return {
        ...state,
        dependentValue: '',
        independentField: independentField === INPUT ? OUTPUT : INPUT,
        inputCurrency: outputCurrency,
        outputCurrency: inputCurrency
      }
    }
    case 'SELECT_CURRENCY': {
      const { inputCurrency, outputCurrency } = state
      const { field, currency } = action.payload

      const newInputCurrency = field === INPUT ? currency : inputCurrency
      const newOutputCurrency = field === OUTPUT ? currency : outputCurrency

      if (newInputCurrency === newOutputCurrency) {
        return {
          ...state,
          inputCurrency: field === INPUT ? currency : '',
          outputCurrency: field === OUTPUT ? currency : ''
        }
      } else {
        return {
          ...state,
          inputCurrency: newInputCurrency,
          outputCurrency: newOutputCurrency
        }
      }
    }
    case 'UPDATE_INDEPENDENT': {
      const { field, value } = action.payload
      const { dependentValue, independentValue } = state
      return {
        ...state,
        independentValue: value,
        dependentValue: value === independentValue ? dependentValue : '',
        independentField: field
      }
    }
    case 'UPDATE_DEPENDENT': {
      return {
        ...state,
        dependentValue: action.payload
      }
    }
    default: {
      return getInitialSwapState()
    }
  }
}

function getExchangeRate(inputValue, inputDecimals, outputValue, outputDecimals, invert = false) {
  try {
    if (
      inputValue &&
      (inputDecimals || inputDecimals === 0) &&
      outputValue &&
      (outputDecimals || outputDecimals === 0)
    ) {
      const factor = ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18))

      if (invert) {
        return inputValue
          .mul(factor)
          .div(outputValue)
          .mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(outputDecimals)))
          .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(inputDecimals)))
      } else {
        return outputValue
          .mul(factor)
          .div(inputValue)
          .mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(inputDecimals)))
          .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(outputDecimals)))
      }
    }
  } catch {}
}

function getMarketRate(
  swapType,
  inputReserveETH,
  inputReserveToken,
  inputDecimals,
  outputReserveETH,
  outputReserveToken,
  outputDecimals,
  invert = false
) {
  if (swapType === ETH_TO_TOKEN) {
    return getExchangeRate(outputReserveETH, 18, outputReserveToken, outputDecimals, invert)
  } else if (swapType === TOKEN_TO_ETH) {
    return getExchangeRate(inputReserveToken, inputDecimals, inputReserveETH, 18, invert)
  } else if (swapType === TOKEN_TO_TOKEN) {
    const factor = ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18))
    const firstRate = getExchangeRate(inputReserveToken, inputDecimals, inputReserveETH, 18)
    const secondRate = getExchangeRate(outputReserveETH, 18, outputReserveToken, outputDecimals)
    try {
      return !!(firstRate && secondRate) ? firstRate.mul(secondRate).div(factor) : undefined
    } catch {}
  }
}

export default function Swap({ initialCurrency }) {
  const { t } = useTranslation()
  const { account } = useWeb3Context()

  const addTransaction = useTransactionAdder()

  // analytics
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  // core swap state
  const [swapState, dispatchSwapState] = useReducer(swapStateReducer, initialCurrency, getInitialSwapState)
  const { independentValue, dependentValue, independentField, inputCurrency, outputCurrency } = swapState

  // get swap type from the currency types
  const swapType = getSwapType(inputCurrency, outputCurrency)

  // get decimals and exchange addressfor each of the currency types
  const { symbol: inputSymbol, decimals: inputDecimals, exchangeAddress: inputExchangeAddress } = useTokenDetails(
    inputCurrency
  )
  const { symbol: outputSymbol, decimals: outputDecimals, exchangeAddress: outputExchangeAddress } = useTokenDetails(
    outputCurrency
  )

  const inputExchangeContract = useExchangeContract(inputExchangeAddress)
  const outputExchangeContract = useExchangeContract(outputExchangeAddress)
  const contract = swapType === ETH_TO_TOKEN ? outputExchangeContract : inputExchangeContract

  // get input allowance
  const inputAllowance = useAddressAllowance(account, inputCurrency, inputExchangeAddress)

  // fetch reserves for each of the currency types
  const { reserveETH: inputReserveETH, reserveToken: inputReserveToken } = useExchangeReserves(inputCurrency)
  const { reserveETH: outputReserveETH, reserveToken: outputReserveToken } = useExchangeReserves(outputCurrency)

  // get balances for each of the currency types
  const inputBalance = useAddressBalance(account, inputCurrency)
  const outputBalance = useAddressBalance(account, outputCurrency)
  const inputBalanceFormatted = !!(inputBalance && Number.isInteger(inputDecimals))
    ? amountFormatter(inputBalance, inputDecimals, Math.min(4, inputDecimals))
    : ''
  const outputBalanceFormatted = !!(outputBalance && Number.isInteger(outputDecimals))
    ? amountFormatter(outputBalance, outputDecimals, Math.min(4, outputDecimals))
    : ''

  // compute useful transforms of the data above
  const independentDecimals = independentField === INPUT ? inputDecimals : outputDecimals
  const dependentDecimals = independentField === OUTPUT ? inputDecimals : outputDecimals

  // declare/get parsed and formatted versions of input/output values
  const [independentValueParsed, setIndependentValueParsed] = useState()
  const dependentValueFormatted = !!(dependentValue && (dependentDecimals || dependentDecimals === 0))
    ? amountFormatter(dependentValue, dependentDecimals, Math.min(4, dependentDecimals), false)
    : ''
  const inputValueParsed = independentField === INPUT ? independentValueParsed : dependentValue
  const inputValueFormatted = independentField === INPUT ? independentValue : dependentValueFormatted
  const outputValueParsed = independentField === OUTPUT ? independentValueParsed : dependentValue
  const outputValueFormatted = independentField === OUTPUT ? independentValue : dependentValueFormatted

  // validate + parse independent value
  const [independentError, setIndependentError] = useState()
  useEffect(() => {
    if (independentValue && (independentDecimals || independentDecimals === 0)) {
      try {
        const parsedValue = ethers.utils.parseUnits(independentValue, independentDecimals)

        if (parsedValue.lte(ethers.constants.Zero) || parsedValue.gte(ethers.constants.MaxUint256)) {
          throw Error()
        } else {
          setIndependentValueParsed(parsedValue)
          setIndependentError(null)
        }
      } catch {
        setIndependentError(t('inputNotValid'))
      }

      return () => {
        setIndependentValueParsed()
        setIndependentError()
      }
    }
  }, [independentValue, independentDecimals, t])

  // calculate slippage from target rate
  const { minimum: dependentValueMinumum, maximum: dependentValueMaximum } = calculateSlippageBounds(
    dependentValue,
    swapType === TOKEN_TO_TOKEN
  )

  // validate input allowance + balance
  const [inputError, setInputError] = useState()
  const [showUnlock, setShowUnlock] = useState(false)
  useEffect(() => {
    const inputValueCalculation = independentField === INPUT ? independentValueParsed : dependentValueMaximum
    if (inputBalance && (inputAllowance || inputCurrency === 'ETH') && inputValueCalculation) {
      if (inputBalance.lt(inputValueCalculation)) {
        setInputError(t('insufficientBalance'))
      } else if (inputCurrency !== 'ETH' && inputAllowance.lt(inputValueCalculation)) {
        setInputError(t('unlockTokenCont'))
        setShowUnlock(true)
      } else {
        setInputError(null)
        setShowUnlock(false)
      }

      return () => {
        setInputError()
        setShowUnlock(false)
      }
    }
  }, [independentField, independentValueParsed, dependentValueMaximum, inputBalance, inputCurrency, inputAllowance, t])

  // calculate dependent value
  useEffect(() => {
    const amount = independentValueParsed

    if (swapType === ETH_TO_TOKEN) {
      const reserveETH = outputReserveETH
      const reserveToken = outputReserveToken

      if (amount && reserveETH && reserveToken) {
        try {
          const calculatedDependentValue =
            independentField === INPUT
              ? calculateEtherTokenOutputFromInput(amount, reserveETH, reserveToken)
              : calculateEtherTokenInputFromOutput(amount, reserveETH, reserveToken)

          if (calculatedDependentValue.lte(ethers.constants.Zero)) {
            throw Error()
          }

          dispatchSwapState({ type: 'UPDATE_DEPENDENT', payload: calculatedDependentValue })
        } catch {
          setIndependentError(t('insufficientLiquidity'))
        }
        return () => {
          dispatchSwapState({ type: 'UPDATE_DEPENDENT', payload: '' })
        }
      }
    } else if (swapType === TOKEN_TO_ETH) {
      const reserveETH = inputReserveETH
      const reserveToken = inputReserveToken

      if (amount && reserveETH && reserveToken) {
        try {
          const calculatedDependentValue =
            independentField === INPUT
              ? calculateEtherTokenOutputFromInput(amount, reserveToken, reserveETH)
              : calculateEtherTokenInputFromOutput(amount, reserveToken, reserveETH)

          if (calculatedDependentValue.lte(ethers.constants.Zero)) {
            throw Error()
          }

          dispatchSwapState({ type: 'UPDATE_DEPENDENT', payload: calculatedDependentValue })
        } catch {
          setIndependentError(t('insufficientLiquidity'))
        }
        return () => {
          dispatchSwapState({ type: 'UPDATE_DEPENDENT', payload: '' })
        }
      }
    } else if (swapType === TOKEN_TO_TOKEN) {
      const reserveETHFirst = inputReserveETH
      const reserveTokenFirst = inputReserveToken

      const reserveETHSecond = outputReserveETH
      const reserveTokenSecond = outputReserveToken

      if (amount && reserveETHFirst && reserveTokenFirst && reserveETHSecond && reserveTokenSecond) {
        try {
          if (independentField === INPUT) {
            const intermediateValue = calculateEtherTokenOutputFromInput(amount, reserveTokenFirst, reserveETHFirst)
            if (intermediateValue.lte(ethers.constants.Zero)) {
              throw Error()
            }
            const calculatedDependentValue = calculateEtherTokenOutputFromInput(
              intermediateValue,
              reserveETHSecond,
              reserveTokenSecond
            )
            if (calculatedDependentValue.lte(ethers.constants.Zero)) {
              throw Error()
            }
            dispatchSwapState({ type: 'UPDATE_DEPENDENT', payload: calculatedDependentValue })
          } else {
            const intermediateValue = calculateEtherTokenInputFromOutput(amount, reserveETHSecond, reserveTokenSecond)
            if (intermediateValue.lte(ethers.constants.Zero)) {
              throw Error()
            }
            const calculatedDependentValue = calculateEtherTokenInputFromOutput(
              intermediateValue,
              reserveTokenFirst,
              reserveETHFirst
            )
            if (calculatedDependentValue.lte(ethers.constants.Zero)) {
              throw Error()
            }
            dispatchSwapState({ type: 'UPDATE_DEPENDENT', payload: calculatedDependentValue })
          }
        } catch {
          setIndependentError(t('insufficientLiquidity'))
        }
        return () => {
          dispatchSwapState({ type: 'UPDATE_DEPENDENT', payload: '' })
        }
      }
    }
  }, [
    independentValueParsed,
    swapType,
    outputReserveETH,
    outputReserveToken,
    inputReserveETH,
    inputReserveToken,
    independentField,
    t
  ])

  const [inverted, setInverted] = useState(false)
  const exchangeRate = getExchangeRate(inputValueParsed, inputDecimals, outputValueParsed, outputDecimals)
  const exchangeRateInverted = getExchangeRate(inputValueParsed, inputDecimals, outputValueParsed, outputDecimals, true)

  const marketRate = getMarketRate(
    swapType,
    inputReserveETH,
    inputReserveToken,
    inputDecimals,
    outputReserveETH,
    outputReserveToken,
    outputDecimals
  )

  const percentSlippage =
    exchangeRate && marketRate
      ? exchangeRate
          .sub(marketRate)
          .abs()
          .mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
          .div(marketRate)
          .sub(ethers.utils.bigNumberify(3).mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(15))))
      : undefined
  const percentSlippageFormatted = percentSlippage && amountFormatter(percentSlippage, 16, 2)
  const slippageWarning =
    percentSlippage &&
    percentSlippage.gte(ethers.utils.parseEther('.05')) &&
    percentSlippage.lt(ethers.utils.parseEther('.2')) // [5% - 20%)
  const highSlippageWarning = percentSlippage && percentSlippage.gte(ethers.utils.parseEther('.2')) // [20+%

  const isValid = exchangeRate && inputError === null && independentError === null

  const estimatedText = `(${t('estimated')})`
  function formatBalance(value) {
    return `Balance: ${value}`
  }

  function renderTransactionDetails() {
    ReactGA.event({
      category: 'TransactionDetail',
      action: 'Open'
    })

    const b = text => <BlueSpan>{text}</BlueSpan>

    if (independentField === INPUT) {
      return (
        <div>
          <div>
            {t('youAreSelling')}{' '}
            {b(
              `${amountFormatter(
                independentValueParsed,
                independentDecimals,
                Math.min(4, independentDecimals)
              )} ${inputSymbol}`
            )}
            .
          </div>
          <LastSummaryText>
            {t('youWillReceive')}{' '}
            {b(
              `${amountFormatter(
                dependentValueMinumum,
                dependentDecimals,
                Math.min(4, dependentDecimals)
              )} ${outputSymbol}`
            )}{' '}
            {t('orTransFail')}
          </LastSummaryText>
          <LastSummaryText>
            {(slippageWarning || highSlippageWarning) && (
              <span role="img" aria-label="warning">
                ⚠️
              </span>
            )}
            {t('priceChange')} {b(`${percentSlippageFormatted}%`)}.
          </LastSummaryText>
        </div>
      )
    } else {
      return (
        <div>
          <div>
            {t('youAreBuying')}{' '}
            {b(
              `${amountFormatter(
                independentValueParsed,
                independentDecimals,
                Math.min(4, independentDecimals)
              )} ${outputSymbol}`
            )}
            .
          </div>
          <LastSummaryText>
            {t('itWillCost')}{' '}
            {b(
              `${amountFormatter(
                dependentValueMaximum,
                dependentDecimals,
                Math.min(4, dependentDecimals)
              )} ${inputSymbol}`
            )}{' '}
            {t('orTransFail')}
          </LastSummaryText>
          <LastSummaryText>
            {t('priceChange')} {b(`${percentSlippageFormatted}%`)}.
          </LastSummaryText>
        </div>
      )
    }
  }

  function renderSummary() {
    let contextualInfo = ''
    let isError = false

    if (inputError || independentError) {
      contextualInfo = inputError || independentError
      isError = true
    } else if (!inputCurrency || !outputCurrency) {
      contextualInfo = t('selectTokenCont')
    } else if (!independentValue) {
      contextualInfo = t('enterValueCont')
    } else if (!account) {
      contextualInfo = t('noWallet')
      isError = true
    }

    const slippageWarningText = highSlippageWarning
      ? t('highSlippageWarning')
      : slippageWarning
      ? t('slippageWarning')
      : ''

    return (
      <NewContextualInfo
        openDetailsText={t('transactionDetails')}
        closeDetailsText={t('hideDetails')}
        contextualInfo={contextualInfo ? contextualInfo : slippageWarningText}
        allowExpand={!!(inputCurrency && outputCurrency && inputValueParsed && outputValueParsed)}
        isError={isError}
        slippageWarning={slippageWarning && !contextualInfo}
        highSlippageWarning={highSlippageWarning && !contextualInfo}
        renderTransactionDetails={renderTransactionDetails}
      />
    )
  }

  async function onSwap() {
    const deadline = Math.ceil(Date.now() / 1000) + DEADLINE_FROM_NOW

    let estimate, method, args, value
    if (independentField === INPUT) {
      ReactGA.event({
        category: `${swapType}`,
        action: 'SwapInput'
      })

      if (swapType === ETH_TO_TOKEN) {
        estimate = contract.estimate.ethToTokenSwapInput
        method = contract.ethToTokenSwapInput
        args = [dependentValueMinumum, deadline]
        value = independentValueParsed
      } else if (swapType === TOKEN_TO_ETH) {
        estimate = contract.estimate.tokenToEthSwapInput
        method = contract.tokenToEthSwapInput
        args = [independentValueParsed, dependentValueMinumum, deadline]
        value = ethers.constants.Zero
      } else if (swapType === TOKEN_TO_TOKEN) {
        estimate = contract.estimate.tokenToTokenSwapInput
        method = contract.tokenToTokenSwapInput
        args = [independentValueParsed, dependentValueMinumum, ethers.constants.One, deadline, outputCurrency]
        value = ethers.constants.Zero
      }
    } else if (independentField === OUTPUT) {
      ReactGA.event({
        category: `${swapType}`,
        action: 'SwapOutput'
      })

      if (swapType === ETH_TO_TOKEN) {
        estimate = contract.estimate.ethToTokenSwapOutput
        method = contract.ethToTokenSwapOutput
        args = [independentValueParsed, deadline]
        value = dependentValueMaximum
      } else if (swapType === TOKEN_TO_ETH) {
        estimate = contract.estimate.tokenToEthSwapOutput
        method = contract.tokenToEthSwapOutput
        args = [independentValueParsed, dependentValueMaximum, deadline]
        value = ethers.constants.Zero
      } else if (swapType === TOKEN_TO_TOKEN) {
        estimate = contract.estimate.tokenToTokenSwapOutput
        method = contract.tokenToTokenSwapOutput
        args = [independentValueParsed, dependentValueMaximum, ethers.constants.MaxUint256, deadline, outputCurrency]
        value = ethers.constants.Zero
      }
    }

    const estimatedGasLimit = await estimate(...args, { value })
    method(...args, { value, gasLimit: calculateGasMargin(estimatedGasLimit, GAS_MARGIN) }).then(response => {
      addTransaction(response)
    })
  }

  return (
    <>
      <CurrencyInputPanel
        title={t('input')}
        description={inputValueFormatted && independentField === OUTPUT ? estimatedText : ''}
        extraText={inputBalanceFormatted && formatBalance(inputBalanceFormatted)}
        extraTextClickHander={() => {
          if (inputBalance && inputDecimals) {
            const valueToSet = inputCurrency === 'ETH' ? inputBalance.sub(ethers.utils.parseEther('.1')) : inputBalance
            if (valueToSet.gt(ethers.constants.Zero)) {
              dispatchSwapState({
                type: 'UPDATE_INDEPENDENT',
                payload: { value: amountFormatter(valueToSet, inputDecimals, inputDecimals, false), field: INPUT }
              })
            }
          }
        }}
        onCurrencySelected={inputCurrency => {
          dispatchSwapState({ type: 'SELECT_CURRENCY', payload: { currency: inputCurrency, field: INPUT } })
        }}
        onValueChange={inputValue => {
          dispatchSwapState({ type: 'UPDATE_INDEPENDENT', payload: { value: inputValue, field: INPUT } })
        }}
        showUnlock={showUnlock}
        selectedTokens={[inputCurrency, outputCurrency]}
        selectedTokenAddress={inputCurrency}
        value={inputValueFormatted}
        errorMessage={inputError ? inputError : independentField === INPUT ? independentError : ''}
      />
      <OversizedPanel>
        <DownArrowBackground>
          <DownArrow
            onClick={() => {
              dispatchSwapState({ type: 'FLIP_INDEPENDENT' })
            }}
            clickable
            alt="swap"
            src={isValid ? ArrowDownBlue : ArrowDownGrey}
          />
        </DownArrowBackground>
      </OversizedPanel>
      <CurrencyInputPanel
        title={t('output')}
        description={outputValueFormatted && independentField === INPUT ? estimatedText : ''}
        extraText={outputBalanceFormatted && formatBalance(outputBalanceFormatted)}
        onCurrencySelected={outputCurrency => {
          dispatchSwapState({ type: 'SELECT_CURRENCY', payload: { currency: outputCurrency, field: OUTPUT } })
        }}
        onValueChange={outputValue => {
          dispatchSwapState({ type: 'UPDATE_INDEPENDENT', payload: { value: outputValue, field: OUTPUT } })
        }}
        selectedTokens={[inputCurrency, outputCurrency]}
        selectedTokenAddress={outputCurrency}
        value={outputValueFormatted}
        errorMessage={independentField === OUTPUT ? independentError : ''}
        disableUnlock
      />
      <OversizedPanel hideBottom>
        <ExchangeRateWrapper
          onClick={() => {
            setInverted(inverted => !inverted)
          }}
        >
          <ExchangeRate>{t('exchangeRate')}</ExchangeRate>
          {inverted ? (
            <span>
              {exchangeRate
                ? `1 ${outputSymbol} = ${amountFormatter(exchangeRateInverted, 18, 4, false)} ${inputSymbol}`
                : ' - '}
            </span>
          ) : (
            <span>
              {exchangeRate
                ? `1 ${inputSymbol} = ${amountFormatter(exchangeRate, 18, 4, false)} ${outputSymbol}`
                : ' - '}
            </span>
          )}
        </ExchangeRateWrapper>
      </OversizedPanel>
      {renderSummary()}
      <Flex>
        <Button disabled={!isValid} onClick={onSwap} warning={highSlippageWarning}>
          {highSlippageWarning ? t('swapAnyway') : t('swap')}
        </Button>
      </Flex>
    </>
  )
}

//
import React, { useReducer, useState, useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useWeb3Context } from 'web3-react'
import { ethers } from 'ethers'
import ReactGA from 'react-ga'
import styled from 'styled-components'

import { Button } from '../../theme'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import OversizedPanel from '../../components/OversizedPanel'
import ContextualInfo from '../../components/ContextualInfo'
import PlusBlue from '../../assets/images/plus-blue.svg'
import PlusGrey from '../../assets/images/plus-grey.svg'
import { useExchangeContract } from '../../hooks'
import { amountFormatter, calculateGasMargin } from '../../utils'
import { useTransactionAdder } from '../../contexts/Transactions'
import { useTokenDetails } from '../../contexts/Tokens'
import { useAddressBalance, useExchangeReserves } from '../../contexts/Balances'
import { useAddressAllowance } from '../../contexts/Allowances'

const INPUT = 0
const OUTPUT = 1

// denominated in bips
const ALLOWED_SLIPPAGE = ethers.utils.bigNumberify(200)

// denominated in seconds
const DEADLINE_FROM_NOW = 60 * 15

// denominated in bips
const GAS_MARGIN = ethers.utils.bigNumberify(1000)

const BlueSpan = styled.span`
  color: ${({ theme }) => theme.royalBlue};
`

const NewExchangeWarning = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  margin-bottom: 2rem;
  border: 1px solid rgba($pizazz-orange, 0.4);
  background-color: rgba($pizazz-orange, 0.1);
  border-radius: 1rem;
`

const NewExchangeWarningText = styled.div`
  font-size: 0.75rem;
  line-height: 1rem;
  text-align: center;

  :first-child {
    padding-bottom: 0.3rem;
    font-weight: 500;
  }
`

const LastSummaryText = styled.div`
  margin-top: 1rem;
`

const DownArrowBackground = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  justify-content: center;
  align-items: center;
`

const DownArrow = styled.img`
  width: 0.625rem;
  height: 0.625rem;
  position: relative;
  padding: 0.875rem;
`

const SummaryPanel = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  padding: 1rem 0;
`

const ExchangeRateWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  color: ${({ theme }) => theme.doveGray};
  font-size: 0.75rem;
  padding: 0.25rem 1rem 0;
`

const ExchangeRate = styled.span`
  flex: 1 1 auto;
  width: 0;
  color: ${({ theme }) => theme.chaliceGray};
`

const Flex = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;

  button {
    max-width: 20rem;
  }
`

function calculateSlippageBounds(value) {
  if (value) {
    const offset = value.mul(ALLOWED_SLIPPAGE).div(ethers.utils.bigNumberify(10000))
    const minimum = value.sub(offset)
    const maximum = value.add(offset)
    return {
      minimum: minimum.lt(ethers.constants.Zero) ? ethers.constants.Zero : minimum,
      maximum: maximum.gt(ethers.constants.MaxUint256) ? ethers.constants.MaxUint256 : maximum
    }
  } else {
    return {}
  }
}

const initialAddLiquidityState = {
  inputValue: '',
  outputValue: '',
  lastEditedField: INPUT,
  outputCurrency: ''
}

function addLiquidityStateReducer(state, action) {
  switch (action.type) {
    case 'SELECT_CURRENCY': {
      return {
        ...state,
        outputCurrency: action.payload
      }
    }
    case 'UPDATE_VALUE': {
      const { inputValue, outputValue } = state
      const { field, value } = action.payload
      return {
        ...state,
        inputValue: field === INPUT ? value : inputValue,
        outputValue: field === OUTPUT ? value : outputValue,
        lastEditedField: field
      }
    }
    case 'UPDATE_DEPENDENT_VALUE': {
      const { inputValue, outputValue } = state
      const { field, value } = action.payload
      return {
        ...state,
        inputValue: field === INPUT ? value : inputValue,
        outputValue: field === OUTPUT ? value : outputValue
      }
    }
    default: {
      return initialAddLiquidityState
    }
  }
}

function getExchangeRate(inputValue, inputDecimals, outputValue, outputDecimals, invert = false) {
  try {
    if (
      inputValue &&
      (inputDecimals || inputDecimals === 0) &&
      outputValue &&
      (outputDecimals || outputDecimals === 0)
    ) {
      const factor = ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18))

      if (invert) {
        return inputValue
          .mul(factor)
          .div(outputValue)
          .mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(outputDecimals)))
          .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(inputDecimals)))
      } else {
        return outputValue
          .mul(factor)
          .div(inputValue)
          .mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(inputDecimals)))
          .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(outputDecimals)))
      }
    }
  } catch {}
}

function getMarketRate(reserveETH, reserveToken, decimals, invert = false) {
  return getExchangeRate(reserveETH, 18, reserveToken, decimals, invert)
}

export default function AddLiquidity() {
  const { t } = useTranslation()
  const { library, active, account } = useWeb3Context()

  const [addLiquidityState, dispatchAddLiquidityState] = useReducer(addLiquidityStateReducer, initialAddLiquidityState)
  const { inputValue, outputValue, lastEditedField, outputCurrency } = addLiquidityState
  const inputCurrency = 'ETH'

  const [inputValueParsed, setInputValueParsed] = useState()
  const [outputValueParsed, setOutputValueParsed] = useState()
  const [inputError, setInputError] = useState()
  const [outputError, setOutputError] = useState()

  const { symbol, decimals, exchangeAddress } = useTokenDetails(outputCurrency)
  const exchangeContract = useExchangeContract(exchangeAddress)

  const [totalPoolTokens, setTotalPoolTokens] = useState()
  const fetchPoolTokens = useCallback(() => {
    if (exchangeContract) {
      exchangeContract.totalSupply().then(totalSupply => {
        setTotalPoolTokens(totalSupply)
      })
    }
  }, [exchangeContract])
  useEffect(() => {
    fetchPoolTokens()
    library.on('block', fetchPoolTokens)

    return () => {
      library.removeListener('block', fetchPoolTokens)
    }
  }, [fetchPoolTokens, library])

  const poolTokenBalance = useAddressBalance(account, exchangeAddress)
  const exchangeETHBalance = useAddressBalance(exchangeAddress, 'ETH')
  const exchangeTokenBalance = useAddressBalance(exchangeAddress, outputCurrency)

  const { reserveETH, reserveToken } = useExchangeReserves(outputCurrency)
  const isNewExchange = !!(reserveETH && reserveToken && reserveETH.isZero() && reserveToken.isZero())

  // 18 decimals
  const poolTokenPercentage =
    poolTokenBalance && totalPoolTokens && isNewExchange === false && !totalPoolTokens.isZero()
      ? poolTokenBalance.mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18))).div(totalPoolTokens)
      : undefined
  const ethShare =
    exchangeETHBalance && poolTokenPercentage
      ? exchangeETHBalance
          .mul(poolTokenPercentage)
          .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
      : undefined
  const tokenShare =
    exchangeTokenBalance && poolTokenPercentage
      ? exchangeTokenBalance
          .mul(poolTokenPercentage)
          .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
      : undefined

  const liquidityMinted = isNewExchange
    ? inputValueParsed
    : totalPoolTokens && inputValueParsed && exchangeETHBalance && !exchangeETHBalance.isZero()
    ? totalPoolTokens.mul(inputValueParsed).div(exchangeETHBalance)
    : undefined

  // user balances
  const inputBalance = useAddressBalance(account, inputCurrency)
  const outputBalance = useAddressBalance(account, outputCurrency)

  const ethPerLiquidityToken =
    exchangeETHBalance && totalPoolTokens && isNewExchange === false && !totalPoolTokens.isZero()
      ? exchangeETHBalance.mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18))).div(totalPoolTokens)
      : undefined
  const tokenPerLiquidityToken =
    exchangeTokenBalance && totalPoolTokens && isNewExchange === false && !totalPoolTokens.isZero()
      ? exchangeTokenBalance.mul(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18))).div(totalPoolTokens)
      : undefined

  const outputValueMax = outputValueParsed && calculateSlippageBounds(outputValueParsed).maximum
  const liquidityTokensMin = liquidityMinted && calculateSlippageBounds(liquidityMinted).minimum

  const marketRate = useMemo(() => {
    return getMarketRate(reserveETH, reserveToken, decimals)
  }, [reserveETH, reserveToken, decimals])
  const marketRateInverted = useMemo(() => {
    return getMarketRate(reserveETH, reserveToken, decimals, true)
  }, [reserveETH, reserveToken, decimals])

  function renderTransactionDetails() {
    ReactGA.event({
      category: 'TransactionDetail',
      action: 'Open'
    })

    const b = text => <BlueSpan>{text}</BlueSpan>

    if (isNewExchange) {
      return (
        <div>
          <div>
            {t('youAreAdding')} {b(`${inputValue} ETH`)} {t('and')} {b(`${outputValue} ${symbol}`)} {t('intoPool')}
          </div>
          <LastSummaryText>
            {t('youAreSettingExRate')}{' '}
            {b(
              `1 ETH = ${amountFormatter(
                getMarketRate(inputValueParsed, outputValueParsed, decimals),
                18,
                4,
                false
              )} ${symbol}`
            )}
            .
          </LastSummaryText>
          <LastSummaryText>
            {t('youWillMint')} {b(`${inputValue}`)} {t('liquidityTokens')}
          </LastSummaryText>
          <LastSummaryText>{t('totalSupplyIs0')}</LastSummaryText>
        </div>
      )
    } else {
      return (
        <>
          <div>
            {t('youAreAdding')} {b(`${amountFormatter(inputValueParsed, 18, 4)} ETH`)} {t('and')} {'at most'}{' '}
            {b(`${amountFormatter(outputValueMax, decimals, Math.min(decimals, 4))} ${symbol}`)} {t('intoPool')}
          </div>
          <LastSummaryText>
            {t('youWillMint')} {b(amountFormatter(liquidityMinted, 18, 4))} {t('liquidityTokens')}
          </LastSummaryText>
          <LastSummaryText>
            {t('totalSupplyIs')} {b(amountFormatter(totalPoolTokens, 18, 4))}
          </LastSummaryText>
          <LastSummaryText>
            {t('tokenWorth')} {b(amountFormatter(ethPerLiquidityToken, 18, 4))} ETH {t('and')}{' '}
            {b(amountFormatter(tokenPerLiquidityToken, decimals, Math.min(decimals, 4)))} {symbol}
          </LastSummaryText>
        </>
      )
    }
  }

  function renderSummary() {
    let contextualInfo = ''
    let isError = false

    if (inputError || outputError) {
      contextualInfo = inputError || outputError
      isError = true
    } else if (!inputCurrency || !outputCurrency) {
      contextualInfo = t('selectTokenCont')
    } else if (!inputValue) {
      contextualInfo = t('enterValueCont')
    } else if (!account) {
      contextualInfo = t('noWallet')
      isError = true
    }

    return (
      <ContextualInfo
        openDetailsText={t('transactionDetails')}
        closeDetailsText={t('hideDetails')}
        contextualInfo={contextualInfo}
        isError={isError}
        renderTransactionDetails={renderTransactionDetails}
      />
    )
  }

  const addTransaction = useTransactionAdder()

  async function onAddLiquidity() {
    ReactGA.event({
      category: 'Pool',
      action: 'AddLiquidity'
    })

    const deadline = Math.ceil(Date.now() / 1000) + DEADLINE_FROM_NOW
    const estimatedGasLimit = await exchangeContract.estimate.addLiquidity(
      isNewExchange ? ethers.constants.Zero : liquidityTokensMin,
      isNewExchange ? outputValueParsed : outputValueMax,
      deadline,
      {
        value: inputValueParsed
      }
    )

    exchangeContract
      .addLiquidity(
        isNewExchange ? ethers.constants.Zero : liquidityTokensMin,
        isNewExchange ? outputValueParsed : outputValueMax,
        deadline,
        {
          value: inputValueParsed,
          gasLimit: calculateGasMargin(estimatedGasLimit, GAS_MARGIN)
        }
      )
      .then(response => {
        addTransaction(response)
      })
  }

  function formatBalance(value) {
    return `Balance: ${value}`
  }

  useEffect(() => {
    if (isNewExchange) {
      if (inputValue) {
        const parsedInputValue = ethers.utils.parseUnits(inputValue, 18)
        setInputValueParsed(parsedInputValue)
      }

      if (outputValue) {
        const parsedOutputValue = ethers.utils.parseUnits(outputValue, decimals)
        setOutputValueParsed(parsedOutputValue)
      }
    }
  }, [decimals, inputValue, isNewExchange, outputValue])

  // parse input value
  useEffect(() => {
    if (
      isNewExchange === false &&
      inputValue &&
      marketRate &&
      lastEditedField === INPUT &&
      (decimals || decimals === 0)
    ) {
      try {
        const parsedValue = ethers.utils.parseUnits(inputValue, 18)

        if (parsedValue.lte(ethers.constants.Zero) || parsedValue.gte(ethers.constants.MaxUint256)) {
          throw Error()
        }

        setInputValueParsed(parsedValue)

        const currencyAmount = marketRate
          .mul(parsedValue)
          .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18)))
          .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(18 - decimals)))

        setOutputValueParsed(currencyAmount)
        dispatchAddLiquidityState({
          type: 'UPDATE_DEPENDENT_VALUE',
          payload: { field: OUTPUT, value: amountFormatter(currencyAmount, decimals, Math.min(decimals, 4), false) }
        })

        return () => {
          setOutputError()
          setInputValueParsed()
          setOutputValueParsed()
          dispatchAddLiquidityState({
            type: 'UPDATE_DEPENDENT_VALUE',
            payload: { field: OUTPUT, value: '' }
          })
        }
      } catch {
        setOutputError(t('inputNotValid'))
      }
    }
  }, [inputValue, isNewExchange, lastEditedField, marketRate, decimals, t])

  // parse output value
  useEffect(() => {
    if (
      isNewExchange === false &&
      outputValue &&
      marketRateInverted &&
      lastEditedField === OUTPUT &&
      (decimals || decimals === 0)
    ) {
      try {
        const parsedValue = ethers.utils.parseUnits(outputValue, decimals)

        if (parsedValue.lte(ethers.constants.Zero) || parsedValue.gte(ethers.constants.MaxUint256)) {
          throw Error()
        }

        setOutputValueParsed(parsedValue)

        const currencyAmount = marketRateInverted
          .mul(parsedValue)
          .div(ethers.utils.bigNumberify(10).pow(ethers.utils.bigNumberify(decimals)))

        setInputValueParsed(currencyAmount)
        dispatchAddLiquidityState({
          type: 'UPDATE_DEPENDENT_VALUE',
          payload: { field: INPUT, value: amountFormatter(currencyAmount, 18, 4, false) }
        })

        return () => {
          setInputError()
          setOutputValueParsed()
          setInputValueParsed()
          dispatchAddLiquidityState({
            type: 'UPDATE_DEPENDENT_VALUE',
            payload: { field: INPUT, value: '' }
          })
        }
      } catch {
        setInputError(t('inputNotValid'))
      }
    }
  }, [outputValue, isNewExchange, lastEditedField, marketRateInverted, decimals, t])

  // input validation
  useEffect(() => {
    if (inputValueParsed && inputBalance) {
      if (inputValueParsed.gt(inputBalance)) {
        setInputError(t('insufficientBalance'))
      } else {
        setInputError(null)
      }
    }

    if (outputValueMax && outputBalance) {
      if (outputValueMax.gt(outputBalance)) {
        setOutputError(t('insufficientBalance'))
      } else {
        setOutputError(null)
      }
    }
  }, [inputValueParsed, inputBalance, outputValueMax, outputBalance, t])

  const allowance = useAddressAllowance(account, outputCurrency, exchangeAddress)
  const [showUnlock, setShowUnlock] = useState(false)
  useEffect(() => {
    if (outputValueParsed && allowance) {
      if (allowance.lt(outputValueParsed)) {
        setOutputError(t('unlockTokenCont'))
        setShowUnlock(true)
      }
      return () => {
        setOutputError()
        setShowUnlock(false)
      }
    }
  }, [outputValueParsed, allowance, t])

  const isActive = active && account
  const isValid = (inputError === null || outputError === null) && !showUnlock

  return (
    <>
      {isNewExchange ? (
        <NewExchangeWarning>
          <NewExchangeWarningText>
            <span role="img" aria-label="first-liquidity">
              🚰
            </span>{' '}
            {t('firstLiquidity')}
          </NewExchangeWarningText>
          <NewExchangeWarningText>{t('initialExchangeRate', { symbol })}</NewExchangeWarningText>
        </NewExchangeWarning>
      ) : null}

      <CurrencyInputPanel
        title={t('deposit')}
        extraText={inputBalance && formatBalance(amountFormatter(inputBalance, 18, 4))}
        onValueChange={inputValue => {
          dispatchAddLiquidityState({ type: 'UPDATE_VALUE', payload: { value: inputValue, field: INPUT } })
        }}
        selectedTokenAddress="ETH"
        value={inputValue}
        errorMessage={inputError}
        disableTokenSelect
      />
      <OversizedPanel>
        <DownArrowBackground>
          <DownArrow src={isActive ? PlusBlue : PlusGrey} alt="plus" />
        </DownArrowBackground>
      </OversizedPanel>
      <CurrencyInputPanel
        title={t('deposit')}
        description={isNewExchange ? '' : outputValue ? `(${t('estimated')})` : ''}
        extraText={outputBalance && formatBalance(amountFormatter(outputBalance, decimals, Math.min(decimals, 4)))}
        selectedTokenAddress={outputCurrency}
        onCurrencySelected={outputCurrency => {
          dispatchAddLiquidityState({ type: 'SELECT_CURRENCY', payload: outputCurrency })
        }}
        onValueChange={outputValue => {
          dispatchAddLiquidityState({ type: 'UPDATE_VALUE', payload: { value: outputValue, field: OUTPUT } })
        }}
        value={outputValue}
        showUnlock={showUnlock}
        errorMessage={outputError}
      />
      <OversizedPanel hideBottom>
        <SummaryPanel>
          <ExchangeRateWrapper>
            <ExchangeRate>{t('exchangeRate')}</ExchangeRate>
            <span>{marketRate ? `1 ETH = ${amountFormatter(marketRate, 18, 4)} ${symbol}` : ' - '}</span>
          </ExchangeRateWrapper>
          <ExchangeRateWrapper>
            <ExchangeRate>{t('currentPoolSize')}</ExchangeRate>
            <span>
              {exchangeETHBalance && exchangeTokenBalance
                ? `${amountFormatter(exchangeETHBalance, 18, 4)} ETH + ${amountFormatter(
                    exchangeTokenBalance,
                    decimals,
                    Math.min(4, decimals)
                  )} ${symbol}`
                : ' - '}
            </span>
          </ExchangeRateWrapper>
          <ExchangeRateWrapper>
            <ExchangeRate>
              {t('yourPoolShare')} ({exchangeETHBalance && amountFormatter(poolTokenPercentage, 16, 2)}%)
            </ExchangeRate>
            <span>
              {ethShare && tokenShare
                ? `${amountFormatter(ethShare, 18, 4)} ETH + ${amountFormatter(
                    tokenShare,
                    decimals,
                    Math.min(4, decimals)
                  )} ${symbol}`
                : ' - '}
            </span>
          </ExchangeRateWrapper>
        </SummaryPanel>
      </OversizedPanel>
      {renderSummary()}
      <Flex>
        <Button disabled={!isValid} onClick={onAddLiquidity}>
          {t('addLiquidity')}
        </Button>
      </Flex>
    </>
  )
}
import React from "react";
import Web3 from "web3";
import InstallMetamask from "./InstallMetamask";
import UnlockMetamask from "./UnlockMetamask";
import ReturnTokenURI from "./ReturnTokenURI";

async function NFTbuy() {
  var ABI = [
    {
      inputs: [
        {
          internalType: "contract IERC20",
          name: "contrak",
          type: "address"
        }
      ],
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address"
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "Approval",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address"
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool"
        }
      ],
      name: "ApprovalForAll",
      type: "event"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256"
        }
      ],
      name: "Bought",
      type: "event"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_tokenId",
          type: "uint256"
        }
      ],
      name: "buy",
      outputs: [],
      stateMutability: "payable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256"
        }
      ],
      name: "cancelTokenSale",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "claim",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "pid",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "Deposit",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "id",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "price",
          type: "uint256"
        }
      ],
      name: "ForSale",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "OwnershipTransferred",
      type: "event"
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        },
        {
          internalType: "bytes",
          name: "_data",
          type: "bytes"
        }
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address"
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool"
        }
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "setPrice",
          type: "uint256"
        }
      ],
      name: "setTokenPrice",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "startFairDistribution",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "Transfer",
      type: "event"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "pid",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "Withdraw",
      type: "event"
    },
    {
      inputs: [],
      name: "allowTradeAt",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address"
        }
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "baseURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      name: "Bazaar",
      outputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "price",
          type: "uint256"
        },
        {
          internalType: "enum ERC721.TokenState",
          name: "state",
          type: "uint8"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "burnFee",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "calculateFee",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "contractaddress",
      outputs: [
        {
          internalType: "contract IERC20",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "getApproved",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "hasTimelockStarted",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          internalType: "address",
          name: "operator",
          type: "address"
        }
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4"
        }
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "index",
          type: "uint256"
        }
      ],
      name: "tokenByIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "index",
          type: "uint256"
        }
      ],
      name: "tokenOfOwnerByIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address"
        }
      ],
      name: "tokensOfOwner",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "tokenURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "totalCharacters",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    }
  ];
  const SporeMarketv1 = new window.web3.eth.Contract(
    ABI,
    "0xa3B1632fA8Bd3233d9c61044AC8b364aA26Be21b"
  );
  var _tokenID = document.getElementById("_tokenID").value;
  var account = await window.web3.eth.getAccounts();
  account = account[0];
  console.log(account);
  const bazaar = await SporeMarketv1.methods.Bazaar(_tokenID).call();
  console.log(bazaar);
  try {
    await SporeMarketv1.methods
      .buy(_tokenID)
      .send({ from: account, gasPrice: 225000000000, value: bazaar.price });
  } catch (error) {
    alert(error);
  }
}

export default class NFT extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
    this.isWeb3 = true; //If metamask is installed
    this.isnetworkID = false;
  }
  async componentDidMount() {
    let web3 = window.web3;
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      console.log(window.ethereum);
    }
    if (typeof web3 !== "undefined") {
      // Use Mist/MetaMask's provider
      this.web3Provider = web3.currentProvider;
      this.web3 = new Web3(web3.currentProvider);
    } else {
      this.isWeb3 = false;
    }
    if (this.web3Provider.chainId == "0xa869") {
      this.isnetworkID = true;
    } else {
      this.isnetworkID = false;
    }

    var ABI = [
      {
        inputs: [
          {
            internalType: "contract IERC20",
            name: "contrak",
            type: "address"
          }
        ],
        stateMutability: "nonpayable",
        type: "constructor"
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address"
          },
          {
            indexed: true,
            internalType: "address",
            name: "approved",
            type: "address"
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
          }
        ],
        name: "Approval",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address"
          },
          {
            indexed: true,
            internalType: "address",
            name: "operator",
            type: "address"
          },
          {
            indexed: false,
            internalType: "bool",
            name: "approved",
            type: "bool"
          }
        ],
        name: "ApprovalForAll",
        type: "event"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
          }
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256"
          }
        ],
        name: "Bought",
        type: "event"
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256"
          }
        ],
        name: "buy",
        outputs: [],
        stateMutability: "payable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          }
        ],
        name: "cancelTokenSale",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [],
        name: "claim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "user",
            type: "address"
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "pid",
            type: "uint256"
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256"
          }
        ],
        name: "Deposit",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "price",
            type: "uint256"
          }
        ],
        name: "ForSale",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address"
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address"
          }
        ],
        name: "OwnershipTransferred",
        type: "event"
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address"
          },
          {
            internalType: "address",
            name: "to",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
          }
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address"
          },
          {
            internalType: "address",
            name: "to",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "_data",
            type: "bytes"
          }
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "operator",
            type: "address"
          },
          {
            internalType: "bool",
            name: "approved",
            type: "bool"
          }
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "setPrice",
            type: "uint256"
          }
        ],
        name: "setTokenPrice",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [],
        name: "startFairDistribution",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address"
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address"
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
          }
        ],
        name: "Transfer",
        type: "event"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address"
          },
          {
            internalType: "address",
            name: "to",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
          }
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address"
          }
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "user",
            type: "address"
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "pid",
            type: "uint256"
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256"
          }
        ],
        name: "Withdraw",
        type: "event"
      },
      {
        inputs: [],
        name: "allowTradeAt",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address"
          }
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "baseURI",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        name: "Bazaar",
        outputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256"
          },
          {
            internalType: "enum ERC721.TokenState",
            name: "state",
            type: "uint8"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "burnFee",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "calculateFee",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "contractaddress",
        outputs: [
          {
            internalType: "contract IERC20",
            name: "",
            type: "address"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
          }
        ],
        name: "getApproved",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "hasTimelockStarted",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address"
          },
          {
            internalType: "address",
            name: "operator",
            type: "address"
          }
        ],
        name: "isApprovedForAll",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
          }
        ],
        name: "ownerOf",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "bytes4",
            name: "interfaceId",
            type: "bytes4"
          }
        ],
        name: "supportsInterface",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "index",
            type: "uint256"
          }
        ],
        name: "tokenByIndex",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "index",
            type: "uint256"
          }
        ],
        name: "tokenOfOwnerByIndex",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_owner",
            type: "address"
          }
        ],
        name: "tokensOfOwner",
        outputs: [
          {
            internalType: "uint256[]",
            name: "",
            type: "uint256[]"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
          }
        ],
        name: "tokenURI",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "totalCharacters",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        stateMutability: "view",
        type: "function"
      }
    ];
    const SporeMarketv1 = new window.web3.eth.Contract(
      ABI,
      "0xa3B1632fA8Bd3233d9c61044AC8b364aA26Be21b"
    );

    const accounts = await ethereum.request({ method: "eth_accounts" });
    //We take the first address in the array of addresses and display it
    const account = accounts[0];
    console.log(accounts);

    const balance = await SporeMarketv1.methods.balanceOf(account).call();

    const bazaar = await SporeMarketv1.methods.Bazaar(0).call();
    console.log(bazaar);
    this.setState({
      balance: balance,
      bazaar: bazaar
    });
  }

  render() {
    if (this.state.balance > 0) {
      image = <ReturnTokenURI />;
    } else {
      image = <> </>;
    }
    if (this.isWeb3) {
      if (!this.isnetworkID) {
        return (
          <div>
            <UnlockMetamask message="Wrong Network!" />
          </div>
        );
      } else {
        return (
          <>
            {" "}
            <button id="connectButton">Connected</button>
            <li> Marketplace</li>
            <li>tokenID: {this.state.bazaar.tokenId}</li>
            <li>Price: {this.state.bazaar.price}</li>
            <li className="nav-item">
              <input type="text" id="_tokenID" placeholder="0" />
              <button className="btn btn-outline-light" onClick={NFTbuy}>
                Buy NFT
              </button>
            </li>
            <li>Amont of NFTs you own: {this.state.balance} </li>
            {image}
          </>
        );
      }
    } else {
      return <InstallMetamask />;
    }
  }
}

//
import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
import artwork0 from "./assets/artwork0.png";
import artwork1 from "./assets/artwork1.png";
import artwork2 from "./assets/artwork2.png";

//https://stackoverflow.com/questions/49310555/react-get-metamask-latest-transaction-status --- check this for the transactions

const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
    //int number = 1;
    var ethpay = [
      ["nft1", 1], //0.1
      ["nft2", 2], //0.5
      ["nft3", 3] //1
    ];
    var Avgpay = 0;

    for (var i = 0; i < ethpay.length; i++) {
      Avgpay += ethpay[i][1]; //[1]
      var avg = Avgpay + ethpay.length;
    }

    alert("Transaction Approved: " + Avgpay / ethpay.length);

    if (avg < 1) {
      //>= works for 1 //< works for 2 //< works for 3
      /////////////////////PROBLEM OVER HERE SIR
      alert(
        "https://gateway.pinata.cloud/ipfs/QmfMoiSXdbrFHmB5dnnfTrCLcm6ePhQdqrrtdi9tcju5MU/artwork0.png"
      );
    } else if (avg >= 2) {
      //>= works for 2 //< works for 3
      alert(
        "https://gateway.pinata.cloud/ipfs/QmfMoiSXdbrFHmB5dnnfTrCLcm6ePhQdqrrtdi9tcju5MU/artwork0.png https://gateway.pinata.cloud/ipfs/QmfMoiSXdbrFHmB5dnnfTrCLcm6ePhQdqrrtdi9tcju5MU/artwork1.png"
      );
    } else if (avg > 3) {
      //> works for 3
      alert(
        "https://gateway.pinata.cloud/ipfs/QmfMoiSXdbrFHmB5dnnfTrCLcm6ePhQdqrrtdi9tcju5MU/artwork0.png https://gateway.pinata.cloud/ipfs/QmfMoiSXdbrFHmB5dnnfTrCLcm6ePhQdqrrtdi9tcju5MU/artwork1.png https://gateway.pinata.cloud/ipfs/QmfMoiSXdbrFHmB5dnnfTrCLcm6ePhQdqrrtdi9tcju5MU/artwork2.png"
      );
    }
  } catch (err) {
    setError(err.message);
  }
};

export default function App() {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr")
    });
  };

  const NFTContainer = {
    display: "flex",
    "margin-top": "20px",
    gap: "40px"
  };

  {
    /*const Main = styled.div`
 
   width: 960px;
   height: 95vh;
   background-color: orange;
   border-radius: 20px;
   display: flex;
   flex-direction: column;
   align-items: center;
   color: black;
 `*/
  }
  const Main = {
    width: "960px",
    height: "95vh",
    "background-color": "orange",
    "border-radius": "20px",
    "flex-direction": "column",
    "align-items": "center",
    color: "black"
  };

  const Container = {
    width: "100vw",
    height: "100vh",
    margin: "0",
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "background-color": "black"
  };

  const Header = {
    "font-size": "36px",
    "font-weight": "bold",
    margin: "10px 0"
  };

  const Container1 = {
    width: "200px",
    height: "242px",
    "border-radius": "10px",
    overflow: "hidden",
    display: "flex",
    "flex-direction": "column",
    "margin-left": "130px"
  };

  const Container2 = {
    width: "200px",
    height: "242px",
    "border-radius": "10px",
    overflow: "hidden",
    display: "flex",
    "flex-direction": "column"
  };
  const Image = {
    width: "100%",
    "object-fit": "cover",
    "background-color": "black",
    "flex-grow": "1",
    display: "flex",
    "flex-direction": "column",
    "border-bottom": "1px solid white"
  };

  const Price = {
    height: "40px",
    "background-color": "yellow",
    width: "100%",
    color: "black",
    display: "flex",
    "justify-content": "center",
    "align-items": "center"
  };

  {
    /* WALLET CONNECT BUTTON */
  }

  const download_page = () => {
    alert(
      "FOR MORE INFO PLEASE GO THROUGH THIS PAGE https://metamask.io/download/"
    );
  };

  const ConnectWallet = {
    width: "200px",
    "background-color": "white",
    height: "40px",
    "font-size": "14px",
    "font-weight": "bold",
    color: "black",
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    cursor: "pointer"
  };

  const LearnMore = {
    width: "200px",
    "background-color": "white",
    height: "40px",
    "font-size": "14px",
    "font-weight": "bold",
    color: "black",
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "margin-left": "380px",
    cursor: "pointer"
  };

  const Container3 = {
    display: "flex",
    "margin-top": "20px",
    "margin-left": "250px",
    gap: "20px"
  };

  //user input price

  const Input = {
    height: "30px",
    "text-align": "right",
    display: "flex",
    "justify-content": "center",
    "flex-direction": "column",
    "align-items": "center",
    "margin-left": "370px",
    "font-weight": "600"
  };

  const [priceVal, setPriceVal] = useState(1); //0.1

  const cryptoname = {
    "margin-left": "-40px",
    "font-size": "20px",
    "font-weight": "bold"
  };

  // Minting button

  const Mint = {
    "margin-left": "360px",
    width: "200px",
    "background-color": "white",
    height: "40px",
    "font-size": "14px",
    "font-weight": "bold",
    color: "black",
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    cursor: "pointer"
  };

  //helper function

  return (
    <div style={Container}>
      <div style={Main}>
        <div style={Header}>
          <center>CHOOSE YOUR NFT</center>
        </div>

        <div style={NFTContainer}>
          <div style={Container1}>
            <div style={Image} src={artwork0}></div>
            <img src={artwork0}></img>
            <div style={Price}>Price={"1 ETH"}</div>
          </div>
          <div style={Container2}>
            <div style={Image}>
              <img src={artwork1}></img>
            </div>

            <div style={Price}>Price={"2 ETH"}</div>
          </div>

          <div style={Container2}>
            <div style={Image}>
              <img src={artwork2}></img>
            </div>

            <div style={Price}>Price={"3 ETH"}</div>
          </div>
        </div>
        <br></br>

        <form className="m-4" onSubmit={handleSubmit}>
          <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
            <main className="mt-4 p-4">
              <h1 className="text-xl font-semibold text-gray-700 text-center">
                ENTER AMOUNT
              </h1>
              <div className="">
                <div className="my-3">
                  <input
                    type="text"
                    name="addr"
                    className="input input-bordered block w-full focus:ring focus:outline-none"
                    placeholder="0x8Ba1C68BA1A8E6D4120363332343890174E204C8"
                  />
                </div>
                <div className="my-3">
                  <input
                    name="ether"
                    type="text"
                    className="input input-bordered block w-full focus:ring focus:outline-none"
                    onChange={(e) => setPriceVal(e.target.value)}
                    value={priceVal}
                    placeholder="1" //0.1
                  />
                </div>
              </div>
            </main>
            <footer className="p-4">
              <button
                type="submit"
                className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
              >
                MINT NOW
              </button>
              <ErrorMessage message={error} />
              <TxList txs={txs} />
            </footer>
          </div>
        </form>
        {/*<button style={Mint}>MINT</button>*/}
        <div style={LearnMore} onClick={download_page}>
          LEARN MORE
        </div>
      </div>
      <center>
        {/*<h3>Wallet Address: 0x55ff7a28eb901aa0822720Dc77D37d2eCfd586B9</h3>*/}
      </center>
    </div>
  );
}

//
/* pages/index.js */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();

    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
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
          name: meta.data.name,
          description: meta.data.description
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }
  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(
      nftaddress,
      nft.tokenId,
      {
        value: price
      }
    );
    await transaction.wait();
    loadNFTs();
  }
  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img src={nft.image} />
              <div className="p-4">
                <p
                  style={{ height: "64px" }}
                  className="text-2xl font-semibold"
                >
                  {nft.name}
                </p>
                <div style={{ height: "70px", overflow: "hidden" }}>
                  <p className="text-gray-400">{nft.description}</p>
                </div>
              </div>
              <div className="p-4 bg-black">
                <p className="text-2xl mb-4 font-bold text-white">
                  {nft.price} XTO
                </p>
                <button
                  className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
                  onClick={() => buyNft(nft)}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

//
/* pages/create-item.js */
import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: ""
  });
  const router = useRouter();

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`)
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  async function createMarket() {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    const price = ethers.utils.parseUnits(formInput.price, "ether");

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
      value: listingPrice
    });
    await transaction.wait();
    router.push("/");
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
        />
        <input
          placeholder="Asset Price in XTO"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />
        <input type="file" name="Asset" className="my-4" onChange={onChange} />
        {fileUrl && <img className="rounded mt-4" width="350" src={fileUrl} />}
        <button
          onClick={createMarket}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
        >
          Create Digital Asset
        </button>
      </div>
    </div>
  );
}

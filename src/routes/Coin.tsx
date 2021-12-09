import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import {
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";
import { motion } from "framer-motion";
import React from "react";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    color: ${(props) => props.theme.textColor};
  }
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0;
  border-radius: 10px;
  a {
    display: block;
    color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
  }
`;

const Loader = styled.div`
  text-align: center;
`;
const ButtonBack = styled.p`
  position: absolute;
  left: 3vw;
  top: 2vh;
  width: 10vw;
  height: 4vw;
  font-size: 12px;
  a {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.textColor};
  }
`;
const Arrow = styled(motion.svg)`
  margin-right: 10px;
  width: 30px;
  height: auto;
  path {
    stroke-width: 5px;
    stroke: ${(props) => props.theme.textColor};
  }
`;
interface RouteParams {
  coinId: string;
}

interface RouterState {
  name: string;
}

interface InfoDate {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceDate {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouterState>();
  const priceMatch = useRouteMatch(`/BitCoin/${coinId}/price`);
  const chartMatch = useRouteMatch(`/BitCoin/${coinId}/chart`);
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoDate>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceDate>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
  );
  const loading = infoLoading || tickersLoading;
  const arrowVariant = {
    hidden: {
      pathLength: 0,
      fill: "rgba(57, 155, 155, 0)",
    },
    visible: {
      pathLength: 1,
      fill: "rgba(57, 155, 155, 1)",
    },
  };
  return (
    <Container>
      <ButtonBack>
        <Link to={`/`}>
          <Arrow xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <motion.path
              d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zM256 472c-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216zm-12.5-92.5l-115.1-115c-4.7-4.7-4.7-12.3 0-17l115.1-115c4.7-4.7 12.3-4.7 17 0l6.9 6.9c4.7 4.7 4.7 12.5-.2 17.1L181.7 239H372c6.6 0 12 5.4 12 12v10c0 6.6-5.4 12-12 12H181.7l85.6 82.5c4.8 4.7 4.9 12.4.2 17.1l-6.9 6.9c-4.8 4.7-12.4 4.7-17.1 0z"
              variants={arrowVariant}
              initial="hidden"
              animate="visible"
              transition={{
                default: {
                  duration: 3,
                },
                fill: {
                  duration: 1,
                  delay: 2,
                },
              }}
            ></motion.path>
          </Arrow>
        </Link>
      </ButtonBack>
      <Helmet>
        <title>
          {state?.name ? state?.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state?.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes?.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/BitCoin/${coinId}/chart`}>Chart</Link>
            </Tab>

            <Tab isActive={priceMatch !== null}>
              <Link to={`/BitCoin/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/BitCoin/${coinId}/price`}>
              <Price coinId={coinId} />
            </Route>
            <Route path={`/BitCoin/${coinId}/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}
export default Coin;

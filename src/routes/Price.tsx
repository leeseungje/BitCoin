import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinLatest } from "../api";

const PriceWrap = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  display: grid;
  color: ${(props) => props.theme.textColor};
  align-items: center;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;
const PriceTxt = styled.div`
  text-align: center;
  &.high {
    color: #d5482d;
  }
  &.low {
    color: #2469cf;
  }
`;
const Title = styled.p``;
const Coast = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

interface PriceProps {
  coinId: string;
}

interface CoinLatest {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data: dataSource } = useQuery<CoinLatest[]>(
    ["latest", coinId],
    () => fetchCoinLatest(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading Price..."
      ) : (
        <PriceWrap>
          <PriceTxt>
            <Title>Open Price </Title>
            <Coast>${dataSource?.[0].open.toFixed(2)}</Coast>
          </PriceTxt>
          <PriceTxt>
            <Title>Close Price </Title>
            <Coast>${dataSource?.[0].close.toFixed(2)}</Coast>
          </PriceTxt>
          <PriceTxt className="high">
            <Title>high Price</Title>
            <Coast>${dataSource?.[0].high.toFixed(2)}</Coast>
          </PriceTxt>
          <PriceTxt className="low">
            <Title>low Price </Title>
            <Coast>${dataSource?.[0].low.toFixed(2)}</Coast>
          </PriceTxt>
        </PriceWrap>
      )}
    </div>
  );
}
export default Price;

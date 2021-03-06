import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProps {}

function Router({}: IRouterProps) {
  // coinId가 변수 값을 받는다
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/BitCoin/:coinId">
            <Coin />
          </Route>
          <Route path="/BitCoin/">
            <Coins />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}
export default Router;

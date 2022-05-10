import React, { FC, useContext, useEffect, useState } from "react";
import AppContext from "../../context/appContext";
import LubyContract from "../../shared/utils/lubyContract";
import { CoinContainer, CoinImage, CoinText } from "./styles";

interface CoinVisualizerProps {}

const CoinVisualizer: FC<CoinVisualizerProps> = () => {
  const context = useContext(AppContext);
  const { account, contract, updateCoin } = context;
  const [coin, setCoin] = useState<number>(0);
  const [game, setGame] = useState<LubyContract>();

  useEffect(() => {
    if (account && contract) {
      setGame(new LubyContract(account, contract));
      handleUpdate();
    }
  }, [account, contract]);

  useEffect(() => {
    if (game && account) {
      game.setAccount(account);
    }
  }, [account]);

  useEffect(() => {
    if (game) {
      handleUpdate();
    }
  }, [game, updateCoin]);

  const handleUpdate = async () => {
    if (game) {
      game
        .getBalance()
        .then((res) => {
          setCoin(res / 10 ** 18);
        })
        .catch(console.log);
    }
  };
  return (
    <CoinContainer>
      <CoinImage src="https://lab.luby.com.br/resources/images/logo.svg" />
      <CoinText>{coin} LBC</CoinText>
    </CoinContainer>
  );
};

export default CoinVisualizer;

import { FC, useContext, useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import React from "react";
import { Container, Title, Menu, HeaderContainer } from "./styles";
import AppContext from "../../context/appContext";
import CoinVisualizer from "../../components/CoinVisualizer";
import { useNavigate } from "react-router-dom";
import LubyContract from "../../shared/utils/lubyContract";

const Home: FC = () => {
  const context = useContext(AppContext);
  const { account, contract, handleNotification, handleUpdateCoin } = context;
  const [game, setGame] = useState<LubyContract>();
  const [admin, setAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (account && contract) {
      setGame(new LubyContract(account, contract));
    }
  }, [account, contract]);

  useEffect(() => {
    if (game && account) {
      game.setAccount(account);
    }
  }, [account]);

  useEffect(() => {
    if (game) {
      setAdmin(game.isAdmin());
    } else {
      setAdmin(false);
    }
  }, [game]);

  const handleDeposit = () => {
    if (game && handleNotification) {
      game
        .depositOnContract()
        .then(() => {
          handleNotification({
            type: "success",
            text: "Valor depositado com sucesso",
          });
        })
        .catch(console.log);
    }
  };

  const handleWithdraw = () => {
    if (game && handleNotification && handleUpdateCoin) {
      game
        .claimBalance()
        .then(() => {
          handleUpdateCoin();
          handleNotification({
            type: "success",
            text: "Suas moedas foram sacadas para a sua carteira",
          });
        })
        .catch(console.log);
    }
  };

  const handleMintCoin = () => {
    if (game && handleNotification) {
      game
        .mintLbc()
        .then(() => {
          handleNotification({
            type: "success",
            text: "Você recebeu 1 LBC, cheque a sua carteira",
          });
        })
        .catch(console.log);
    }
  };

  const handleGetBalanceFromContract = () => {
    if (game && handleNotification) {
      game.getBalanceFromContract().then(() => {
        game
          .getBalanceFromContract()
          .then((res) => {
            handleNotification({
              type: "info",
              text: "O contrato possui: " + res + " LBC",
            });
          })
          .catch(console.log);
      });
    }
  };

  const handleWithdrawFromContract = () => {
    if (game && handleNotification) {
      game
        .claimBalanceFromContract()
        .then(() => {
          handleNotification({
            type: "success",
            text: "As moedas do contrato from sacadas para a sua carteira",
          });
        })
        .catch(console.log);
    }
  };

  const handleStartGame = () => {
    navigate("/quiz");
  };

  return (
    <Container>
      <HeaderContainer>
        <Title>Luby Quiz Game</Title>
        <CoinVisualizer />
      </HeaderContainer>
      <Menu>
        <CustomButton text="Start Game" handleClick={handleStartGame} />
        <CustomButton text="Depositar" handleClick={handleDeposit} />
        <CustomButton text="Sacar" handleClick={handleWithdraw} />
        <CustomButton text="Pedir Moeda" handleClick={handleMintCoin} />
        {admin && (
          <CustomButton
            text="Ver Balanço do Contrato"
            handleClick={handleGetBalanceFromContract}
          />
        )}
        {admin && (
          <CustomButton
            text="Sacar Balanço do Contrato"
            handleClick={handleWithdrawFromContract}
          />
        )}
      </Menu>
    </Container>
  );
};

export default Home;

import "./App.css";
import { Home } from "./pages";
import getWeb3 from "./shared/utils/getWeb3";
import AppContext from "./context/appContext";
import React, { useState, useEffect } from "react";
import LubyContract from "./contracts/LubyGame.json";
import NotificationDispatcher, {
  INotification,
} from "./components/NotificationDispatcher";
import addTokenToWallet from "./shared/utils/addTokenToWallet";
import Game from "./pages/Game";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ILubyContract from "./shared/interface/ILubyContract";
function App() {
  const [newWeb3, setNewWeb3] = useState();
  const [lubyGame, setLubyGame] = useState<ILubyContract>();
  const [account, setAccount] = useState<string>();
  const [updateCoin, setUpdateCoin] = useState<number>(0);
  const [notification, setNotification] = useState<INotification>();

  const handleUpdateCoin = () => {
    setUpdateCoin((prevState) => (prevState += 1));
  };

  useEffect(() => {
    if (newWeb3) {
      handleAccount();
      handleContract();
    } else {
      initialize();
    }
  }, [newWeb3]);

  const initialize = async () => {
    getWeb3()
      .then((result) => {
        setNewWeb3(result);
        handleAccount();
      })
      .catch((error) => console.log(error));
  };

  const handleAccount = async () => {
    if (newWeb3) {
      //@ts-ignore
      let tempAccount = await newWeb3.eth.getAccounts();
      setAccount(tempAccount[0]);
    }
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", function(accounts) {
        //@ts-ignore
        setAccount(accounts[0]);
      });
    }
  };

  const handleContract = async () => {
    if (newWeb3) {
      //@ts-ignore
      let networkId = await newWeb3.eth.net.getId();
      //@ts-ignore
      let deployedNetwork = LubyContract.networks[networkId];
      //@ts-ignore
      let deployedContract: ILubyContract = new newWeb3.eth.Contract(
        LubyContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      setLubyGame(deployedContract);
    }
  };

  const addToken = async (account: string) => {
    addTokenToWallet(
      account,
      "LBC",
      18,
      "https://lab.luby.com.br/resources/images/logo.svg"
    );
  };

  return (
    <AppContext.Provider
      value={{
        web3: newWeb3,
        account: account,
        contract: lubyGame,
        updateCoin: updateCoin,
        handleUpdateCoin: handleUpdateCoin,
        handleNotification: setNotification,
        notification: notification,
      }}
    >
      <NotificationDispatcher />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;

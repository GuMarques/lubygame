import React, { createContext } from "react";
import Web3 from "web3";
import { INotification } from "../components/NotificationDispatcher";
import ILubyContract from "../shared/interface/ILubyContract";

interface IContext {
  web3: typeof Web3;
  account: string;
  contract: ILubyContract;
  updateCoin: number;
  handleUpdateCoin: () => void;
  notification: INotification;
  handleNotification: (notification: INotification) => void;
}

const AppContext = createContext<Partial<IContext>>({});

export default AppContext;

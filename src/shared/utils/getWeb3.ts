import Web3 from "web3";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const getWeb3 = async () => {
  return new Promise<any>(async (resolve, reject) => {
    if (window.ethereum) {
      try {
        //@ts-ignore
        const web3 = new Web3(window.ethereum);
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    } else {
      try {
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:7545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    }
  });
};

export default getWeb3;

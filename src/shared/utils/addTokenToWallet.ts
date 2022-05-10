import React from "react";

const addTokenToWallet = async (
  address: string,
  symbol: string,
  decimals: number,
  tokenImage: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      //@ts-ignore
      window.ethereum
        .request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20", // Initially only supports ERC20, but eventually more!
            options: {
              address: address, // The address that the token is at.
              symbol: symbol, // A ticker symbol or shorthand, up to 5 chars.
              decimals: decimals, // The number of decimals in the token
              image: tokenImage, // A string url of the token logo
            },
          },
        })
        .then((res) => {
          if (res) {
            resolve(true);
          } else {
            reject("Your loss!");
          }
        });
    } catch (error) {
      reject(error);
    }
  });
};

export default addTokenToWallet;

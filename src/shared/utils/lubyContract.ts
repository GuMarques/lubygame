import React from "react";
import ILubyContract from "../interface/ILubyContract";

export default class LubyContract {
  private account: string;
  private contract: ILubyContract;
  private admin: boolean;

  constructor(account: string, contract: ILubyContract) {
    this.account = account;
    this.contract = contract;
    this.admin = false;
    this.checkIsAdmin();
  }

  public setAccount(account: string) {
    this.account = account;
    this.checkIsAdmin();
  }

  public getAccount(): string {
    return this.account;
  }

  public isAdmin(): boolean {
    return this.admin;
  }

  public convertLbc(x: number): string {
    return (x * 10 ** 18).toString();
  }

  private checkIsAdmin() {
    if (
      this.account === "0x66c9db754d338fd6bae14ded94f087dde903b249" ||
      this.account === "0x66c9db754D338Fd6bae14DED94F087DDe903B249"
    ) {
      this.admin = true;
    } else {
      this.admin = false;
    }
  }

  public getBalanceFromContract = async (): Promise<any> => {
    return new Promise(async (resolve, rejects) => {
      if (!this.isAdmin()) {
        rejects("You are not the Owner");
      }
      try {
        //@ts-ignore
        const res = await this.contract.methods
          .getBalance(this.account)
          .call({ from: this.account });
        resolve(res);
      } catch (error) {
        rejects(error);
      }
    });
  };

  public claimBalance = async (): Promise<any> => {
    return new Promise(async (resolve, rejects) => {
      try {
        //@ts-ignore
        await this.contract.methods
          .claimBalance(this.convertLbc(0))
          .send({ from: this.account });
        resolve(true);
      } catch (error) {
        rejects(error);
      }
    });
  };

  public mintLbc = async (): Promise<any> => {
    return new Promise(async (resolve, rejects) => {
      try {
        //@ts-ignore
        await this.contract.methods
          .mintLbc(this.convertLbc(1))
          .send({ from: this.account });
        resolve(true);
      } catch (error) {
        rejects(error);
      }
    });
  };

  public depositOnContract = async (): Promise<any> => {
    return new Promise(async (resolve, rejects) => {
      try {
        //@ts-ignore
        await this.contract.methods
          .approve(this.convertLbc(1))
          .send({ from: this.account });
        //@ts-ignore
        await this.contract.methods
          .startGame(this.convertLbc(1))
          .send({ from: this.account });
        resolve(true);
      } catch (error) {
        rejects(error);
      }
    });
  };

  public claimBalanceFromContract = async (): Promise<any> => {
    return new Promise(async (resolve, rejects) => {
      if (!this.isAdmin()) {
        rejects("You are not the Owner");
      }
      try {
        //@ts-ignore
        await this.contract.methods.withdraw().send({ from: this.account });
        resolve(true);
      } catch (error) {
        rejects(error);
      }
    });
  };

  public getBalance = async (): Promise<any> => {
    return new Promise(async (resolve, rejects) => {
      try {
        //@ts-ignore
        const res = await this.contract.methods
          .getBalanceIndividual()
          .call({ from: this.account });
        resolve(res);
      } catch (error) {
        rejects(error);
      }
    });
  };

  public correctAnswer = async (): Promise<any> => {
    return new Promise(async (resolve, rejects) => {
      try {
        //@ts-ignore
        await this.contract.methods
          .correctAnswer(this.convertLbc(0.5))
          .send({ from: this.account });
        resolve(true);
      } catch (error) {
        rejects(error);
      }
    });
  };

  public incorrectAnswer = async (): Promise<any> => {
    return new Promise(async (resolve, rejects) => {
      try {
        //@ts-ignore
        await this.contract.methods
          .incorrectAnswer(this.convertLbc(15))
          .send({ from: this.account });
        resolve(true);
      } catch (error) {
        rejects(error);
      }
    });
  };
}

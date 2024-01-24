import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import MyContract from './abi/Og.json';

const Web3Context = React.createContext();

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);

  const initializeWeb3 = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await web3Instance.eth.getAccounts();
        console.log('Current account:', accounts[0]);
        const contract = new web3Instance.eth.Contract(
          MyContract.abi,
          "0x6164b6d5a8fcFC5843657D70BF0cE23c25e53bB3"
        );
        setWeb3(web3Instance);
        setAccounts(accounts);
        setContract(contract);
      } else {
        console.error('MetaMask not detected');
        const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
        const web3Instance = new Web3(provider);
        setWeb3(web3Instance);
      }
    } catch (error) {
      console.error('Error initializing Web3:', error);
    }
  };

  useEffect(() => {
    initializeWeb3();
  }, []);

  return (
    <Web3Context.Provider value={{ web3, accounts, contract }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = React.useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};
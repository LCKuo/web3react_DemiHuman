import { useEffect, useState } from "react";
import React from 'react';

import {
  VStack,
  useDisclosure,
  Button,
  Text,
  HStack,
  Select,
  Input,
  Box
} from "@chakra-ui/react";
import SelectWalletModal from "./Modal";
import { useWeb3React } from "@web3-react/core";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { networkParams } from "./networks";
import { connectors } from "./connectors";
import { toHex, truncateAddress } from "./utils";
import "./styles.css";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active
  } = useWeb3React();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [network, setNetwork] = useState(undefined);
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }]
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(network)]]
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  const signMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message, account]
      });
      setSignedMessage(message);
      setSignature(signature);
    } catch (error) {
      setError(error);
    }
  };

  const verifyMessage = async () => {
    if (!library) return;
    try {
      const verify = await library.provider.request({
        method: "personal_ecRecover",
        params: [signedMessage, signature]
      });
      setVerified(verify === account.toLowerCase());
    } catch (error) {
      setError(error);
    }
  };

  const refreshState = () => {
    window.localStorage.setItem("provider", undefined);
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  const disconnect = () => {
    refreshState();
    deactivate();
  };

  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    if (provider) activate(connectors[provider]);
  }, []);

  return (
    <>
      <VStack alignItems="center" h="100vh">
        <HStack marginBottom="10px">
          <div>
            <div className="card">
              <div className="container">
                <img src="https://dictionary.cambridge.org/zht/images/thumb/black_noun_002_03536.jpg?version=5.0.245" className="card--image" />
                <h1 className="text">LOGIN TO VIEW YOUR COLLECTION</h1>
                <HStack>
                  {!active ? (
                    <Button className="btn" onClick={onOpen}>Connect Wallet</Button>
                  ) : (
                    <Button className="btn" onClick={disconnect}>Disconnect</Button>
                  )}
                </HStack>
              </div>
              <div className="story--preview">
                <img src="https://uploads-ssl.webflow.com/6165507cab3fc14387e2119a/62b5653e9ef02b6bf2ecf662_%E6%88%AA%E5%9C%96%202022-06-24%20%E4%B8%8B%E5%8D%883.17.37-p-1600.png" className="card--image2" />
                <h1 className="card--story">The very first installment of the Demi-Human NFT Comic series!</h1>
                <h1 className="card--story">This story takes place in 2069, the earth trembles, in the Demiverse.</h1>
              </div>
            </div>
          </div>
        </HStack>
      </VStack>
      <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
    </>
  );
}

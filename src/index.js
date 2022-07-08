import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import "./styles.css";

import App from "./App";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ChakraProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Navbar />
        <h1 className="titles--Text">Demi-Comic Reader</h1>
        <hr className="hr--line" />
        <App />
        <Footer />
      </Web3ReactProvider>
    </ChakraProvider>
  </StrictMode>,
  rootElement
);

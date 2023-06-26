import { Suspense, lazy } from "react";
import { ChainProvider } from "@cosmos-kit/react";
import { ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
import { wallets as keplrWallets } from "@cosmos-kit/keplr-extension";
import { RecoilRoot } from "recoil";
import { assets, chains } from "chain-registry";

import { theme } from "./chakra-theme";
import { ENABLED_MAINNETS, ENABLED_TESTNETS, MAINNET, TESTNET } from "./config";
import SelectChain from "./components/select-chain";

const WalletButton = lazy(() => import("./components/wallet-button"));

function App() {
  return (
    // State management - Recoil
    <RecoilRoot>
      {/* UI Kit - Chakra */}
      <ChakraProvider theme={theme}>
        {/* CosmosKit */}
        <ChainProvider
          chains={chains.filter(
            (c) =>
              ENABLED_TESTNETS.includes(c.chain_id as TESTNET) ||
              ENABLED_MAINNETS.includes(c.chain_id as MAINNET)
          )}
          assetLists={assets}
          wallets={[...keplrWallets]}
          wrappedWithChakra
        >
          <Flex gap={2} p={2}>
            <Suspense fallback={<Spinner />}>
              <SelectChain />
              <WalletButton />
            </Suspense>
          </Flex>
        </ChainProvider>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default App;

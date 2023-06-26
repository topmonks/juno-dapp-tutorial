import { Select } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { chains } from "chain-registry";
import { chainState } from "../state/cosmos";
import { MAINNET, TESTNET } from "../config";

export default function SelectChain() {
  const [chain, setChain] = useRecoilState(chainState);

  return (
    <Select
      placeholder="Select chain"
      value={chain.chain_id}
      width={200}
      onChange={(e) => {
        const chain = chains.find((c) => c.chain_id === e.target.value);
        if (chain) {
          setChain(chain);
        }
      }}
    >
      <option value={TESTNET.JUNO}>Juno (Testnet)</option>
      <option value={MAINNET.JUNO}>Juno</option>
    </Select>
  );
}

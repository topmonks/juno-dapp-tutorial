import { atom } from "recoil";
import { chains } from "chain-registry";

import { TESTNET } from "../config";

type Chain = (typeof chains)[0];

export const chainState = atom<Chain>({
  key: "chainState",
  default: chains.find((c) => c.chain_id === TESTNET.JUNO),
});

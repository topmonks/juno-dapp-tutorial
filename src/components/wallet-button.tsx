import { Fragment } from "react";
import { useChain } from "@cosmos-kit/react";
import { useRecoilValue } from "recoil";
import { Button, ButtonProps, useToast } from "@chakra-ui/react";

import { chainState } from "../state/cosmos";

export default function WalletButton({
  ButtonProps,
}: {
  ButtonProps?: ButtonProps;
}) {
  const chain = useRecoilValue(chainState);
  const { address, connect, disconnect, wallet, isWalletConnected } = useChain(
    chain.chain_name
  );
  const toast = useToast();

  if (!isWalletConnected) {
    return (
      <Fragment>
        <Button onClick={connect} {...ButtonProps}>
          Connect wallet
        </Button>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Button
        variant="outline"
        onClick={() => {
          if (address) {
            navigator.clipboard.writeText(address);
            toast({
              title: "Address copied",
              variant: "subtle",
              status: "info",
            });
          }
        }}
      >
        {wallet?.prettyName} - {addressShort(address || "")}
      </Button>
      <Button onClick={disconnect}>Logout</Button>
    </Fragment>
  );
}

function addressShort(address: string | null) {
  if (!address) {
    return address;
  }

  return `${address.slice(0, 9)}...${address.slice(-4)}`;
}

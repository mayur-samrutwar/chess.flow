import * as fcl from "@onflow/fcl";
import { Int } from "@onflow/types";

import { rollDice } from "../../flow/cadence/scripts/rollDice";

fcl.config({
  "flow.network": "testnet",
  "accessNode.api": "https://rest-testnet.onflow.org",
  "discovery.wallet": `https://fcl-discovery.onflow.org/testnet/authn`,
});

export default async function handler(req, res) {
  const { diceType, numberOfDice } = req.query;

  if (!diceType || !numberOfDice) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const a = diceType.toString();
  const b = numberOfDice.toString();
  const args = (arg, t) => [fcl.arg(a, Int), fcl.arg(b, Int)];

  const dice = await fcl
    .send([fcl.script(rollDice), fcl.args(args(args))])
    .then(fcl.decode);

  res.status(200).json({ diceValues: dice });
}

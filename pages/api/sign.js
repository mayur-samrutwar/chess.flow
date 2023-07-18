const { decode } = require("rlp");
const { sign } = require("../../utils/authorization");
import * as fcl from "@onflow/fcl";
import { Int } from "@onflow/types";

// const transactionCode = `
// transaction(number: Int) {
//   prepare(frontendUser: AuthAccount, backendAdmin: AuthAccount) {

//   }
// }
// `;

fcl.config({
  "flow.network": "testnet",
  "accessNode.api": "https://rest-testnet.onflow.org",
  "discovery.wallet": `https://fcl-discovery.onflow.org/testnet/authn`,
});

export default async function handler(req, res) {
  //   const { diceType, numberOfDice } = req.query;

  //   if (!diceType || !numberOfDice) {
  //     return res.status(400).json({ error: "Missing parameters" });
  //   }

  //   const a = diceType.toString();
  //   const b = numberOfDice.toString();
  //   const args = (arg, t) => [fcl.arg(a, Int), fcl.arg(b, Int)];

  //   const dice = await fcl
  //     .send([fcl.script(rollDice), fcl.args(args(args))])
  //     .then(fcl.decode);

  const { signable } = req.body;
  console.log(signable);
  const signature = sign(signable.message);
  res.json({
    signature,
  });

  res.status(200);
}

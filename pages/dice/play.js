import React, { useState } from "react";
import { FaDice, FaPencilAlt } from "react-icons/fa";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { payFees } from "../../flow/cadence/transactions/payFees";
import { serverAuthorization } from "./serverSigner";
import { getReward } from "../../flow/cadence/transactions/getReward";

fcl.config({
  "flow.network": "testnet",
  "accessNode.api": "https://rest-testnet.onflow.org",
  "discovery.wallet": `https://fcl-discovery.onflow.org/testnet/authn`,
});

const DiceGenerator = () => {
  const [numberOfDice, setNumberOfDice] = useState(1);
  const [isGenerated, setIsGenerated] = useState(false);
  const [user, setUser] = useState();
  const [betType, setBetType] = useState(2);
  const [generatedDice, setGeneratedDice] = useState();
  const [isPaid, setIsPaid] = useState(false);

  const connectWalletHandler = () => {
    fcl.authenticate();
    fcl.currentUser().subscribe(setUser);
  };

  const logOut = () => {
    fcl.unauthenticate();
  };

  const handleGenerate = async () => {
    const response = await fetch(
      `/api/generate?diceType=${betType}&numberOfDice=1`
    );

    if (response.ok) {
      const data = await response.json();
      setGeneratedDice(data.diceValues);
      setIsGenerated(true);
      console.log("generated dice", data.diceValues[0]);
      console.log("selected dice", numberOfDice);
    } else {
      console.error("Error generating dice");
    }
  };

  const handlePay = async () => {
    const amount = "1.0";
    const address = "0x61683d8d52f3b6e4";
    const args = [fcl.arg(amount, t.UFix64), fcl.arg(address, t.Address)];

    const transactionId = await fcl
      .send([
        fcl.transaction(payFees),
        fcl.args(args),
        fcl.proposer(fcl.authz),
        fcl.payer(fcl.authz),
        fcl.authorizations([fcl.authz]),
      ])
      .then(fcl.decode);

    console.log(transactionId);
    setIsPaid(true);
  };

  const handleReward = async () => {
    const amount = "2.0";
    const address = user.addr.toString();
    const response = await fcl.send([
      fcl.transaction(getReward),
      fcl.args([
        fcl.arg(amount, t.UFix64),
        fcl.arg(user.addr, t.Address),
        fcl.arg("0x61683d8d52f3b6e4", t.Address),
      ]),
      fcl.proposer(serverAuthorization),
      fcl.payer(serverAuthorization),
      fcl.authorizations([serverAuthorization]),
    ]);
    const transactionId = fcl.decode(response);
    console.log(transactionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-yellow-100 flex flex-col items-center justify-center py-10">
      <h2 className="idaloka border-2 px-10 py-4 text-2xl border-black shadow-[5px_5px_0px_0px_rgba(0,0,0)] mb-4 font-bold tracking-wider">
        BetIt
      </h2>
      <div className="mt-10 flex justify-center items-center">
        <div className="w-full border-dotted border-2 border-gray-300 bg-white p-8 text-center rounded-lg mx-4">
          <div>
            <div className="flex justify-center items-center mb-6">
              <button
                className="bg-black px-8 py-3 text-white rounded-lg"
                onClick={user && user.addr ? logOut : connectWalletHandler}
              >
                {user && user.addr ? user.addr : "Connect Wallet"}
              </button>
            </div>
            <p className="text-lg">Select guess option</p>
            <div className="flex justify-center space-x-12 items-even text-lg">
              <div className="space-x-4">
                <input
                  type="radio"
                  name="betType"
                  id="oneTwo"
                  value="2"
                  onChange={() => setBetType(2)}
                  checked
                />
                <label htmlFor="oneTwo">1/2</label>
              </div>
              <div className="space-x-4">
                <input
                  type="radio"
                  name="betType"
                  id="oneSix"
                  value="6"
                  onChange={() => setBetType(6)}
                />
                <label htmlFor="oneSix">1/2/3/4/5/6</label>
              </div>
            </div>
            <div className="my-8">
              <div className="flex items-center justify-between text-sm">
                <p className="bg-gray-500 text-white px-6 py-3 rounded-lg">
                  <span className="font-bold">Fee:</span> 1 Flow token
                </p>
                <p className="bg-gray-500 text-white px-6 py-3 rounded-lg">
                  <span className="font-bold">Reward:</span>{" "}
                  {betType == "2" ? "2" : "6"} Flow tokens
                </p>
              </div>
            </div>

            <div className="flex justify-center items-center mb-6">
              <label
                htmlFor="numberOfDice"
                className="mr-4 text-lg text-gray-800"
              >
                Guess the output:
              </label>
              <input
                type="range"
                id="numberOfDice"
                min="1"
                max={betType == "2" ? 2 : 6}
                value={numberOfDice}
                onChange={(e) => setNumberOfDice(Number(e.target.value))}
                className="w-60"
              />
              <span className="ml-2 text-lg text-gray-800">{numberOfDice}</span>
            </div>

            {!isGenerated ? (
              <div className="flex justify-center mt-8">
                <button
                  onClick={isPaid ? handleGenerate : handlePay}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md focus:outline-none transition-transform duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
                >
                  {isPaid ? (
                    <>
                      <FaDice className="text-lg" />
                      Roll
                    </>
                  ) : (
                    "Pay"
                  )}
                </button>
              </div>
            ) : null}

            {isGenerated ? (
              <>
                <p className=" mt-8 mb-4">Generated output : {generatedDice}</p>
                <button
                  className={
                    generatedDice == numberOfDice
                      ? " px-8 py-4 text-sm rounded-lg bg-green-200 text-green-800"
                      : " px-8 py-4 text-sm rounded-lg bg-red-200 text-red-800"
                  }
                >
                  {generatedDice == numberOfDice ? "You won!!" : "You lost!!"}
                </button>
                {generatedDice == numberOfDice ? (
                  <button
                    className="ml-4 mt-8 px-8 py-4 text-sm bg-black text-white rounded-lg"
                    onClick={handleReward}
                  >
                    Claim {betType}X Reward
                  </button>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiceGenerator;

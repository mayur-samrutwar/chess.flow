import React, { useState } from "react";
import { FaDice, FaPencilAlt } from "react-icons/fa";
import * as fcl from "@onflow/fcl";
import { Int } from "@onflow/types";
import { rollDice } from "../../flow/cadence/scripts/rollDice";

fcl.config({
  "flow.network": "testnet",
  "accessNode.api": "https://rest-testnet.onflow.org",
  "discovery.wallet": `https://fcl-discovery.onflow.org/testnet/authn`,
});

const DiceGenerator = () => {
  const [diceType, setDiceType] = useState(6);
  const [numberOfDice, setNumberOfDice] = useState(1);
  const [generatedDice, setGeneratedDice] = useState([]);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const diceTypes = [
    { label: "D4", value: 4 },
    { label: "D6", value: 6 },
    { label: "D8", value: 8 },
    { label: "D10", value: 10 },
    { label: "D12", value: 12 },
    { label: "D20", value: 20 },
  ];

  const handleGenerate = async () => {
    const response = await fetch(
      `/api/generate?diceType=${diceType}&numberOfDice=${numberOfDice}`
    );

    if (response.ok) {
      const data = await response.json();
      setGeneratedDice(data.diceValues);
      setIsGenerated(true);
    } else {
      console.error("Error generating dice");
    }
  };

  const handleRoll = () => {
    setGeneratedDice((prevState) =>
      prevState.map((dice) => Math.floor(Math.random() * diceType) + 1)
    );
  };

  const handleEdit = () => {
    setIsGenerated(false);
  };

  const handleCopyLink = () => {
    const endpoint = `${window.location.hostname}/api/generate?diceType=${diceType}&numberOfDice=${numberOfDice}`;
    navigator.clipboard.writeText(endpoint);
    setIsLinkCopied(true);
    setTimeout(() => {
      setIsLinkCopied(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-yellow-100 flex flex-col items-center justify-center py-10">
      <h2 className="idaloka border-2 px-10 py-4 text-2xl border-black shadow-[5px_5px_0px_0px_rgba(0,0,0)] mb-4 font-bold tracking-wider">
        Dice on Flow
      </h2>
      <div className="mt-10 flex justify-center items-center">
        <div className="w-full border-dotted border-2 border-gray-300 bg-white p-8 text-center rounded-lg mx-4">
          {!isGenerated ? (
            <div>
              <div className="flex justify-center items-center mb-6">
                <label
                  htmlFor="diceType"
                  className="mr-4 text-lg text-gray-800"
                >
                  Type of Dice:
                </label>
                <select
                  id="diceType"
                  value={diceType}
                  onChange={(e) => setDiceType(Number(e.target.value))}
                  className="w-28 bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none"
                >
                  {diceTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-center items-center mb-6">
                <label
                  htmlFor="numberOfDice"
                  className="mr-4 text-lg text-gray-800"
                >
                  Number of Dice:
                </label>
                <input
                  type="range"
                  id="numberOfDice"
                  min="1"
                  max="10"
                  value={numberOfDice}
                  onChange={(e) => setNumberOfDice(Number(e.target.value))}
                  className="w-60"
                />
                <span className="ml-2 text-lg text-gray-800">
                  {numberOfDice}
                </span>
              </div>
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleGenerate}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md focus:outline-none transition-transform duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
                >
                  <FaDice className="text-lg" />
                  Generate
                </button>
              </div>
            </div>
          ) : (
            <div className="w-[600px] p-4">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={handleEdit}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold text-sm py-2 px-6 rounded-md focus:outline-none transition-transform duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
                >
                  <FaPencilAlt className="text-sm" />
                  Edit Options
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleRoll}
                  className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-md focus:outline-none transition-transform duration-300 ease-in-out transform hover:scale-110 active:scale-90"
                >
                  <FaDice className="text-lg" />
                  Roll
                </button>
              </div>
              <div className="mt-8 flex justify-center">
                <div className="grid grid-cols-5 gap-6">
                  {generatedDice.map((dice, index) => (
                    <div
                      key={index}
                      className="bg-black rounded-lg w-16 h-16 text-white text-2xl flex items-center justify-center"
                    >
                      {dice}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {isGenerated && (
          <div className="w-96 border-dotted border-2 border-gray-300 bg-white p-4 text-sm rounded-lg ml-4">
            <h3 className="text-lg font-bold mb-2">API Request</h3>
            <div className="rounded-lg bg-gray-100 p-4 mb-4">
              <p>
                API Endpoint: <code>http://localhost:3000/api/generate</code>
              </p>
              <p>
                Request Body:{" "}
                <code>{JSON.stringify({ diceType, numberOfDice })}</code>
              </p>
            </div>
            <button
              onClick={handleCopyLink}
              className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none transition-all duration-300 ${
                isLinkCopied ? "bg-green-500" : ""
              }`}
            >
              {isLinkCopied ? "Copied!" : "Copy Link"}
            </button>
            <h3 className="text-lg font-bold mt-4">API Response</h3>
            <pre className="rounded-lg bg-gray-100 p-4 text-xs">
              {JSON.stringify({ diceValues: generatedDice }, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiceGenerator;

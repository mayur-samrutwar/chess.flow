import React, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { mintNFT } from "../../flow/cadence/transactions/mintNFT";
import { setupUser } from "../../flow/cadence/transactions/setupUser";
import { getNFTsScript } from "../../flow/cadence/scripts/getNFTsScript";

fcl.config({
  "flow.network": "testnet",
  "accessNode.api": "https://rest-testnet.onflow.org",
  "discovery.wallet": `https://fcl-discovery.onflow.org/testnet/authn`,
});

const Claim = () => {
  const [user, SetUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("hero");
  const [headline, setHeadline] = useState(null);
  const [description, setDescription] = useState(null);
  const [candyType, setCandyType] = useState(null);
  const [distributeType, setDistributeType] = useState("0"); // type 0 = Whitelisted address || type 1 = anyone with the link
  const [maxClaims, setMaxClaims] = useState(10);
  const [whiteListedAddress, setWhiteListedAddress] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    console.log(headline);
    console.log(description);
    console.log(candyType);
  }, [headline, description, candyType]);

  useEffect(() => {
    fcl.currentUser().subscribe(SetUser);
  }, []);

  const logIn = () => {
    fcl.authenticate();
  };
  const logOut = () => {
    fcl.unauthenticate();
  };

  const mintCandies = async () => {
    try {
      const transactionId = await fcl
        .send([
          fcl.transaction(mintNFT),
          fcl.args([fcl.arg("lololol", t.String), fcl.arg(headline, t.String)]),
          fcl.payer(fcl.authz),
          fcl.proposer(fcl.authz),
          fcl.authorizations([fcl.authz]),
          fcl.limit(9999),
        ])
        .then(fcl.decode);

      console.log(transactionId);

      return fcl.tx(transactionId).onceSealed();
    } catch (error) {
      console.log("Error uploading file ", error);
    }
  };

  const setupUserHandler = async () => {
    try {
      const transactionId = await fcl
        .send([
          fcl.transaction(setupUser),
          fcl.payer(fcl.authz),
          fcl.proposer(fcl.authz),
          fcl.authorizations([fcl.authz]),
          fcl.limit(9999),
        ])
        .then(fcl.decode);

      console.log(transactionId);

      return fcl.tx(transactionId).onceSealed();
    } catch (error) {
      console.log("hehe error", error);
    }
  };

  const getUserNFTs = async () => {
    const result = await fcl
      .send([
        fcl.script(getNFTsScript),
        fcl.args([fcl.arg("0x61683d8d52f3b6e4", t.Address)]),
      ])
      .then(fcl.decode());
    console.log(result);
  };

  return (
    <div>
      <div className="px-40 z-10">
        <header>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent">
                  FlowCandy
                </h1>

                <p className="mt-1.5 text-gray-900">
                  Celebreate your community! 🍭
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                {user && user.addr ? (
                  <button
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
                    type="button"
                  >
                    <span className="text-sm font-medium">{user.addr}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </button>
                ) : null}

                <button
                  onClick={user && user.addr ? logOut : logIn}
                  className="inline-flex items-center justify-center gap-1.5 rounded border border-blue-500 bg-blue-500 px-12 py-3 font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                  type="button"
                >
                  {user && user.addr ? "Logout" : "Login"}
                </button>
              </div>
            </div>
          </div>
        </header>
        <button onClick={getUserNFTs}>Get NFTS</button>
      </div>
    </div>
  );
};

export default Claim;

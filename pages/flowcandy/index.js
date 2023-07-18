import React, { useState, useEffect, useRef } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import html2canvas from "html2canvas";
// import logo from "../../assets/images/logo.jpg";
import { mintNFT } from "../../flow/cadence/transactions/mintNFT";
import { setupUser } from "../../flow/cadence/transactions/setupUser";
import { create } from "ipfs-http-client";

// const ipfsClient = create("https://ipfs.infura.io:5001/api/v0");

fcl.config({
  "flow.network": "testnet",
  "accessNode.api": "https://rest-testnet.onflow.org",
  "discovery.wallet": `https://fcl-discovery.onflow.org/testnet/authn`,
});

const Homepage = () => {
  const divRef = useRef(null);

  const [user, SetUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("hero");
  const [headline, setHeadline] = useState(null);
  const [description, setDescription] = useState(null);
  const [candyType, setCandyType] = useState(null);
  const [distributeType, setDistributeType] = useState("0"); // type 0 = Whitelisted address || type 1 = anyone with the link
  const [maxClaims, setMaxClaims] = useState(10);
  const [whiteListedAddress, setWhiteListedAddress] = useState([]);
  const [file, setFile] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);

  useEffect(() => {
    console.log(headline);
    console.log(description);
    console.log(candyType);
  }, [headline, description, candyType]);

  useEffect(() => {
    fcl.currentUser().subscribe(SetUser);
  }, []);

  const convertToImage = () => {
    setTimeout(() => {
      html2canvas(divRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        setImage(imgData);
      });
    }, 100);
  };

  const logIn = () => {
    fcl.authenticate();
  };
  const logOut = () => {
    fcl.unauthenticate();
  };

  const mintCandies = async () => {
    console.log("im clicked too");
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
    console.log("im clicked");
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

        {/* -------------------------------------------------- */}
        {/* -------------hero section------------------------- */}
        {/* -------------------------------------------------- */}

        {currentPage == "hero" ? (
          <section className="">
            <div className="mx-auto max-w-screen-xl px-4 py-20">
              <div className="mx-auto text-center">
                <h1 className=" text-8xl font-extrabold text-gray-900">
                  mint{" "}
                  <span className="underline decoration-blue-400 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-8xl font-extrabold text-transparent">
                    candies
                  </span>
                  ,<span className="sm:block"> celebrete community </span>
                </h1>

                <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                  NFTs to celebrate your community’s access, achievements,
                  participations, and contributions.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <button
                    className="block w-full rounded border border-blue-500 bg-blue-500 px-12 py-3 text font-medium text-white hover:bg-blue-600 hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                    onClick={() => setCurrentPage("create")}
                  >
                    Create Candies
                  </button>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* -------------------------------------------------- */}
        {/* -------------minting form section----------------- */}
        {/* -------------------------------------------------- */}
        {currentPage == "create" && user ? (
          <section className="px-24">
            <p className="text-4xl font-black text-gray-700">Create Candies</p>
            <div className="w-full grid grid-cols-2 gap-20">
              <div className="">
                <div class="max-w-md mx-auto">
                  <div class="my-4">
                    <label
                      for="headline"
                      class=" text-gray-800 mb-1 rounded-full p-3 block w-full"
                    >
                      Headline <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="headline"
                      placeholder="This will show up on your NFT"
                      class="border rounded-full py-3 px-4 w-full text-sm text-gray-800"
                      maxLength="20"
                      required
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                    />
                  </div>
                  <div class="mb-4">
                    <label
                      for="description"
                      class="mb-1 rounded-full p-3 block w-full"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      placeholder="Let your community member(s) know, how valuable they are for you <3"
                      class="border rounded-lg py-3 px-4 w-full h-32 resize-none text-sm text-gray-800"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div class="mb-6">
                    <label
                      for="candy"
                      class="text-gray-800 mb-1 rounded-full p-3 block w-full"
                    >
                      Candy type
                    </label>
                    <select
                      id="candy"
                      class="rounded-full border py-3 px-4 w-full text-sm text-gray-800"
                      value={candyType}
                      onChange={(e) => setCandyType(e.target.value)}
                    >
                      <option value="">Select candy type</option>S
                      <option value="accessPass">Access Pass</option>
                      <option value="proofOfKnowledge">
                        Proof of Knowledge
                      </option>
                      <option value="hackathonRewards">
                        Hackathon Rewards
                      </option>
                      <option value="contributorRecognition">
                        Contributor Recognition
                      </option>
                      <option value="teamShoutouts"> Team Shoutouts</option>
                      <option value="ProofOfAttendancen">
                        Proof of Attendance
                      </option>
                    </select>
                  </div>
                  <div class="mb-6">
                    <label
                      for="candy"
                      class="text-gray-800 mb-1 rounded-full p-3 block w-full"
                    >
                      Expiry Date:
                    </label>
                    <input
                      type="date"
                      id="expiryDate"
                      placeholder="This is the expiry date of your NFT"
                      class="border rounded-full py-3 px-4 w-full text-sm text-gray-800"
                      maxLength="20"
                      required
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />
                  </div>
                  {/* <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  /> */}
                  <button
                    className="block w-full rounded border border-blue-500 bg-blue-500 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                    onClick={() => setCurrentPage("distribute")}
                  >
                    Next &rarr;
                  </button>
                </div>
              </div>
              <div className="">
                <div class="w-96 h-96 rounded-lg overflow-hidden relative">
                  <div class="absolute top-0 right-0 w-full h-full rounded-lg bg-gradient-to-br from-green-200 to-violet-400"></div>
                  <div class="absolute top-12 inset-x-8 bottom-32 bg-white bg-opacity-60 py-12 pl-12 pr-16 rounded-lg backdrop-filter backdrop-blur-sm">
                    <span class="text-black font-semibold text-3xl">
                      Your headline will show up here.
                    </span>
                    <span class="text-6xl absolute -top-10 -left-5">
                      &#127852;
                    </span>
                  </div>
                  <div class="absolute text-white text-lg font-semibold inset-x-8 bottom-12 text-center">
                    made with &hearts; via FlowCandy
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}
        {/* -------------------------------------------------- */}
        {/* ----------------distribution page----------------- */}
        {/* -------------------------------------------------- */}
        {currentPage == "distribute" && user ? (
          <section className="px-24">
            <p className="text-4xl font-black text-gray-700">
              Distribute Candies
            </p>
            <div className="w-full grid grid-cols-2 gap-20">
              <div className="">
                <div class="max-w-md mx-auto">
                  <div class="my-4">
                    <div class="flex items-center mb-4">
                      <input
                        type="radio"
                        id="type0"
                        name="distributionType"
                        class="mr-2"
                        value="0"
                        checked={distributeType == "0"}
                        onChange={(e) => setDistributeType(e.target.value)}
                      />
                      <label
                        for="type0"
                        class="text-gray-800 rounded-full p-3 block w-full"
                      >
                        Allowlisted addresses
                      </label>
                    </div>
                    {distributeType == "0" ? (
                      <textarea
                        type="text"
                        id="type0"
                        placeholder="Enter flow addresses seperated by comma"
                        class="border rounded-lg py-3 px-4 w-full text-sm text-gray-800"
                        maxLength="20"
                        required
                        value={whiteListedAddress}
                        onChange={(e) => setWhiteListedAddress(e.target.value)}
                      ></textarea>
                    ) : null}
                  </div>

                  <div class="my-4">
                    <div class="flex items-center mb-4">
                      <input
                        type="radio"
                        id="type1"
                        name="distributionType"
                        class="mr-2"
                        value="1"
                        checked={distributeType == "1"}
                        onChange={(e) => setDistributeType(e.target.value)}
                      />
                      <label
                        for="type1"
                        class="text-gray-800 rounded-full p-3 block w-full"
                      >
                        Anyone with the link
                      </label>
                    </div>
                    {distributeType == "1" ? (
                      <input
                        type="number"
                        id="headline"
                        placeholder=""
                        class="border rounded-lg py-3 px-4 w-full text-sm text-gray-800"
                        maxLength="20"
                        value={maxClaims}
                        onChange={(e) => setMaxClaims(e.target.value)}
                      />
                    ) : null}
                  </div>
                  <div className="flex space-x-8">
                    <button
                      className="block w-full rounded border border-blue-500 bg-white px-12 py-3 text-sm font-medium text-blue-500 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                      onClick={() => setCurrentPage("create")}
                    >
                      &larr; Back
                    </button>
                    <button
                      className="block w-full rounded border border-blue-500 bg-blue-500 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                      onClick={() => {
                        setCurrentPage("preview");
                      }}
                    >
                      Next &rarr;
                    </button>
                  </div>
                </div>
              </div>
              <div className="">
                <div
                  class="w-96 h-96 rounded-lg overflow-hidden relative"
                  ref={divRef}
                >
                  <div class="absolute top-0 right-0 w-full h-full rounded-lg bg-gradient-to-br from-green-200 to-violet-400"></div>
                  <div class="absolute top-12 inset-x-8 bottom-32 bg-white bg-opacity-60 py-12 pl-12 pr-16 rounded-lg backdrop-filter backdrop-blur-sm">
                    <span class="text-black font-semibold text-3xl">
                      {headline}
                    </span>
                    <span class="text-6xl absolute -top-10 -left-5">
                      &#127852;
                    </span>
                  </div>
                  <div class="absolute text-white text-lg font-semibold inset-x-8 bottom-12 text-center">
                    made with &hearts; via FlowCandy
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}
        {/* -------------------------------------------------- */}
        {/* -------------preview page----------------- */}
        {/* -------------------------------------------------- */}
        {currentPage == "preview" && user ? (
          <section className="px-24">
            <p className="text-4xl font-black text-gray-700">
              Distribute Candies
            </p>
            <div className="w-full grid grid-cols-2 gap-20">
              <div className="">
                <div class="max-w-md mx-auto">
                  <div class="my-4">
                    <div class=" items-center mb-6">
                      <p className="text-gray-800 font-semibold text-lg rounded-full block w-full">
                        Headline
                      </p>
                      <p className=" text-gray-600">{headline}</p>
                    </div>
                    <div class=" items-center mb-6">
                      <p className="text-gray-800 font-semibold text-lg rounded-full block w-full">
                        Description
                      </p>
                      <p className=" text-gray-600">{description}</p>
                    </div>
                    <div class=" items-center mb-6">
                      <p className="text-gray-800 font-semibold text-lg rounded-full block w-full">
                        Candy Type
                      </p>
                      <p className=" text-gray-600">{candyType}</p>
                    </div>
                    <div class=" items-center mb-6">
                      <p className="text-gray-800 font-semibold text-lg rounded-full block w-full">
                        Creator
                      </p>
                      <p className=" text-gray-600">{user.addr}</p>
                    </div>
                    <div class=" items-center mb-6">
                      <p className="text-gray-800 font-semibold text-lg rounded-full block w-full">
                        Distribution
                      </p>
                      <p className=" text-gray-600">{distributeType}</p>
                    </div>
                  </div>

                  <div className="flex space-x-8">
                    <div className="flex space-x-8">
                      <button
                        className="block w-full rounded border border-blue-500 bg-white px-12 py-3 text-sm font-medium text-blue-500 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                        onClick={() => setCurrentPage("create")}
                      >
                        &larr; Back
                      </button>
                      <button
                        className="block w-full rounded border border-blue-500 bg-blue-500 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                        onClick={() => setCurrentPage("share")}
                      >
                        Mint candies
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div class="w-96 h-96 rounded-lg overflow-hidden relative">
                  <div class="absolute top-0 right-0 w-full h-full rounded-lg bg-gradient-to-br from-green-200 to-violet-400"></div>
                  <div class="absolute top-12 inset-x-8 bottom-32 bg-white bg-opacity-60 py-12 pl-12 pr-16 rounded-lg backdrop-filter backdrop-blur-sm">
                    <span class="text-black font-semibold text-3xl">
                      {headline}
                    </span>
                    <span class="text-6xl absolute -top-10 -left-5">
                      &#127852;
                    </span>
                  </div>
                  <div class="absolute text-white text-lg font-semibold inset-x-8 bottom-12 text-center">
                    made with &hearts; via FlowCandy
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* -------------------------------------------------- */}
        {/* -------------share page----------------- */}
        {/* -------------------------------------------------- */}

        {currentPage == "share" && user ? (
          <section className="px-24">
            <div className="w-full grid grid-cols-2 gap-20">
              <div className="mt-40">
                <p className="text-xl font-bold text-gray-800">
                  Share claim link
                </p>
                <p className="text-gray-700 text-sm">
                  Share this link with allowlisted people so they can claim
                  their candies
                </p>
                <div className="border-blue-500 border-2 text-black p-3 rounded-lg w-full mt-12 overflow-x-scroll">
                  http://localhost:3000/claim/{user.addr + "flow-conf"}
                </div>
                <button
                  className="px-8 py-3 flex items-center bg-blue-500 text-white foont-semibold text-sm mt-4 rounded-lg"
                  onClick={mintCandies}
                >
                  Copy
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 ml-3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                    />
                  </svg>
                </button>
                {/* <button
                  className="px-8 py-3 flex items-center bg-blue-500 text-white foont-semibold text-sm mt-4 rounded-lg"
                  onClick={setupUserHandler}
                >
                  Setup
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 ml-3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                    />
                  </svg>
                </button> */}
              </div>
              <div className="">
                <div class="w-96 h-96 rounded-lg overflow-hidden relative">
                  <div class="absolute top-0 right-0 w-full h-full rounded-lg bg-gradient-to-br from-green-200 to-violet-400"></div>
                  <div class="absolute top-12 inset-x-8 bottom-32 bg-white bg-opacity-60 py-12 pl-12 pr-16 rounded-lg backdrop-filter backdrop-blur-sm">
                    <span class="text-black font-semibold text-3xl">
                      {headline}
                    </span>
                    <span class="text-6xl absolute -top-10 -left-5">
                      &#127852;
                    </span>
                  </div>
                  <div class="absolute text-white text-lg font-semibold inset-x-8 bottom-12 text-center">
                    made with &hearts; via FlowCandy
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default Homepage;

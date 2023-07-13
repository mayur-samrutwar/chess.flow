import React, { useState } from "react";
import * as fcl from "@onflow/fcl";

fcl.config({
  "flow.network": "testnet",
  "accessNode.api": "https://rest-testnet.onflow.org",
  "discovery.wallet": `https://fcl-discovery.onflow.org/testnet/authn`,
});

const Homepage = () => {
  const [user, SetUser] = useState(null);

  const logIn = () => {
    fcl.authenticate();
    fcl.currentUser().subscribe(SetUser);
  };
  const logOut = () => {
    fcl.unauthenticate();
  };

  return (
    <div>
      <div className="w-screen fixed z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xmlnsSvgjs="http://svgjs.dev/svgjs"
          viewBox="0 0 800 800"
        >
          <defs>
            <filter
              id="bbblurry-filter"
              x="-100%"
              y="-100%"
              width="400%"
              height="400%"
              filterUnits="objectBoundingBox"
              primitiveUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feGaussianBlur
                stdDeviation="89"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                in="SourceGraphic"
                edgeMode="none"
                result="blur"
              ></feGaussianBlur>
            </filter>
          </defs>
          <g filter="url(#bbblurry-filter)">
            <ellipse
              rx="130.5"
              ry="133"
              cx="30.08569497253154"
              cy="522.7856416166694"
              fill="hsla(142, 77%, 73%, 1.00)"
            ></ellipse>
            <ellipse
              rx="130.5"
              ry="133"
              cx="693.0746033525324"
              cy="562.5861298012662"
              fill="hsla(217, 91%, 60%, 1.00)"
            ></ellipse>
          </g>
        </svg>
      </div>
      <div className="px-40 z-10">
        {/* {user && user.addr ? user.addr : "hehe"}
      <button onClick={logIn}>Login</button>
      <button onClick={logOut}>Logout</button> */}
        <header>
          <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div class="sm:flex sm:items-center sm:justify-between">
              <div class="text-center sm:text-left">
                <h1 class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent">
                  FlowCandy
                </h1>

                <p class="mt-1.5 text-gray-900">
                  Celebreate your community! 🎉
                </p>
              </div>

              <div class="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                {user && user.addr ? (
                  <button
                    class="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
                    type="button"
                  >
                    <span class="text-sm font-medium">{user.addr}</span>
                  </button>
                ) : null}

                <button
                  onClick={user && user.addr ? logOut : logIn}
                  class="inline-flex items-center justify-center gap-1.5 rounded border border-blue-500 bg-blue-500 px-12 py-3 font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                  type="button"
                >
                  {user && user.addr ? "Logout" : "Login"}
                  {user && user.addr ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
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
                  ) : null}
                </button>
              </div>
            </div>
          </div>
        </header>

        <section class="">
          <div class="mx-auto max-w-screen-xl px-4 py-20">
            <div class="mx-auto text-center">
              <h1 class=" text-8xl font-extrabold text-gray-900">
                mint{" "}
                <span className="underline decoration-blue-400 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-8xl font-extrabold text-transparent">
                  flowcandies
                </span>
                ,<span class="sm:block"> celebrete community </span>
              </h1>

              <p class="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                NFTs to celebrate your community’s achievements, participations,
                and contributions.
              </p>

              <div class="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  class="block w-full rounded border border-blue-500 bg-blue-500 px-12 py-3 text font-medium text-white hover:bg-blue-600 hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                  href="/get-started"
                >
                  Create Candies
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Homepage;

import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/AuthContext";
import { NextChessground, Stockfish } from "next-chessground";
import engineMove from "../utils/engine-move";
import React, { useRef, useState } from "react";
import Chessboard from "../components/Chessboard";

const Playground = () => {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);
  const { isPlayingWithAi } = useContext(AuthContext);

  useEffect(() => {
    if (!isPlayingWithAi && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, isPlayingWithAi, router]);
  return (
    <div className="flex flex-row justify-center pt-10">
      {/* <div className="relative column-1 w-1/12 h-screen bg-custom-blue justify-center"></div> */}
      <div className="flex justify-center w-10/12">
        <div className="column-2 w-1/3 md:w-6/12 h-full md:mx-2 my-2 rounded-md">
          <Chessboard />
        </div>
        <div className="column-3 w-1/3 md:w-5/12 h-full border-2 border-dashed md:mx-2 my-2 rounded-md"></div>
      </div>
    </div>
  );
};

export default Playground;

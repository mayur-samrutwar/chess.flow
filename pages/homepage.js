import { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/AuthContext";
import Image from "next/image";
import chessbg from "../assets/chess.jpg";

const HomePage = () => {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);
  const { push } = router;
  const handlePlayWithAI = () => {
    push("/playground");
  };

  const handlePlayOnline = () => {
    if (isLoggedIn) {
      push("/playground");
    } else {
      push("/login");
    }
  };

  return (
    <div>
      <div className="px-40 py-10 flex flex-col items-center">
        <div className="flex items-center">
          {/* <Image src={logo} className="w-1/12 grayscale" alt="logo" /> */}
          <p className="font-black text-5xl">CHESSVERSE</p>
        </div>

        {/* Rest of the code... */}
        <Image className="w-1/2" src={chessbg} alt="Chess pieces" />
        {/* Image Credit: https://dribbble.com/shots/11123313-Circle-to-Square-chess-set */}

        <div className="flex space-x-20">
          <button
            onClick={handlePlayWithAI}
            className="vidaloka border-2 px-10 py-4 text-lg border-black shadow-[5px_5px_0px_0px_rgba(0,0,0)]"
          >
            Play With AI
          </button>
          <button
            onClick={handlePlayOnline}
            className="vidaloka border-2 px-10 py-4 text-lg border-black shadow-[5px_5px_0px_0px_rgba(0,0,0)]"
          >
            Play Online
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

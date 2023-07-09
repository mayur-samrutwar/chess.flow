import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/AuthContext";

const SignupPage = () => {
  const router = useRouter();
  const { signup } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    // Perform signup logic and user creation
    // Assuming successful signup, update the isLoggedIn state
    signup();
    router.push("/playground");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h2 className="text-4xl font-bold mb-4">Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-white rounded p-2 mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-white rounded p-2 mb-2"
      />
      <button
        onClick={handleSignup}
        className="bg-white text-black px-4 py-2 rounded"
      >
        Signup
      </button>
    </div>
  );
};

export default SignupPage;

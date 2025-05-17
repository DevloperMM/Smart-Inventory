import { useState } from "react";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    console.log({ email, password });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('/side.jpg')` }}
    >
      <div className="rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden backdrop-blur-sm bg-blue-300/30">
        {/* Login Form */}
        <div className="py-10 px-14">
          <h2 className="text-3xl text-white/75 font-bold text-center mb-8 underline underline-offset-8">
            IT Store Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <Mail
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <Lock
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-1/2 mx-auto block bg-cyan-500/75 text-white py-2 rounded-lg hover:bg-cyan-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

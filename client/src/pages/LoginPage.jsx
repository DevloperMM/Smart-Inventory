import { useState } from "react";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_rgba(251,191,36,0.3)_0%,_rgba(245,158,11,0.2)_45%,_rgba(0,0,0,0.1)_100%)]" />
        </div>
      </div>

      <div className="rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden backdrop-blur-xs bg-white/10">
        {/* Login Form */}
        <div className="py-10 px-14">
          <h2 className="text-3xl text-amber-600 text-center font-bold mb-8 underline underline-offset-8">
            Inventory Login
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
              className="w-1/3 mx-auto block bg-gray-500/75 text-white py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { Mail, Lock, LogIn, Loader } from "lucide-react";
import { useUserStore } from "../store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = useUserStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-start px-12"
      style={{ backgroundImage: 'url("/login_bg.png")' }}
    >
      <div className="hidden sm:block backdrop-blur-lg bg-gray-100/25 rounded-2xl shadow-2xl w-2/3 lg:w-1/2 xl:w-1/3 h-[50%] overflow-hidden">
        <div className="p-12">
          <h2 className="text-3xl font-bold text-center mb-6">
            IT Inventory Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-7">
            <div className="relative">
              <Mail
                className="absolute left-3 top-2.75 text-gray-400"
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
                className="absolute left-3 top-2.75 text-gray-400"
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
              className="mx-auto w-1/3 flex justify-center bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition"
            >
              {loading ? (
                <>
                  <Loader
                    className="mt-0.5 mr-2 h-5 w-5 animate-spin"
                    aria-hidden="true"
                  />
                  Loading...
                </>
              ) : (
                <>
                  <LogIn className="mt-0.5 mr-2 h-5 w-5" aria-hidden="true" />
                  Login
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useNavigate , Link} from "react-router-dom";

const PrincipalLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // ✅ Fixed Principal credentials
    const adminEmail = "satyajeet2004patil@gmail.com";
    const adminPassword = "patil01";

    // Simulate a brief network delay for realism
    setTimeout(() => {
      if (email === adminEmail && password === adminPassword) {
        // 1. Create a user object that the Dashboard expects
        const user = {
          name: "Principal Satyajeet",
          email: adminEmail,
          role: "principal",
        };

        // 2. Store the user data
        localStorage.setItem("user", JSON.stringify(user));

        /* IMPORTANT: Since we are bypassing the backend login, 
          we need a way to tell the backend "I am allowed to see these."
          For this to work without errors, you must use the 'Hardcoded Fallback' 
          method in your backend middleware we discussed earlier.
        */
        localStorage.setItem("token", "PERMANENT_PRINCIPAL_BYPASS_TOKEN");

        navigate("/principal-dashboard");
      } else {
        setError("Invalid Principal Credentials");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-900 border border-white/10 rounded-3xl shadow-2xl p-10 space-y-6"
        >
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-white">Principal Access</h2>
            <p className="text-neutral-400 text-sm">Secure Administrative Login</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-center text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
              <input
                type="email"
                placeholder="Admin Email"
                className="w-full bg-black border border-white/10 pl-12 pr-4 py-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-black border border-white/10 pl-12 pr-4 py-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-bold transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Authorize Entry"}
          </button>

                      <p className="text-center text-sm text-gray-500 mt-6">
              Are you a Student?
              <Link to="/login" className="text-blue-600 font-medium ml-1 hover:underline">
                Login as Student.
              </Link>
            </p>
        </form>
      </div>
    </div>
  );
};

export default PrincipalLogin;
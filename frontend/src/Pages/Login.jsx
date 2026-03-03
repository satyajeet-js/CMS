    import React, { useState } from "react";
    import axios from "axios";
    import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
    import { Link,useNavigate } from "react-router-dom";

    const Login = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [showPassword, setShowPassword] = useState(false);
      const navigate = useNavigate();
      const [remember, setRemember] = useState(false);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify({
      id: res.data.id,
      name: res.data.name,
      role: res.data.role
    }));

          // 🔥 ROLE BASED REDIRECT
          if (res.data.role === "student") {
            navigate("/student/dashboard");
          } else {
            navigate("/principal-dashboard");
          }

      } catch (err) {
        setError(err.response?.data?.message || "Login failed");
        } finally {
          setLoading(false);
        }
    };


      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200">

            {/* HEADER */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Welcome Back 👋
              </h2>
              <p className="text-gray-500 mt-2">
                Sign in to access your dashboard
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Email Address
                </label>
                <div className="mt-1 flex items-center border rounded-xl px-4 py-2 focus-within:ring-2 ring-blue-500 transition">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <input
                    type="email"
                    placeholder="student@college.edu"
                    className="w-full ml-3 outline-none bg-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Password
                </label>
                <div className="mt-1 flex items-center border rounded-xl px-4 py-2 focus-within:ring-2 ring-blue-500 transition">
                  <Lock className="w-5 h-5 text-blue-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full ml-3 outline-none bg-transparent"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 text-gray-500 hover:text-blue-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* REMEMBER + FORGOT */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                    className="accent-blue-600"
                  />
                  Remember me
                </label>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold shadow-md transition disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Signing In...
                  </>
                ) : (
                  "Sign In Securely 🔐"
                )}
              </button>
            </form>

            {/* FOOTER */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Don’t have an account?
              <Link to="/register" className="text-blue-600 font-medium ml-1 hover:underline">
                Create one
              </Link>
            </p>
            <p className="text-center text-sm text-gray-500 mt-6">
              Are you a principal?
              <Link to="/principal-login" className="text-blue-600 font-medium ml-1 hover:underline">
                Login as Principal
              </Link>
            </p>

          </div>
        </div>
      );
    };

    export default Login;

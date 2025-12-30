import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/auth.service";
import { Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login: authLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login({ email, password });
      authLogin("", response); // Update context state
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data || "Failed to login. Please check your credentials.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-brand-navy relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="from-brand-navy absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r to-transparent opacity-90"></div>
        <div className="bg-brand-red absolute right-[-10%] bottom-[-20%] h-[600px] w-[600px] rounded-full opacity-20 blur-[120px]"></div>
        <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-blue-900 opacity-20 blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="mb-10 text-center">
          <h1 className="font-heading mb-2 text-4xl font-bold tracking-wider text-white">
            LOKAR <span className="text-brand-red">.</span>
          </h1>
          <p className="text-gray-400">
            Welcome back. Access your premium fleet.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          <h2 className="mb-6 text-2xl font-semibold text-white">Login</h2>

          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="ml-1 text-sm font-medium text-gray-300">
                Email Address
              </label>
              <div className="group relative">
                <Mail
                  className="group-focus-within:text-brand-red absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 transition-colors"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-brand-navy/50 focus:border-brand-red/50 focus:ring-brand-red/50 font-body w-full rounded-xl border border-white/10 py-3 pr-4 pl-12 text-white placeholder-gray-500 transition-all focus:ring-1 focus:outline-none"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="ml-1 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">
                  Password
                </label>
                <a
                  href="#"
                  className="text-brand-red text-xs transition-colors hover:text-red-400"
                >
                  Forgot password?
                </a>
              </div>
              <div className="group relative">
                <Lock
                  className="group-focus-within:text-brand-red absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 transition-colors"
                  size={20}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-brand-navy/50 focus:border-brand-red/50 focus:ring-brand-red/50 font-body w-full rounded-xl border border-white/10 py-3 pr-4 pl-12 text-white placeholder-gray-500 transition-all focus:ring-1 focus:outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-brand-red shadow-brand-red/20 hover:shadow-brand-red/40 group flex w-full items-center justify-center gap-2 rounded-xl py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-red-700"
            >
              {isLoading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
              ) : (
                <>
                  Sign In
                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-brand-red font-medium transition-colors hover:text-red-400"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

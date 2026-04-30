import { useState, type FC, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/auth.service";
import { User, Lock, Mail, AlertCircle, Award } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Signup: FC = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await authService.signup({ name, email, password });
      await authLogin();
      navigate("/");
    } catch (err: unknown) {
      setError("Impossible de créer le compte. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-brand-navy relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="from-brand-navy absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r to-transparent opacity-90"></div>
        <div className="bg-brand-green/20 absolute top-[20%] right-[-10%] h-[500px] w-[500px] rounded-full opacity-20 blur-[100px]"></div>
        <div className="bg-brand-red absolute bottom-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full opacity-20 blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-3xl font-bold tracking-wide text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            LOKAR <span className="text-brand-red">.</span>
          </h1>
          <p className="text-gray-400 text-sm">
            Rejoignez la communauté LOKAR.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          <h2 className="mb-6 text-xl font-semibold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Créer un compte
          </h2>

          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="ml-1 text-sm font-medium text-gray-300">
                Nom complet
              </label>
              <div className="group relative">
                <User
                  className="group-focus-within:text-brand-red absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-brand-navy/50 focus:border-brand-red/50 focus:ring-brand-red/50 font-body w-full rounded-xl border border-white/10 py-3 pr-4 pl-12 text-white placeholder-gray-500 transition-all focus:ring-1 focus:outline-none"
                  placeholder="votre nom complet"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-sm font-medium text-gray-300">
                Adresse email
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
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-sm font-medium text-gray-300">
                Mot de passe
              </label>
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
                  Commencer
                  <Award
                    size={20}
                    className="transition-transform group-hover:scale-110"
                  />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Déjà un compte ?{" "}
              <Link
                to="/login"
                className="text-brand-red font-medium transition-colors hover:text-red-400"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
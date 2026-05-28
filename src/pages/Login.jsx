import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Eye, EyeOff, ArrowLeft, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/seo/SEO";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import { fadeUp, staggerContainer } from "../utils/motion";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, loading: authLoading } = useAuth();

  const from = location.state?.from?.pathname || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setSubmitting(true);
    try {
      await login(email.trim(), password);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      const message = err?.message || "Something went wrong. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="relative">
          <div className="h-10 w-10 rounded-full border-[3px] border-terra-200/60 border-t-terra-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <>
      <SEO title="Admin Login" description="Sign in to the admin dashboard." />

      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mx-auto max-w-md"
          >
            <motion.div variants={fadeUp}>
              <Link
                to="/"
                className="mb-8 inline-flex items-center gap-1.5 text-sm text-sage-400 transition-colors hover:text-terra-600"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to site
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="rounded-2xl bg-white/60 backdrop-blur-sm border border-sage-100/40 p-8 shadow-elevated sm:p-10"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-terra-50 to-cream-100">
                <LogIn className="h-6 w-6 text-terra-500" />
              </div>

              <h1 className="mt-5 text-center font-serif text-2xl font-bold text-sage-700">
                Admin Login
              </h1>
              <p className="mt-1 text-center text-sm text-sage-400">
                Sign in to manage your store.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-wider text-sage-400"
                  >
                    Email
                  </label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sage-400">
                      <Mail className="h-4 w-4" />
                    </span>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      className="w-full rounded-xl border border-sage-200/60 bg-white/60 py-2.5 pl-11 pr-3 text-sm text-sage-700 placeholder-sage-300 transition-all duration-300 focus:border-terra-400/60 focus:ring-4 focus:ring-terra-100/30 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold uppercase tracking-wider text-sage-400"
                  >
                    Password
                  </label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sage-400">
                      <Lock className="h-4 w-4" />
                    </span>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-xl border border-sage-200/60 bg-white/60 py-2.5 pl-11 pr-11 text-sm text-sage-700 placeholder-sage-300 transition-all duration-300 focus:border-terra-400/60 focus:ring-4 focus:ring-terra-100/30 focus:bg-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sage-400 transition-colors hover:text-sage-600"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-rose-50/80 px-4 py-2.5 text-sm text-rose-500"
                    role="alert"
                  >
                    {error}
                  </motion.p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={submitting}
                  className="w-full"
                >
                  {submitting ? (
                    <>
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-center text-xs text-sage-400"
            >
              Authorized administrators only.
            </motion.p>
          </motion.div>
        </Container>
      </div>
    </>
  );
}

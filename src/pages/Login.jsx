import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/seo/SEO";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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
      const message =
        err?.message === "Invalid login credentials"
          ? "Invalid email or password."
          : err?.message || "Something went wrong. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="Admin Login" description="Sign in to the admin dashboard." />

      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-md"
          >
            {/* Back link */}
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-1.5 text-sm text-sage-500 transition-colors hover:text-brand-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to site
            </Link>

            {/* Card */}
            <div className="rounded-2xl border border-sage-100 bg-white p-8 shadow-elevated sm:p-10">
              {/* Icon */}
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50">
                <LogIn className="h-6 w-6 text-brand-500" />
              </div>

              {/* Heading */}
              <h1 className="mt-5 text-center font-serif text-2xl font-bold text-sage-800">
                Admin Login
              </h1>
              <p className="mt-1 text-center text-sm text-sage-500">
                Sign in to manage your store.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium uppercase tracking-wider text-sage-500"
                  >
                    Email
                  </label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sage-400">
                      <Mail className="h-4 w-4" />
                    </span>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      className="w-full rounded-lg border border-sage-200 bg-white py-2.5 pl-10 pr-3 text-sm text-sage-800 placeholder-sage-300 transition-smooth focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-medium uppercase tracking-wider text-sage-500"
                  >
                    Password
                  </label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sage-400">
                      <Lock className="h-4 w-4" />
                    </span>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-sage-200 bg-white py-2.5 pl-10 pr-10 text-sm text-sage-800 placeholder-sage-300 transition-smooth focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sage-400 transition-colors hover:text-sage-600"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600"
                    role="alert"
                  >
                    {error}
                  </motion.p>
                )}

                {/* Submit */}
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
            </div>

            <p className="mt-6 text-center text-xs text-sage-400">
              Authorized administrators only.
            </p>
          </motion.div>
        </Container>
      </div>
    </>
  );
}

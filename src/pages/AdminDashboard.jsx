import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Package, DollarSign, TrendingUp, Inbox, LogOut, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { getQuoteRequests } from "../services/quoteRequestsService";
import SEO from "../components/seo/SEO";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import AdminStatCard from "../components/admin/AdminStatCard";
import QuoteRequestsTable from "../components/admin/QuoteRequestsTable";
import EmptyState from "../components/admin/EmptyState";
import { fadeUp, staggerContainer } from "../utils/motion";

function TableSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-white/60 backdrop-blur-sm border border-sage-100/60 p-6">
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-6">
            <div className="h-4 w-24 rounded-lg bg-sage-200/70" />
            <div className="h-4 w-28 rounded-lg bg-sage-200/70" />
            <div className="h-4 w-14 rounded-lg bg-sage-200/70" />
            <div className="h-4 w-14 rounded-lg bg-sage-200/70" />
            <div className="h-4 w-20 rounded-lg bg-sage-200/70" />
            <div className="h-4 w-24 rounded-lg bg-sage-200/70" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [logoutSending, setLogoutSending] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setFetchError(null);

    getQuoteRequests()
      .then((result) => {
        if (!mounted) return;
        const { data, error } = result;
        if (error) {
          setFetchError(error?.message || "Failed to load quote requests.");
          setRequests([]);
        } else {
          const records = Array.isArray(data) ? data : [];
          setRequests(records);
        }
      })
      .catch((err) => {
        if (!mounted) return;
        setFetchError("An unexpected error occurred while loading data.");
        setRequests([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  const handleLogout = async () => {
    setLogoutSending(true);
    try {
      await logout();
      toast.success("Signed out successfully.");
      navigate("/login");
    } catch {
      toast.error("Failed to sign out.");
    } finally {
      setLogoutSending(false);
    }
  };

  const stats = useMemo(() => {
    const totalRequests = requests.length;
    const totalPieces = requests.reduce(
      (sum, r) => sum + (r.desired_total_pieces || 0), 0
    );
    const totalEstimated = requests.reduce(
      (sum, r) => sum + (Number(r.estimated_subtotal) || 0), 0
    );
    const avgValue = totalRequests > 0 ? totalEstimated / totalRequests : 0;
    return { totalRequests, totalPieces, totalEstimated, avgValue };
  }, [requests]);

  return (
    <>
      <SEO title="Admin Dashboard" description="Manage quote requests and review business metrics." />

      <Container className="py-12 sm:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-start justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-terra-50 to-cream-100 text-terra-500">
              <FileText className="h-6 w-6" />
            </span>
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-terra-500">
                <Sparkles className="h-3 w-3" />
                Management
              </span>
              <h1 className="mt-1 font-serif text-3xl font-bold text-sage-700 sm:text-4xl">
                Dashboard
              </h1>
              <p className="mt-0.5 text-sm text-sage-400">
                Quote requests &amp; business overview
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            disabled={logoutSending}
            className="shrink-0 gap-1.5 text-sage-400 hover:text-rose-400"
          >
            <LogOut className="h-4 w-4" />
            {logoutSending ? "Signing out..." : "Sign Out"}
          </Button>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {loading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-2xl bg-white/60 backdrop-blur-sm border border-sage-100/60 p-6"
                >
                  <div className="h-3 w-24 rounded-lg bg-sage-200/70" />
                  <div className="mt-3 h-8 w-20 rounded-lg bg-sage-200/70" />
                </div>
              ))}
            </>
          ) : (
            <>
              <AdminStatCard icon={Inbox} label="Total Requests" value={stats.totalRequests} index={0} />
              <AdminStatCard icon={Package} label="Total Pieces" value={stats.totalPieces} index={1} />
              <AdminStatCard icon={DollarSign} label="Total Estimated" value={`$${stats.totalEstimated.toFixed(2)}`} index={2} />
              <AdminStatCard icon={TrendingUp} label="Average Value" value={`$${stats.avgValue.toFixed(2)}`} index={3} />
            </>
          )}
        </motion.div>

        {/* Table section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-sage-700">
                Quote Requests
              </h2>
              <p className="mt-1 text-sm text-sage-400">
                {loading
                  ? "Loading..."
                  : `${requests.length} request${requests.length !== 1 ? "s" : ""} received`}
              </p>
            </div>
          </div>

          {loading ? (
            <TableSkeleton />
          ) : requests.length > 0 ? (
            <QuoteRequestsTable requests={requests} />
          ) : (
            <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-sage-100/60">
              <EmptyState
                icon={Inbox}
                title="No quote requests yet"
                description="When customers request quotes, they will appear here."
              />
            </div>
          )}

          {fetchError && (
            <div className="mt-4 rounded-xl bg-rose-50/80 px-5 py-3 text-sm text-rose-500 border border-rose-100/40">
              {fetchError}
            </div>
          )}
        </motion.div>
      </Container>
    </>
  );
}

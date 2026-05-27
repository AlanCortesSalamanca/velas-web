import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Package, DollarSign, TrendingUp, Inbox, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { getQuoteRequests } from "../services/quoteRequestsService";
import SEO from "../components/seo/SEO";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import AdminStatCard from "../components/admin/AdminStatCard";
import QuoteRequestsTable from "../components/admin/QuoteRequestsTable";
import EmptyState from "../components/admin/EmptyState";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function TableSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-sage-100 bg-white p-5 shadow-soft">
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-4">
            <div className="h-4 w-20 rounded bg-sage-200" />
            <div className="h-4 w-24 rounded bg-sage-200" />
            <div className="h-4 w-12 rounded bg-sage-200" />
            <div className="h-4 w-12 rounded bg-sage-200" />
            <div className="h-4 w-16 rounded bg-sage-200" />
            <div className="h-4 w-20 rounded bg-sage-200" />
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
  const [logoutSending, setLogoutSending] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getQuoteRequests()
      .then(({ data }) => {
        if (!mounted) return;
        setRequests(data || []);
        console.log("[AdminDashboard] Loaded", data?.length, "quote requests");
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
      (sum, r) => sum + (r.desired_total_pieces || 0),
      0
    );
    const totalEstimated = requests.reduce(
      (sum, r) => sum + (Number(r.estimated_subtotal) || 0),
      0
    );
    const avgValue = totalRequests > 0 ? totalEstimated / totalRequests : 0;
    return { totalRequests, totalPieces, totalEstimated, avgValue };
  }, [requests]);

  return (
    <>
      <SEO title="Admin Dashboard" description="Manage quote requests and review business metrics." />

      <Container className="py-10 sm:py-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-start justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
              <FileText className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-serif text-3xl font-bold text-sage-800 sm:text-4xl">
                Dashboard
              </h1>
              <p className="mt-0.5 text-sm text-sage-500">
                Quote requests &amp; business overview
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            disabled={logoutSending}
            className="shrink-0 gap-1.5"
          >
            <LogOut className="h-4 w-4" />
            {logoutSending ? "Signing out..." : "Sign Out"}
          </Button>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {loading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-xl border border-sage-100 bg-white p-5 shadow-soft"
                >
                  <div className="h-3 w-20 rounded bg-sage-200" />
                  <div className="mt-3 h-7 w-16 rounded bg-sage-200" />
                </div>
              ))}
            </>
          ) : (
            <>
              <AdminStatCard
                icon={Inbox}
                label="Total Requests"
                value={stats.totalRequests}
                index={0}
              />
              <AdminStatCard
                icon={Package}
                label="Total Pieces"
                value={stats.totalPieces}
                index={1}
              />
              <AdminStatCard
                icon={DollarSign}
                label="Total Estimated"
                value={`$${stats.totalEstimated.toFixed(2)}`}
                index={2}
              />
              <AdminStatCard
                icon={TrendingUp}
                label="Average Value"
                value={`$${stats.avgValue.toFixed(2)}`}
                index={3}
              />
            </>
          )}
        </motion.div>

        {/* Table section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-10"
        >
          <h2 className="font-serif text-xl font-bold text-sage-800">
            Quote Requests
          </h2>
          <p className="mt-1 text-sm text-sage-500">
            {loading
              ? "Loading..."
              : `${requests.length} request${requests.length !== 1 ? "s" : ""} received`}
          </p>

          <div className="mt-5">
            {loading ? (
              <TableSkeleton />
            ) : requests.length > 0 ? (
              <QuoteRequestsTable requests={requests} />
            ) : (
              <div className="rounded-xl border border-sage-100 bg-white shadow-soft">
                <EmptyState
                  icon={Inbox}
                  title="No quote requests yet"
                  description="When customers request quotes, they will appear here."
                />
              </div>
            )}
          </div>
        </motion.div>
      </Container>
    </>
  );
}

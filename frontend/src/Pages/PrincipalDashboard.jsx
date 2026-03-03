import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  CheckCircle,
  TrendingUp,
  Calendar,
  LogOut,
} from "lucide-react";

const PrincipalDashboard = () => {
  const navigate = useNavigate();
  // Parse user once at the start
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [complaints, setComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [reply, setReply] = useState({});

  // 🔹 Robust Fetch Function
  const fetchComplaints = async () => {
    try {
      // Check for token in two possible places
      const token = localStorage.getItem("token") || user?.token;

      if (!token) {
        console.error("No token found for Principal");
        navigate("/principal-login");
        return;
      }

      const res = await axios.get("http://localhost:5000/api/complaints", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setComplaints(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ API ERROR:", err.response?.data || err.message);
      // If unauthorized, redirect to login
      if (err.response?.status === 401) {
        navigate("/principal-login");
      }
    }
  };

  useEffect(() => {
    if (!user || user.role !== "principal") {
      navigate("/principal-login");
      return;
    }
    fetchComplaints();
  }, []);

  // 🔹 Update status
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token") || user?.token;
      await axios.put(
        `http://localhost:5000/api/complaints/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchComplaints();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  // 🔹 Send reply
  const handleReply = async (id) => {
    if (!reply[id] || reply[id].trim() === "") return alert("Please type a reply first");
    
    try {
      const token = localStorage.getItem("token") || user?.token;
      await axios.put(
        `http://localhost:5000/api/complaints/${id}/reply`,
        { reply: reply[id] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert("Reply sent successfully!");
      setReply({ ...reply, [id]: "" }); // Clear text area
      fetchComplaints(); // Refresh list
    } catch (err) {
      console.error("Failed to send reply", err);
    }
  };

  // 🔹 Filters logic
  const filteredComplaints = complaints.filter(
    (c) =>
      (statusFilter === "All" || c.status === statusFilter) &&
      (categoryFilter === "All" || c.category === categoryFilter)
  );

  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "Pending").length,
    inProgress: complaints.filter((c) => c.status === "In Progress").length,
    resolved: complaints.filter((c) => c.status === "Resolved").length,
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10 backdrop-blur-xl bg-white/10 p-6 rounded-3xl shadow-xl border border-white/20">
        <div>
          <h1 className="text-3xl font-bold">Principal Dashboard</h1>
          <p className="text-sm text-white/70">Welcome, {user?.name}</p>
        </div>
        <button
          onClick={() => {
            localStorage.clear(); // Clear all to avoid role confusion
            navigate("/principal-login");
          }}
          className="flex items-center gap-2 px-6 py-2 rounded-full bg-red-500/20 hover:bg-red-500/40 border border-red-400/30 transition"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <GlassStat title="Total" value={stats.total} icon={<Calendar />} />
        <GlassStat title="Pending" value={stats.pending} icon={<Clock />} />
        <GlassStat title="In Progress" value={stats.inProgress} icon={<TrendingUp />} />
        <GlassStat title="Resolved" value={stats.resolved} icon={<CheckCircle />} />
      </div>

      {/* FILTERS */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 rounded-3xl mb-8 shadow-xl">
        <h2 className="font-semibold mb-4">Filters</h2>
        <div className="flex gap-2 flex-wrap mb-4">
          {["All", "Pending", "In Progress", "Resolved"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-5 py-2 rounded-full transition ${statusFilter === s ? "bg-indigo-500" : "bg-white/10 hover:bg-white/20"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* COMPLAINTS LIST */}
      <div className="space-y-6">
        {filteredComplaints.length === 0 ? (
           <p className="text-center py-10 text-white/50 italic">No complaints found matching filters.</p>
        ) : (
          filteredComplaints.map((c) => (
            <div key={c.id} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <span className={`px-4 py-1 rounded-full text-sm ${getStatusGlass(c.status)}`}>{c.status}</span>
                  <span className="px-4 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm">{c.category}</span>
                </div>
                <span className="text-xs text-white/40">{new Date(c.created_at).toLocaleDateString()}</span>
              </div>

                <h3 className="text-xl font-semibold mb-1">{c.title}</h3>
                <p className="text-sm text-indigo-300 mb-3">Student: {c.student_name || "Unknown Student"}</p>
                <p className="text-sm text-indigo-300 mb-3">roll_no: {c.roll_no || "Unknown Student"} || Year:{c.year||"Unknown year"}</p>
                <p className="text-sm text-indigo-300 mb-3">Department: {c.student_department || "Unknown Department"}</p>
                <p className="text-white/80 mb-6">1{c.description}</p>

              {/* ACTION: UPDATE STATUS */}
              <div className="flex gap-2 mb-6">
                {["Pending", "In Progress", "Resolved"].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(c.id, s)}
                    className={`px-3 py-1 text-xs rounded-lg transition ${c.status === s ? "bg-white text-black" : "bg-white/5 hover:bg-white/20"}`}
                  >
                    Set {s}
                  </button>
                ))}
              </div>

              {/* ACTION: REPLY */}
              <div className="space-y-3">
                <textarea
                  placeholder="Type your official reply here..."
                  className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none focus:border-indigo-500 transition"
                  value={reply[c.id] || ""}
                  onChange={(e) => setReply({ ...reply, [c.id]: e.target.value })}
                />
                <button
                  onClick={() => handleReply(c.id)}
                  className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-medium"
                >
                  Submit Official Reply
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

/* --- SUBCOMPONENTS --- */
const GlassStat = ({ title, value, icon }) => (
  <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 flex justify-between items-center">
    <div>
      <p className="text-sm text-white/70">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
    <div className="text-white/40">{icon}</div>
  </div>
);

const getStatusGlass = (status) => {
  if (status === "Pending") return "bg-orange-500/30 text-orange-300";
  if (status === "In Progress") return "bg-blue-500/30 text-blue-300";
  if (status === "Resolved") return "bg-green-500/30 text-green-300";
  return "bg-white/10";
};

export default PrincipalDashboard;
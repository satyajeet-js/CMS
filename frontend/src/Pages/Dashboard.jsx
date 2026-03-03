import React, { useEffect, useState } from "react";
import { Calendar, Clock, AlertCircle, CheckCircle, LogOut, Plus, UserCircle, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ComplaintModal from "./ComplaintModal.jsx";

// Reusable Input Component for the Modal
const Input = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label className="text-sm text-neutral-400 block mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full p-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
    />
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  /* --- EDIT PROFILE STATE --- */
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  const [editData, setEditData] = useState({
    roll_no: user?.roll_no || "",
    phone: user?.phone || "",
    year: user?.year || "",
    department: user?.department || "",
  });

  const studentName = user?.name || "Student";

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await axios.get("http://localhost:5000/api/complaints/student", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ API ERROR:", err);
      if (err.response?.status === 401) navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  /* --- UPDATE PROFILE LOGIC --- */
 const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      "http://localhost:5000/api/students/update",
      editData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    // Use res.data directly (it contains the fresh info from DB)
    const updatedUser = { ...user, ...res.data };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    alert("Profile updated successfully!");
    setIsEditOpen(false);
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Failed to update profile.");
  }
};
  const filteredComplaints = filter === "All" 
    ? complaints 
    : complaints.filter((c) => c.status === filter);

  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "Pending").length,
    inProgress: complaints.filter((c) => c.status === "In Progress").length,
    resolved: complaints.filter((c) => c.status === "Resolved").length,
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-30 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600/20 p-2 rounded-lg">
            <UserCircle className="text-indigo-500" size={32} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">{studentName}</h1>
            <button 
              onClick={() => setIsEditOpen(true)}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <Edit size={12} /> Edit Profile
            </button>
          </div>
        </div>
        
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors border border-red-500/20 text-sm">
          <LogOut size={18} /> Sign Out
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatBox label="Total" value={stats.total} icon={Calendar} color="text-white" />
          <StatBox label="Pending" value={stats.pending} icon={Clock} color="text-yellow-500" />
          <StatBox label="Active" value={stats.inProgress} icon={AlertCircle} color="text-blue-500" />
          <StatBox label="Resolved" value={stats.resolved} icon={CheckCircle} color="text-green-500" />
        </div>

        {/* CONTROLS */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-center bg-neutral-900/50 p-4 rounded-2xl border border-white/5">
          <div className="flex bg-black p-1 rounded-xl border border-white/10">
            {["All", "Pending", "In Progress", "Resolved"].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === t ? "bg-white text-black shadow-lg" : "text-neutral-400 hover:text-white"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/20">
            <Plus size={20} /> New Complaint
          </button>
        </div>

        {/* COMPLAINT LIST */}
        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <div className="py-20 text-center text-neutral-500 animate-pulse">Loading your records...</div>
          ) : filteredComplaints.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
              <AlertCircle size={48} className="mx-auto text-neutral-700 mb-4" />
              <p className="text-neutral-400 font-medium">No {filter !== "All" ? filter : ""} complaints found.</p>
            </div>
          ) : (
            filteredComplaints.map((c) => (
              <div key={c.id} className="group bg-neutral-900 border border-white/5 p-6 rounded-2xl hover:border-indigo-500/50 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">{c.category}</span>
                    <h3 className="text-xl font-bold mt-1 group-hover:text-indigo-300 transition-colors">{c.title}</h3>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
                <p className="text-neutral-400 leading-relaxed mb-4">{c.description}</p>
                
                {c.principal_reply && (
                  <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <p className="text-xs font-bold text-green-400 uppercase tracking-wider">Principal's Response:</p>
                    <p className="text-white mt-2 italic font-medium">"{c.principal_reply}"</p>
                  </div>
                )}

                <div className="pt-4 mt-4 border-t border-white/5 text-[10px] text-neutral-600 flex justify-between">
                  <span>ID: #{c.id}</span>
                  <span>{new Date(c.created_at).toLocaleString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* COMPLAINT MODAL */}
      {isModalOpen && (
        <ComplaintModal onClose={() => setIsModalOpen(false)} onSuccess={fetchComplaints} />
      )}

      {/* EDIT INFO MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50 p-4">
          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-6 text-white">Edit Your Information</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <Input 
                label="Roll No" 
                value={editData.roll_no}
                onChange={(e) => setEditData({ ...editData, roll_no: e.target.value })}
              />
              <Input 
                label="Department" 
                value={editData.department}
                onChange={(e) => setEditData({ ...editData, department: e.target.value })}
              />
              <Input 
                label="Phone" 
                value={editData.phone}
                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
              />
              <Input 
                label="Year" 
                value={editData.year}
                onChange={(e) => setEditData({ ...editData, year: e.target.value })}
              />
              
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="flex-1 px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg font-bold transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* --- MINI COMPONENTS --- */
const StatBox = ({ label, value, icon: Icon, color }) => (
  <div className="bg-neutral-900 border border-white/5 p-6 rounded-2xl flex items-center justify-between">
    <div>
      <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider">{label}</p>
      <p className={`text-3xl font-black mt-1 ${color}`}>{value}</p>
    </div>
    <div className="p-3 bg-white/5 rounded-xl"><Icon className="text-neutral-400" size={24} /></div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    "Pending": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    "In Progress": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "Resolved": "bg-green-500/10 text-green-500 border-green-500/20",
  };
  return <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${styles[status] || styles["Pending"]}`}>{status}</span>;
};

export default Dashboard;
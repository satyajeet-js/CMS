import axios from "axios";
import { useState } from "react";

const ComplaintModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "Academic",
    description: "",
    status: "Pending",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");      
  const [messageType, setMessageType] = useState(""); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    // 1. Validation
    if (!formData.title || !formData.description) {
      setMessage("Please fill all required fields.");
      setMessageType("error");
      return;
    }

    // 2. Token Check
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Session expired. Please log in again.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      setMessage(""); // Clear previous errors

      // 3. API Call
      await axios.post("http://localhost:5000/api/complaints", formData, {
        headers: {
          // Ensure there are no extra spaces or quotes around the token
          Authorization: `Bearer ${token.replace(/"/g, '')}`,
        },
      });

      setMessage("Complaint submitted successfully!");
      setMessageType("success");

      // Small delay so user can read the success message
      setTimeout(() => {
        onSuccess(); // Refresh the list
        onClose();   // Close modal
      }, 1500);

    } catch (error) {
      console.error("TOKEN ERROR DETAILS 👉", error.response?.data);
      
      // If backend says "Invalid Token", it's likely expired
      const serverError = error.response?.data?.message || error.response?.data?.error;
      setMessage(serverError === "Invalid token" ? "Your session is invalid. Please re-login." : "Error submitting complaint.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl z-10 overflow-hidden">
        
        <div className="px-8 py-5 border-b bg-gray-50">
          <h2 className="text-2xl font-bold text-black">Submit New Complaint</h2>
        </div>

        <div className="px-8 py-6 text-black space-y-4">
          {message && (
            <div className={`p-3 rounded-xl text-white text-center font-medium ${messageType === "success" ? "bg-green-500" : "bg-red-500"}`}>
              {message}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-600 ml-1">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Brief title of the issue"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-600 ml-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none bg-white"
            >
              <option>Academic</option>
              <option>Hostel</option>
              <option>Faculty</option>
              <option>Infrastructure</option>
              <option>Other</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-600 ml-1">Description</label>
            <textarea
              rows="4"
              name="description"
              placeholder="Provide more details..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
            />
          </div>
        </div>

        <div className="px-8 py-5 flex justify-end gap-3 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-6 py-2 bg-black text-white rounded-xl flex items-center gap-2 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Submit Complaint"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintModal;
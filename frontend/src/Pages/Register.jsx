import React, { useState } from "react";
import axios from "axios";
import {
  UserRound,
  MailCheck,
  PhoneCall,
  LockKeyhole,
  GraduationCap,
  Hash,
  CalendarDays,
  Loader2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    rollNo: "",
    department: "",
    year: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    // 🔥 SEND ONLY WHAT BACKEND EXPECTS
    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      roll_no: form.rollNo,
      department: form.department,
      year: form.year,
      phone: form.phone, // optional if your backend accepts
    };

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/auth/register", payload);
      alert("Registration Successful 🎉");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 px-4">
      <div className="w-full max-w-2xl backdrop-blur-xl bg-white/80 rounded-3xl shadow-2xl p-10 border border-white/40">

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white mb-4 shadow-lg">
            <GraduationCap size={30} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Student Registration
          </h2>
          <p className="text-gray-500 mt-1">
            Join the College Complaint Management System
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 text-red-600 bg-red-50 p-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <Input icon={UserRound} label="Full Name" name="name" value={form.name} onChange={handleChange} autocomplete="name" />
          <Input icon={MailCheck} type="email" label="Student Email" name="email" value={form.email} onChange={handleChange} autocomplete="email" />
          <Input icon={Hash} label="Roll Number" name="rollNo" value={form.rollNo} onChange={handleChange} autocomplete="username" />
          <Input icon={GraduationCap} label="Department" name="department" value={form.department} onChange={handleChange} autocomplete="organization" />

          {/* YEAR */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-indigo-100 p-2 rounded-lg">
              <CalendarDays className="text-indigo-600" size={18} />
            </div>
            <select
              name="year"
              value={form.year}
              onChange={handleChange}
              required
              className="w-full pl-14 pr-4 py-3 rounded-xl border bg-white focus:ring-2 ring-indigo-500 outline-none"
              autocomplete="year"
            >
              <option value="">Select Year</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>
          </div>

          <Input icon={PhoneCall} label="Phone Number" name="phone" value={form.phone} onChange={handleChange} autocomplete="tel" />

          <Input icon={LockKeyhole} type="password" label="Password" name="password" value={form.password} onChange={handleChange} autocomplete="new-password" />
          <Input icon={LockKeyhole} type="password" label="Confirm Password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} autocomplete="new-password" />

          <div className="md:col-span-2 pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-2xl font-semibold shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?
          <Link to="/login" className="text-indigo-600 ml-1 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
const Input = ({ icon: Icon, label, autoComplete, ...props }) => (
  <div className="relative">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-indigo-100 p-2 rounded-lg">
      <Icon className="text-indigo-600" size={18} />
    </div>
    <input
      {...props}
      required
      autoComplete={autoComplete} // ✅ camelCase
      placeholder={label}
      className="w-full pl-14 pr-4 py-3 rounded-xl border bg-white outline-none focus:ring-2 ring-indigo-500"
    />
  </div>
);
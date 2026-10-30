import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const API_URL = import.meta.env.VITE_API_URL;

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setStatus(data.message || "Login failed.");
        setLoading(false);
        return;
      }

      // Save JWT Token
      localStorage.setItem("adminToken", data.token);

      // Go to Dashboard
      navigate("/admin/dashboard");

    } catch (error) {
      console.error("Login Error:", error);
      setStatus("Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-logo">
          VK<span>.</span>
        </div>

        <p className="admin-small-title">
          PRIVATE ADMIN
        </p>

        <h1>Welcome Back</h1>

        <p className="admin-login-description">
          Login to manage your portfolio contact connections.
        </p>

        <form
          className="admin-login-form"
          onSubmit={handleSubmit}
        >

          <div className="admin-input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter admin email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {status && (
            <p className="admin-error">
              {status}
            </p>
          )}

          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <button
          className="back-portfolio-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Portfolio
        </button>

      </div>

    </div>
  );
}

export default AdminLogin;
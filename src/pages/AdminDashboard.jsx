import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================
  // Get Contacts
  // ============================

  useEffect(() => {
    const fetchContacts = async () => {
      const token = localStorage.getItem("adminToken");

      // Token nahi hai to login page
      if (!token) {
        navigate("/admin/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/contacts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        // Invalid / expired token
        if (response.status === 401) {
          localStorage.removeItem("adminToken");
          navigate("/admin/login");
          return;
        }

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to fetch contacts."
          );
        }

        setContacts(data.contacts || []);

      } catch (error) {
        console.error("Fetch Contacts Error:", error);

        setError(
          error.message || "Unable to load contacts."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();

  }, [navigate]);


  // ============================
  // Logout
  // ============================

  const handleLogout = () => {
    localStorage.removeItem("adminToken");

    navigate("/admin/login");
  };


  // ============================
  // Format Date & Time
  // ============================

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };


  return (
    <div className="admin-dashboard">

      {/* =========================
          Sidebar
      ========================== */}

      <aside className="admin-sidebar">

        <div>

          <div className="sidebar-logo">
            VK<span>.</span>
          </div>

          <p className="sidebar-title">
            ADMIN PANEL
          </p>

          <nav className="admin-nav">

            <button className="admin-nav-item active">
              Dashboard
            </button>

            <button className="admin-nav-item">
              Contact Connections
            </button>

          </nav>

        </div>


        <button
          className="admin-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </aside>


      {/* =========================
          Main Content
      ========================== */}

      <main className="admin-main">

        <div className="admin-topbar">

          <div>
            <p className="admin-page-small">
              PORTFOLIO ADMIN
            </p>

            <h1>Contact Connections</h1>

            <p>
              Messages received from your portfolio contact form.
            </p>
          </div>


          <button
            className="mobile-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>


        {/* =========================
            Stats
        ========================== */}

        <div className="admin-stats">

          <div className="admin-stat-card">

            <div className="stat-icon">
              ✉
            </div>

            <div>
              <p>Total Messages</p>

              <h2>{contacts.length}</h2>
            </div>

          </div>

        </div>


        {/* =========================
            Contacts
        ========================== */}

        <section className="admin-contacts-section">

          <div className="contacts-heading">

            <div>
              <h2>Recent Connections</h2>

              <p>
                Your latest portfolio enquiries.
              </p>
            </div>

            <span>
              {contacts.length} Messages
            </span>

          </div>


          {/* Loading */}

          {loading && (
            <div className="admin-message">
              Loading contacts...
            </div>
          )}


          {/* Error */}

          {!loading && error && (
            <div className="admin-message error">
              {error}
            </div>
          )}


          {/* Empty Database */}

          {!loading &&
            !error &&
            contacts.length === 0 && (

              <div className="admin-empty">

                <div>📭</div>

                <h3>No Messages Yet</h3>

                <p>
                  Contact form messages will appear here.
                </p>

              </div>

            )}


          {/* Contact Cards */}

          {!loading &&
            !error &&
            contacts.length > 0 && (

              <div className="admin-contact-list">

                {contacts.map((contact) => (

                  <div
                    className="admin-contact-card"
                    key={contact._id}
                  >

                    <div className="contact-card-top">

                      <div className="contact-user">

                        <div className="contact-avatar">
                          {contact.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>

                          <h3>
                            {contact.name}
                          </h3>

                          <a
                            href={`mailto:${contact.email}`}
                          >
                            {contact.email}
                          </a>

                        </div>

                      </div>


                      <span className="contact-date">
                        {formatDate(contact.createdAt)}
                      </span>

                    </div>


                    <div className="contact-message">

                      <p>
                        {contact.message}
                      </p>

                    </div>


                    <div className="contact-card-bottom">

                      <span>
                        Received via Portfolio
                      </span>

                      <a
                        href={`mailto:${contact.email}`}
                        className="reply-btn"
                      >
                        Reply
                      </a>

                    </div>

                  </div>

                ))}

              </div>

            )}

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;
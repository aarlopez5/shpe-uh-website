/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import shpeHoriztonalLogo from "../assets/logos/shpeHorizontalLogo.png";
import { useAuth } from "../context/AuthContext";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "MemberSHPE", to: "/membershpe" },
  { label: "Our Sponsors", to: "/sponsors" },
  { label: "Gallery", to: "/gallery" },
];

function NavItem({ to, children }) {
  return (
    <NavLink to={to} className="navLink">
      {({ isActive }) => (
        <span className={`navLinkInner ${isActive ? "active" : ""}`}>
          {children}
          {isActive && (
            <motion.span
              className="underline"
              layoutId="nav-underline"
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </span>
      )}
    </NavLink>
  );
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  function handleSignOut() {
    logout();
    navigate("/");
  }

  return (
    <header className="header">
      <div className="headerRow">
        <div className="brand">
          <div className="brandMark">
            <img src={shpeHoriztonalLogo} alt="SHPE LOGO" />
          </div>
        </div>

        <button
          type="button"
          className="mobileMenuBtn"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          Menu
        </button>

        <nav className="nav">
          {links.map((l) => (
            <NavItem key={l.to} to={l.to}>
              {l.label}
            </NavItem>
          ))}
          {user && (
            <>
              <NavItem to="/dashboard">Dashboard</NavItem>
              <NavItem to="/committees">Committees</NavItem>
            </>
          )}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "8px" }}>
              <span style={{ fontWeight: 600, color: "var(--blue)", fontSize: "14px" }}>
                Hi, {user.first_name}
              </span>
              <button className="ghostBtn" onClick={handleSignOut} style={{ fontSize: "14px", padding: "6px 14px" }}>
                Sign Out
              </button>
            </div>
          ) : (
            <button
              className="primaryBtn"
              onClick={() => navigate("/signin")}
              style={{ marginLeft: "8px", fontSize: "14px", padding: "6px 16px" }}
            >
              Sign In
            </button>
          )}
        </nav>
      </div>

      <nav
        id="mobile-nav-panel"
        className={`mobileNavPanel ${isMobileMenuOpen ? "open" : ""}`}
      >
        <div className="mobileNavGrid">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className="mobileNavLink">
              {({ isActive }) => (
                <span className={`mobileNavLinkInner ${isActive ? "active" : ""}`}>
                  {l.label}
                </span>
              )}
            </NavLink>
          ))}
          {user && (
            <>
              <NavLink to="/dashboard" className="mobileNavLink">
                {({ isActive }) => (
                  <span className={`mobileNavLinkInner ${isActive ? "active" : ""}`}>Dashboard</span>
                )}
              </NavLink>
              <NavLink to="/committees" className="mobileNavLink">
                {({ isActive }) => (
                  <span className={`mobileNavLinkInner ${isActive ? "active" : ""}`}>Committees</span>
                )}
              </NavLink>
            </>
          )}
          {user ? (
            <button
              className="mobileNavLink"
              onClick={handleSignOut}
              style={{ textAlign: "left", background: "none", border: "none", cursor: "pointer", width: "100%" }}
            >
              <span className="mobileNavLinkInner">Sign Out</span>
            </button>
          ) : (
            <NavLink to="/signin" className="mobileNavLink">
              {({ isActive }) => (
                <span className={`mobileNavLinkInner ${isActive ? "active" : ""}`}>
                  Sign In
                </span>
              )}
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}

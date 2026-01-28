/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Get Involved", to: "/get-involved" },
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
          {
          <motion.span
            className="underline"
            layoutId="nav-underline"
            initial={false}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
          }
        </span>
      )}
    </NavLink>
  );
}

export default function Header() {
  return (
    <header className="header">
      <div className="headerRow">
        <div className="brand">
          <div className="brandMark" aria-hidden />
          <div className="brandText">
            <div className="brandTop">SHPE</div>
            <div className="brandSub">University of Houston</div>
          </div>
        </div>

        <nav className="nav">
          {links.map((l) => (
            <NavItem key={l.to} to={l.to}>
              {l.label}
            </NavItem>
          ))}
        </nav>
      </div>
    </header>
  );
}

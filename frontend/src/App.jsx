import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/Footer";

import Home from "./pages/home";
import About from "./pages/about";
import GetInvolved from "./pages/get-involved";
import MemberSHPE from "./pages/membershpe";
import Sponsors from "./pages/sponsors";
import Gallery from "./pages/gallery";

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/membershpe" element={<MemberSHPE />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/gallery" element={<Gallery />} />
            {/* Redirect old /pages/ routes */}
            <Route path="/pages/about" element={<Navigate to="/about" replace />} />
            <Route path="/pages/get-involved" element={<Navigate to="/get-involved" replace />} />
            <Route path="/pages/membershpe" element={<Navigate to="/membershpe" replace />} />
            <Route path="/pages/sponsors" element={<Navigate to="/sponsors" replace />} />
            <Route path="/pages/gallery" element={<Navigate to="/gallery" replace />} />
          </Routes>
      </main>
      <Footer />
    </div>
  );
}

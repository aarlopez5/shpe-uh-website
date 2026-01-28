import { FaFacebookF, FaXTwitter, FaTiktok, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const socials = [
  { icon: <FaFacebookF />, label: "Facebook" },
  { icon: <FaXTwitter />, label: "X" },
  { icon: <FaTiktok />, label: "TikTok" },
  { icon: <FaInstagram />, label: "Instagram" },
  { icon: <FaLinkedinIn />, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerInner">
        <div className="footerLeft">
          <div className="footerLogo">
            <div className="footerMark" aria-hidden />
            <div>
              <div className="footerTitle">SHPE</div>
              <div className="footerTag">Leading Hispanics in STEM</div>
            </div>
          </div>

          <div className="divider" />

          <div className="footerUH">University of Houston</div>

          <div className="footerContact">
            <div>chapter@shpeuh.org</div>
            <div>@shpe_uh</div>
            <div>linktr.ee/SHPEUH</div>
          </div>
        </div>

        <div className="footerRight">
          <div className="footerFollow">Follow us on Social Media</div>
          <div className="socialRow">
            {socials.map((s) => (
              <motion.button
                key={s.label}
                className="socialBtn"
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                aria-label={s.label}
              >
                {s.icon}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

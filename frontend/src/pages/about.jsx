/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section className="page" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <h2>About</h2>
      <p>Mission, story, and what SHPE UH does.</p>
    </motion.section>
  );
}

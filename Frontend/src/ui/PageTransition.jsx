import { motion } from "framer-motion";

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -15, filter: "blur(6px)" }}
      transition={{
        duration: 0.35,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
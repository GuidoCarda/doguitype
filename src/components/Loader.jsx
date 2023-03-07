import { motion } from "framer-motion";
import { BsFillKeyboardFill } from "react-icons/bs";

const Loader = () => {
  return (
    <motion.h2
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ repeat: Infinity, duration: 1 }}
    >
      <BsFillKeyboardFill className="loader-icon" />
    </motion.h2>
  );
};

export default Loader;

import { motion } from "framer-motion";
import { BsFillKeyboardFill } from "react-icons/bs";

const loaderVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Loader = () => {
  return (
    <motion.h2
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ repeat: Infinity, duration: 1 }}
      variants={loaderVariants}
    >
      <BsFillKeyboardFill className="loader-icon" />
    </motion.h2>
  );
};

export default Loader;

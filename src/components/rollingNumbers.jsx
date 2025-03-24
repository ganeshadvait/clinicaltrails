import { motion } from "framer-motion";

const RollingDigit = ({ targetDigit, duration }) => {
  const rollingNumbers = [targetDigit, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(
    String
  );

  return (
    <div className="relative h-8 w-3 overflow-hidden text-center">
      <motion.div
        key={targetDigit} // Re-renders when digit changes
        initial={{ y: "-100%" }} // Start above
        animate={{ y: "0%" }} // Move down
        transition={{ duration, ease: "easeInOut" }}
        className="flex flex-col"
      >
        {rollingNumbers.map((num, index) => (
          <div
            key={index}
            className="flex h-8 items-center justify-center font-bold"
          >
            {num}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const RollingNumber = ({ number, duration = 1 }) => {
  const digits = String(number).split("");

  return (
    <div className="flex rounded-lg text-black">
      {digits.map((digit, index) => (
        <RollingDigit
          key={index}
          targetDigit={digit}
          duration={duration * index}
        />
      ))}
    </div>
  );
};

export default RollingNumber;

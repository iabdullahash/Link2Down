import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Hamburger({ isOpen, setIsOpen }) {
  const topVariants = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    open: {
      rotate: 45,
      translateY: 10,
    },
  };
  const centerVariants = {
    closed: {
      opacity: 1,
    },
    open: {
      opacity: 0,
    },
  };
  const bottomVariants = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    open: {
      rotate: -45,
      translateY: -10,
    },
  };

  return (
    <button
      className="relative w-10 h-6"
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Toggle Menu"
    >
      <AnimatePresence>
        <motion.span
          className="absolute top-0 left-0 w-full h-1 bg-bg rounded-full"
          initial={false}
          key="1"
          animate={isOpen ? "open" : "closed"}
          variants={topVariants}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        />
        <motion.span
          className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-1 bg-bg rounded-full"
          initial={false}
          key="2"
          animate={isOpen ? "open" : "closed"}
          variants={centerVariants}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        />
        <motion.span
          className="absolute bottom-0 left-0 w-full h-1 bg-bg rounded-full"
          initial={false}
          key="3"
          animate={isOpen ? "open" : "closed"}
          variants={bottomVariants}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        />
      </AnimatePresence>
    </button>
  );
}

export default Hamburger;

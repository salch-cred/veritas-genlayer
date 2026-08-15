import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HugeiconsIcon } from "@hugeicons/react";
import { Layers01Icon, Shield01Icon, Tick01Icon } from "@hugeicons/core-free-icons";

export default function Landing() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  const floatingVariants: any = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };

  return (
    <div className="landing-page">
      <motion.div 
        className="hero-section"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="hero-badge clay-badge" 
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div variants={floatingVariants} animate="animate" style={{ display: 'flex', alignItems: 'center' }}>
            <HugeiconsIcon icon={Layers01Icon} size={16} style={{ marginRight: '6px' }} />
          </motion.div>
          <span>GenLayer Hackathon 2026</span>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants} 
          className="hero-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        >
          The Decentralized <br/> Court of Truth
        </motion.h1>
        
        <motion.p 
          variants={itemVariants} 
          className="hero-subtitle"
        >
          An autonomous, web-aware fact-checking network powered by GenLayer's Equivalence Principle. Stake $GEN to adjudicate claims instantly with decentralized AI.
        </motion.p>
        
        <motion.div variants={itemVariants} className="hero-actions">
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Link to="/app" className="button button-lg clay-btn">
              Launch App
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <a href="https://github.com/salch-cred/veritas-genlayer" target="_blank" rel="noreferrer" className="button outline button-lg clay-btn-outline">
              View on GitHub
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="features-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div 
          className="feature-card clay-card" 
          variants={itemVariants}
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <motion.div 
            className="feature-icon"
            whileHover={{ rotate: 10, scale: 1.1 }}
          >
            <HugeiconsIcon icon={Shield01Icon} size={28} />
          </motion.div>
          <h3>Optimistic Democracy</h3>
          <p>Validators run independent LLM inference to establish objective truth.</p>
        </motion.div>
        
        <motion.div 
          className="feature-card clay-card" 
          variants={itemVariants}
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <motion.div 
            className="feature-icon"
            whileHover={{ rotate: -10, scale: 1.1 }}
          >
            <HugeiconsIcon icon={Layers01Icon} size={28} />
          </motion.div>
          <h3>Web-Aware Contracts</h3>
          <p>Smart contracts that can natively read the live internet to verify claims.</p>
        </motion.div>
        
        <motion.div 
          className="feature-card clay-card" 
          variants={itemVariants}
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <motion.div 
            className="feature-icon"
            whileHover={{ rotate: 15, scale: 1.1 }}
          >
            <HugeiconsIcon icon={Tick01Icon} size={28} />
          </motion.div>
          <h3>Immutable Ledger</h3>
          <p>Once a consensus is reached, the truth is permanently anchored on GenLayer.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

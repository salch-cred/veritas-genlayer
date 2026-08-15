import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HugeiconsIcon } from "@hugeicons/react";
import { Layers01Icon, Shield01Icon, Tick01Icon } from "@hugeicons/core-free-icons";

export default function Landing() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 20 }
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
        <motion.div className="hero-badge clay-badge" variants={itemVariants}>
          <HugeiconsIcon icon={Layers01Icon} size={16} />
          <span>GenLayer Hackathon 2026</span>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="hero-title">
          The Decentralized <br/> Court of Truth
        </motion.h1>
        
        <motion.p variants={itemVariants} className="hero-subtitle">
          An autonomous, web-aware fact-checking network powered by GenLayer's Equivalence Principle. Stake $GEN to adjudicate claims instantly with decentralized AI.
        </motion.p>
        
        <motion.div variants={itemVariants} className="hero-actions">
          <Link to="/app" className="button button-lg clay-btn">
            Launch App
          </Link>
          <a href="https://github.com/salch-cred/veritas-genlayer" target="_blank" rel="noreferrer" className="button outline button-lg clay-btn-outline">
            View on GitHub
          </a>
        </motion.div>
      </motion.div>

      <motion.div 
        className="features-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <motion.div className="feature-card clay-card" variants={itemVariants}>
          <div className="feature-icon"><HugeiconsIcon icon={Shield01Icon} size={28} /></div>
          <h3>Optimistic Democracy</h3>
          <p>Validators run independent LLM inference to establish objective truth.</p>
        </motion.div>
        <motion.div className="feature-card clay-card" variants={itemVariants}>
          <div className="feature-icon"><HugeiconsIcon icon={Layers01Icon} size={28} /></div>
          <h3>Web-Aware Contracts</h3>
          <p>Smart contracts that can natively read the live internet to verify claims.</p>
        </motion.div>
        <motion.div className="feature-card clay-card" variants={itemVariants}>
          <div className="feature-icon"><HugeiconsIcon icon={Tick01Icon} size={28} /></div>
          <h3>Immutable Ledger</h3>
          <p>Once a consensus is reached, the truth is permanently anchored on GenLayer.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

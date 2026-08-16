import { motion } from 'framer-motion';

export default function Docs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="docs-page dashboard-grid">
      <motion.aside 
        className="docs-sidebar clay-card"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h3>Documentation</h3>
        <nav className="docs-nav">
          <a href="#introduction">Introduction</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#staking">Staking $GEN</a>
          <a href="#consensus">Consensus Mechanism</a>
        </nav>
      </motion.aside>

      <motion.div 
        className="docs-content clay-card"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.section id="introduction" variants={itemVariants}>
          <h2>Introduction to Veritas</h2>
          <p>
            Veritas is a decentralized oracle and fact-checking network built on GenLayer. 
            Traditional blockchains cannot natively access the internet. GenLayer introduces 
            <strong>Intelligent Contracts</strong> that use LLM validators to achieve consensus 
            on subjective or external data.
          </p>
        </motion.section>

        <motion.section id="how-it-works" variants={itemVariants}>
          <h2>How It Works</h2>
          <p>
            When a user submits a claim along with a reference URL, the Veritas smart contract 
            executes an async request to GenLayer's decentralized validator network.
          </p>
          <ol>
            <li>The contract scrapes the content of the provided URL.</li>
            <li>It formats a prompt asking if the claim is supported by the URL content.</li>
            <li>Multiple validators run LLM inference on this prompt.</li>
            <li>The Equivalence Principle is applied to reach a consensus.</li>
          </ol>
        </motion.section>

        <motion.section id="staking" variants={itemVariants}>
          <h2>Staking $GEN</h2>
          <p>
            To prevent spam and incentivize honest claims, users must stake <strong>100 $GEN</strong> 
            when submitting a claim. If the network validates the claim as truthful, the stake is 
            returned along with a fractional reward. If the claim is demonstrably false, a portion 
            of the stake is slashed.
          </p>
        </motion.section>

        <motion.section id="consensus" variants={itemVariants}>
          <h2>Consensus Mechanism</h2>
          <p>
            Unlike traditional Byzantine Fault Tolerance (BFT) which requires exact byte-for-byte 
            matches, GenLayer uses the <strong>Equivalence Principle</strong>. If 13 out of 15 
            validators return semantically equivalent answers (e.g. "Yes, the article states X" vs "True, X is supported"), 
            consensus is achieved.
          </p>
        </motion.section>
      </motion.div>
    </div>
  );
}

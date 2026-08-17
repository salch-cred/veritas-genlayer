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
          <a href="#purchasing">Purchasing Policies</a>
          <a href="#consensus">AI Flight Verification</a>
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
            Veritas is a decentralized flight delay insurance network built on GenLayer. 
            Traditional blockchains cannot natively access the internet to check flight statuses. 
            GenLayer introduces <strong>Intelligent Contracts</strong> that use LLM validators to achieve consensus 
            on external data, such as flight tracking websites.
          </p>
        </motion.section>

        <motion.section id="how-it-works" variants={itemVariants}>
          <h2>How It Works</h2>
          <p>
            When a user purchases a policy and subsequently files a claim, the Veritas smart contract 
            executes an async request to GenLayer's decentralized validator network.
          </p>
          <ol>
            <li>The contract scrapes the content of flight tracking websites (e.g., FlightAware).</li>
            <li>It formats a prompt asking if the specific flight was delayed or cancelled.</li>
            <li>Multiple validators run LLM inference on this prompt.</li>
            <li>The Equivalence Principle is applied to reach a consensus and approve the claim.</li>
          </ol>
        </motion.section>

        <motion.section id="purchasing" variants={itemVariants}>
          <h2>Purchasing Policies</h2>
          <p>
            Users can purchase a policy by entering their flight number and departure date. This creates an 
            on-chain record. If the flight experiences a delay of more than 2 hours or is cancelled, the user 
            can file a claim to receive an instant automated payout.
          </p>
        </motion.section>

        <motion.section id="consensus" variants={itemVariants}>
          <h2>AI Flight Verification</h2>
          <p>
            Unlike traditional Byzantine Fault Tolerance (BFT) which requires exact byte-for-byte 
            matches from legacy oracles, GenLayer uses the <strong>Equivalence Principle</strong>. If the majority 
            of validators return semantically equivalent answers (e.g. "APPROVED" because the flight was delayed), 
            consensus is achieved and the payout is triggered autonomously.
          </p>
        </motion.section>
      </motion.div>
    </div>
  );
}

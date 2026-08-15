# Veritas

The Decentralized Court of Truth. 

An autonomous, web-aware fact-checking network powered by GenLayer's Equivalence Principle. Stake $GEN to adjudicate claims instantly with decentralized AI.

## Overview

Veritas allows users to submit controversial claims alongside reference URLs. Utilizing GenLayer's decentralized AI validators, the network scrapes the web, runs independent LLM inference, and anchors an objective consensus on an immutable ledger. 

## Architecture

- **Frontend Framework:** React 19 + Vite
- **Styling & Motion:** Vanilla CSS (Paper Craft x Claymorphism hybrid) + Framer Motion
- **Authentication:** Privy SDK (Embedded Wallets & Email Auth)
- **Web3 Integration:** Wagmi + Viem
- **Smart Contracts:** GenLayer SDK (`genlayer-js`)

## Getting Started

### Prerequisites
- Node.js (v20+)
- npm 

### Environment Variables
Create a `.env` file in the root directory and configure the following:
```env
VITE_PRIVY_APP_ID=your_privy_app_id
```

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

## Build & Deployment

Veritas is optimized for Vercel deployment. The build process utilizes strict TypeScript checking and Vite's production bundler.

```bash
# Run type checks and build for production
npm run build
```

*Note: If deploying to Vercel, ensure `.npmrc` is configured with `legacy-peer-deps=true` to resolve upstream Web3 peer dependency conflicts.*

## License

MIT

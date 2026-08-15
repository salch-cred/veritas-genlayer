# Veritas

The Decentralized Court of Truth. 

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB.svg?logo=react&logoColor=black)
![GenLayer](https://img.shields.io/badge/Powered_by-GenLayer-000000.svg)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000.svg?logo=vercel&logoColor=white)

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
Copy the `.env.example` file to create your local environment config:
```bash
cp .env.example .env
```
Ensure the following variables are configured in `.env`:
```env
VITE_PRIVY_APP_ID=your_privy_app_id
VITE_CONTRACT_ADDRESS=your_contract_address
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

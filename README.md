# Crypto Tracker

A real-time cryptocurrency price tracking application that displays market data for various digital assets.

## Setup Instructions

### Prerequisites
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later) or yarn (v1.22.0 or later)

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/Bazzin07/CRYPTO_TRACKER.git
   cd CRYPTO_TRACKER
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Build for production
   ```bash
   npm run build
   ```

## Tech Stack & Architecture

### Frontend
- **React**: UI component library
- **TypeScript**: Static type checking
- **Vite**: Build tool and development server
- **Redux/Redux Toolkit**: State management
- **React Router**: Navigation
- **Styled Components/TailwindCSS**: Styling

### Data & APIs
- Binance API for real-time cryptocurrency data
- WebSocket connections for live price updates
- REST API integration for historical data

### Architecture
- Component-based architecture following React best practices
- State management via Redux with slices for different data domains
- Custom hooks for API communication and data processing
- Responsive design for desktop and mobile views

## Features
- Real-time price tracking for cryptocurrencies
- Historical price data visualization
- Portfolio tracking
- Price alerts and notifications
- Market news integration

## License
MIT

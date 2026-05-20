import { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState({
    btcPrice: 0,
    ethPrice: 0,
    btcTrend: 0,
    ethTrend: 0,
    volatility: 'Calculating...'
  });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const btcRes = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT');
        const ethRes = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT');
        const btcData = await btcRes.json();
        const ethData = await ethRes.json();

        const btcVol = parseFloat(btcData.priceChangePercent);
        const ethVol = parseFloat(ethData.priceChangePercent);
        const avgVol = (Math.abs(btcVol) + Math.abs(ethVol)) / 2;
        let volatilityLabel = 'Normal';
        if (avgVol > 5) volatilityLabel = 'Extreme';
        else if (avgVol > 2) volatilityLabel = 'High';
        else if (avgVol < 1) volatilityLabel = 'Low';

        setData({
          btcPrice: parseFloat(btcData.lastPrice),
          ethPrice: parseFloat(ethData.lastPrice),
          btcTrend: btcVol,
          ethTrend: ethVol,
          volatility: volatilityLabel
        });
      } catch (error) {
        console.error('Error fetching live data:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <header className="animate-fade-in">
        <div className="logo outfit-font">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6C5DD3" />
                <stop offset="100%" stopColor="#ff6b6b" />
              </linearGradient>
            </defs>
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          CryptoFlow AI
        </div>
        <button className="glass-btn">Connect Wallet</button>
      </header>

      <main>
        <section className="hero animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h1>Predict the Next Move with <span>AI Precision</span></h1>
          <p>Advanced algorithmic trend analysis for Bitcoin, Ethereum, and major altcoins. Stop guessing, start trading with data.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
             <button className="glass-btn">Start Free Trial</button>
             <button className="glass-btn" style={{ background: 'transparent' }}>View Demo</button>
          </div>
        </section>

        <section className="dashboard-grid animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="glass-panel stat-card">
            <h3>Bitcoin (BTC)</h3>
            <div className="value">
              ${data.btcPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className={data.btcTrend > 0 ? 'trend-up' : 'trend-down'}>
                {data.btcTrend > 0 ? '▲' : '▼'} {Math.abs(data.btcTrend)}%
              </span>
            </div>
          </div>
          
          <div className="glass-panel stat-card">
            <h3>Ethereum (ETH)</h3>
            <div className="value">
              ${data.ethPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className={data.ethTrend > 0 ? 'trend-up' : 'trend-down'}>
                {data.ethTrend > 0 ? '▲' : '▼'} {Math.abs(data.ethTrend)}%
              </span>
            </div>
          </div>

          <div className="glass-panel stat-card">
            <h3>Market Volatility</h3>
            <div className="value">
              {data.volatility}
              <span className="trend-up" style={{ color: '#FFB800' }}>~</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>AI Confidence Score: 87%</p>
          </div>
        </section>

        <section className="glass-panel chart-container animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <h2>Live Trend Analysis</h2>
          <div className="placeholder">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="var(--glass-glow)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 1rem', display: 'block' }}>
              <path d="M3 3v18h18"></path>
              <path d="M18 17V9"></path>
              <path d="M13 17V5"></path>
              <path d="M8 17v-3"></path>
            </svg>
            <p>Premium Charting Module</p>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Unlock full AI predictive charts with a Pro subscription.</p>
            <button className="glass-btn" style={{ marginTop: '1.5rem', padding: '8px 20px', fontSize: '0.9rem' }}>Upgrade to Pro</button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

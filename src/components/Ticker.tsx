import { TICKER_ITEMS } from '@/lib/data';

export default function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span className="t-item" key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}

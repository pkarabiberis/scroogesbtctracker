import React from 'react';
import { getUserFriendlyText } from 'src/utils';

interface BitcoinDetailsProps {
  downwardTrend: number | null;
  highestVolume: { volume?: string; date?: string };
  buyDate?: string;
  sellDate?: string;
}

export const BitcoinDetails: React.FC<BitcoinDetailsProps> = ({
  downwardTrend,
  highestVolume,
  buyDate,
  sellDate,
}) => {
  return (
    <div className="btc-container">
      <div className="btc-downward-trend">
        <p>Downward trend</p>
        {downwardTrend === null ? null : (
          <h3>{getUserFriendlyText(downwardTrend)}</h3>
        )}
      </div>

      <div className="btc-highest-volume">
        <p>Highest volume</p>
        {highestVolume.date && (
          <h3>
            {highestVolume.volume}
            <br />
            on {highestVolume.date}
          </h3>
        )}
      </div>

      <div className="btc-buy-stock">
        <p>Buy</p>
        {buyDate && <h3>{buyDate}</h3>}
      </div>

      <div className="btc-sell-stock">
        <p>Sell</p>
        {sellDate && <h3>{sellDate}</h3>}
      </div>
    </div>
  );
};

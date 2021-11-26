import axios from 'axios';
import { useState } from 'react';
import './App.css';
import { DatePicker } from './components/DatePicker';
import { BASE_URL } from './constants';
import { Github } from './components/icons/Github';
import { BTCDailyValues, MarketRange } from './types';
import { getDate } from './utils';
import { BitcoinDetails } from './components/BitcoinDetails';

function App() {
  const [downwardTrend, setDownwardTrend] = useState<number | null>(null);
  const [highestVolume, setHighestVolume] = useState<{
    date: string;
    volume: string;
  } | null>(null);

  const [buyAndSellDays, setBuyAndSellDays] = useState<{
    buy?: string;
    sell?: string;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getBitcoinData = async (from: number, to: number) => {
    setLoading(true);
    setError(null);
    setDownwardTrend(null);
    setHighestVolume(null);
    setBuyAndSellDays(null);

    try {
      const { data } = await axios.get<MarketRange>(
        `${BASE_URL}from=${from}&to=${to + 3600}` // add one hour to end date
      );

      seperateDays(data.prices, data.total_volumes);
    } catch (err) {
      setLoading(false);
      setError(`An error occured. Please try again`);
    }
  };

  const seperateDays = (prices: Array<number[]>, volumes: Array<number[]>) => {
    // get the first values of each day for price and volume (as close to midnight as possible)
    // and use that as day's price/volume
    const dayValues = prices.reduce((days, value, i) => {
      const price = value[1];
      const volume = volumes[i][1];
      const fullUTCDate = getDate(value[0]);
      if (!days[fullUTCDate]) {
        days[fullUTCDate] = {
          price,
          volume,
          ts: fullUTCDate,
        };
      }

      return days;
    }, {});

    const dayArr: BTCDailyValues = [];

    // push objects to array
    Object.keys(dayValues).forEach((day) => {
      dayArr.push(dayValues[day]);
    });

    findBitcoinDetails(dayArr);
  };

  const findBitcoinDetails = (dayArr: BTCDailyValues) => {
    // for saving downward trend
    let highestStreak = 0;
    let currentStreak = 0;

    const highestVolumeDay: { date: string; volume: number } = {
      date: '',
      volume: 0,
    };

    let maxProfit = 0;
    let minPrice = Infinity;
    let buyAndSellDates;

    // find highest downward trend, max volume day and save min price and max profit
    dayArr.forEach((day, idx) => {
      if (dayArr[idx + 1]) {
        if (day.price > dayArr[idx + 1].price) {
          currentStreak++; // increment streak when next value is lower than current
          if (currentStreak > highestStreak) {
            highestStreak = currentStreak;
          }
        } else {
          currentStreak = 0;
        }
      }

      // highest volume day
      if (highestVolumeDay.volume < day.volume) {
        highestVolumeDay.volume = day.volume;
        highestVolumeDay.date = day.ts;
      }

      // if today's price is lower than the saved minimun price, set it as the minimum price
      // otherwise check if we can get more profit today than currently
      if (minPrice > day.price) {
        minPrice = day.price;
      } else {
        maxProfit = Math.max(maxProfit, day.price - minPrice);
      }
    });

    if (maxProfit !== 0) {
      buyAndSellDates = findDatesToBuyAndSell(dayArr, maxProfit);
    }

    setLoading(false);
    setDownwardTrend(highestStreak);

    setHighestVolume({
      ...highestVolumeDay,
      volume: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
      }).format(highestVolumeDay.volume),
    });

    setBuyAndSellDays({
      buy: maxProfit === 0 ? "Don't!" : buyAndSellDates?.buy,
      sell: maxProfit === 0 ? "Don't!" : buyAndSellDates?.sell,
    });
  };

  // since we have the max profit value saved, find the dates by substraction
  // set the value when match is found
  const findDatesToBuyAndSell = (
    dayArr: BTCDailyValues,
    profit: number
  ): { buy: string; sell: string } => {
    let dates = { buy: '', sell: '' };
    dayArr.forEach((day, _) => {
      dayArr.forEach((_, idx) => {
        if (dayArr[idx + 1]) {
          if (dayArr[idx + 1].price - day.price === profit) {
            dates.buy = day.ts;
            dates.sell = dayArr[idx + 1].ts;
          }
        }
      });
    });

    return dates;
  };

  return (
    <div className="App">
      <a
        href="https://github.com/pkarabiberis/scroogesbtctracker"
        target="_blank"
        rel="noreferrer"
      >
        <Github />
      </a>

      <h1>Scrooge McDuck's Bitcoin Tracker</h1>
      <DatePicker getBitcoinData={getBitcoinData} />
      <BitcoinDetails
        downwardTrend={downwardTrend}
        highestVolume={{ ...highestVolume }}
        buyDate={buyAndSellDays?.buy}
        sellDate={buyAndSellDays?.sell}
      />

      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default App;

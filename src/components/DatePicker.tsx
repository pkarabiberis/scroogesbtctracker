import React, { useState } from 'react';
import { formatMaxDate } from 'src/utils';

interface DatePickerProps {
  getBitcoinData: (s: number, e: number) => void;
  loading: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  getBitcoinData,
  loading,
}) => {
  const [startDate, setStartDate] = useState<number | null>(null);
  const [endDate, setEndDate] = useState<number | null>(null);

  const handleSubmit = () => {
    if (startDate !== null && endDate !== null) {
      getBitcoinData(startDate, endDate);
    }
  };

  return (
    <>
      <div className="input-container">
        <div>
          <label
            className={
              startDate && endDate && startDate > endDate
                ? 'label__from'
                : undefined
            }
            htmlFor="from"
          >
            From
          </label>
          <input
            type="date"
            name="from"
            id="from"
            max={formatMaxDate()}
            onChange={(e) =>
              setStartDate(
                new Date((e.target as HTMLInputElement).value).getTime() / 1000 //to unix
              )
            }
          />
        </div>
        <div>
          <label htmlFor="to">To</label>
          <input
            type="date"
            name="to"
            id="to"
            max={formatMaxDate()}
            onChange={(e) =>
              setEndDate(
                new Date((e.target as HTMLInputElement).value).getTime() / 1000 //to unix
              )
            }
          />
        </div>
      </div>

      <button
        className={loading ? 'button--loading' : ''}
        onClick={handleSubmit}
        disabled={!startDate || !endDate || startDate > endDate}
      >
        <span className="button__text">Find!</span>
      </button>
    </>
  );
};

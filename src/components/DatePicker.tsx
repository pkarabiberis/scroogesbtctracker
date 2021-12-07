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
    <div className="input-container">
      <input
        type="date"
        name="from"
        onChange={(e) =>
          setStartDate(
            new Date((e.target as HTMLInputElement).value).getTime() / 1000 //to unix
          )
        }
      />
      <input
        type="date"
        name="to"
        max={formatMaxDate()}
        onChange={(e) =>
          setEndDate(
            new Date((e.target as HTMLInputElement).value).getTime() / 1000 //to unix
          )
        }
      />
      <button
        className={loading ? 'button--loading' : ''}
        onClick={handleSubmit}
      >
        <span className="button__text">Find!</span>
      </button>
    </div>
  );
};

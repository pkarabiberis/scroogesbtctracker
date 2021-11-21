import React, { useState } from 'react';

interface DatePickerProps {
  getBitcoinData: (s: number, e: number) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ getBitcoinData }) => {
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
        max={`${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`}
        onChange={(e) =>
          setEndDate(
            new Date((e.target as HTMLInputElement).value).getTime() / 1000 //to unix
          )
        }
      />
      <button onClick={handleSubmit}>Find!</button>
    </div>
  );
};

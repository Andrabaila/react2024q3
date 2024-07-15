import React from 'react';
import './index.css';

type Props = {
  handleClick: () => void;
  handleError: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const SearchBar = ({ handleClick, handleError, value, onChange }: Props) => {
  return (
    <div className="search-bar">
      <input type="search" placeholder="enter name 🔍" value={value} onChange={onChange} />
      <button onClick={handleClick}>Search</button>
      <button className="error" onClick={handleError}>
        Error
      </button>
    </div>
  );
};

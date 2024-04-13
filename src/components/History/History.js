import React, { useState, useEffect } from 'react';

const History = ({ showHistory }) => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  return (
    <div className="history-container">
      {showHistory && (
        <>
          <h2>Search History:</h2>
          {searchHistory.map((item, index) => (
            <div key={index} className="history-item">{item}</div>
          ))}
        </>
      )}
    </div>
  );
};

export default History;

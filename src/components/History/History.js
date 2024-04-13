import React from 'react';

const History = ({ showHistory, searchHistory }) => {
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

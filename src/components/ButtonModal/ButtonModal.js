import React from 'react';

const Button = ({ onClick, children ,bg,margin}) => {
  const buttonStyle = {
    margin: margin || '10px 0',
    padding: '10px 20px',
    backgroundColor: bg || '#007bff',
    color: '#fff',
    border: 'none',
    
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

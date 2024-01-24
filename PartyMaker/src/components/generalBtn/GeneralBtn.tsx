// GeneralBtn.tsx
import React from 'react';
import './generalBtn.scss';

interface GeneralBtnProps {
  buttonText: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const GeneralBtn: React.FC<GeneralBtnProps> = ({ buttonText, onClick, type = 'button' }) => {
  return (
    <button className="generalBtn" type={type} onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default GeneralBtn;

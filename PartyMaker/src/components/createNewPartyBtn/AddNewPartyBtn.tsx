// GeneralBtn.tsx
import React from 'react';
import './AddNewPartyBtn.scss';

interface AddNewPartyBtnProps {
  buttonText: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const AddNewPartyBtn: React.FC<AddNewPartyBtnProps> = ({ buttonText, onClick, type = 'button' }) => {
  return (
    <button className="addNewPartyBtn" type={type} onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default AddNewPartyBtn;

import React, { useState } from 'react';
import axios from 'axios';
import './CallComponent.css';

const CallComponent: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const initiateCall = async () => {
    // Your Twilio API call code here (same as shown in the previous response)
  };

  return (
    <div className='callContainer'>
      <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} placeholder="Enter phone number" className='callInput'/>
      <button onClick={initiateCall} className='callAction'>Call</button>
    </div>
  );
};

export default CallComponent;

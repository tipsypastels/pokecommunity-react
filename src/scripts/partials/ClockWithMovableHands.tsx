import React from 'react';

interface IProps {
  hours: number;
  minutes: number;
}

export default function ClockWithMovableHands({ hours, minutes }: IProps) {
  if (hours > 12) {
    hours -= 12;
  }

  const hourHand = hours * 30 - 180;
  const minuteHand = minutes * 6;

  return (
    <div className="ClockWithMovableHands">
      <div className="dot" />

      <div 
        className="hand minutes-hand" 
        style={{ transform: `rotate(${minuteHand}deg)` }} 
      />
      
      <div 
        className="hand hours-hand" 
        style={{ transform: `rotate(${hourHand}deg)` }}
      />
    </div>
  )
}

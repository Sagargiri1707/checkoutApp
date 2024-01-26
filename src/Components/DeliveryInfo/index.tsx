import React, { useState, useEffect } from 'react';

function DeliveryMessage({ seconds }: { seconds: number }) {
  const [minutes, setMinutes] = useState(Math.ceil(seconds / 60));

  useEffect(() => {
    const updateDeliveryStatus = () => {
      setMinutes(prevMinutes => prevMinutes - 1);
    };

    const intervalId = setInterval(updateDeliveryStatus, 60000);

    return () => clearInterval(intervalId);
  }, [minutes]);

  return seconds ? (
    <p className="font-medium text-sm">
      (If ordered within{' '}
      {minutes > 60
        ? `${Math.floor(minutes / 60)} hours ${minutes % 60} minutes`
        : `${minutes} minutes`}{' '}
      )
    </p>
  ) : null;
}

export default DeliveryMessage;

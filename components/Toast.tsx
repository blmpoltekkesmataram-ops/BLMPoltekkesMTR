import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string | null;
  onClear: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClear }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        // Allow fade-out animation to complete before clearing the message
        setTimeout(onClear, 300);
      }, 3000); // Toast disappears after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [message, onClear]);

  return (
    <div
      className={`fixed bottom-5 right-5 z-[102] transition-all duration-300 ease-in-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      {message && (
        <div className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-2xl flex items-center gap-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default Toast;
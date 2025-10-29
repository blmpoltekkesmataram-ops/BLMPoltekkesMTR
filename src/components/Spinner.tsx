import React from 'react';

const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const borderClasses = {
    sm: 'border-2',
    md: 'border-4',
    lg: 'border-4',
  };

  return (
    <div
        className={`animate-spin rounded-full ${borderClasses[size]} border-solid border-brand-blue border-t-transparent ${sizeClasses[size]}`}
        role="status"
        aria-label="loading"
      ></div>
  );
};

export default Spinner;

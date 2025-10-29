import React from 'react';

// NOTE: Please create a 'public' folder in the root of your project,
// and place your logo file (e.g., 'logo.jpg') inside it.
// The image will then be accessible at this path, matching your project's deployment base URL.
const logoUrl = '/BLMPoltekkesMTR/logo.jpg';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <img src={logoUrl} alt="BLM Poltekkes Mataram Logo" className={className} />
  );
};

export default Logo;
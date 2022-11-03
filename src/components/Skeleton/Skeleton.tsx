import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader: React.FC = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={470}
    viewBox="0 0 280 470"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="7" y="271" rx="0" ry="0" width="260" height="25" />
    <rect x="8" y="394" rx="0" ry="0" width="90" height="31" />
    <rect x="123" y="393" rx="0" ry="0" width="142" height="39" />
    <rect x="7" y="307" rx="5" ry="5" width="259" height="74" />
    <circle cx="136" cy="133" r="115" />
  </ContentLoader>
);

export default MyLoader;

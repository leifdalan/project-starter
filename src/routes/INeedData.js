import React from 'react';
import DataProvider from '../DataProvider';

export default () => (
  <DataProvider
    action={() => new Promise((resolve) => {
      setTimeout(() => {
        resolve({ some: 'data' });
      }, 500);
    })}
  >
    {({ isLoading, hasLoaded, data, hadError }) => (
      <div>
        {isLoading && <div>loading</div>}
        {hasLoaded && <div>loaded</div>}
        {data && data.some}
        {hadError}
      </div>
    )}
  </DataProvider>
);

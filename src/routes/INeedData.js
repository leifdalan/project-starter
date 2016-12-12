import React from 'react';
import DataProvider from '../DataProvider';

export default () => (
  <DataProvider
    action={() => new Promise((resolve) => {
      setTimeout(() => {
        resolve({ some: 'data' });
      }, 500);
    })}
    actionKey={'farts'}
  >
    {({ isLoading, hasLoaded, data, hadError }) => (
      <div>
        {isLoading && <div>loading</div>}
        {hasLoaded && <div>loaded</div>}
        {data && data.some}
        {hadError}
        <div
          style={{
            width: 100,
            height: 100,
          }}
        >
          <DataProvider
            action={() => new Promise(resolve => setTimeout(() => {
              resolve('whatever');
            }, 800))}
            actionKey="somethingElse"
            deferred
          >
            {({ isLoading, hasLoaded, data, hadError }) => ( // eslint-disable-line
              <div>
                {isLoading && <div>loading</div>}
                {hasLoaded && <div>loaded</div>}
                {data && data}
                {hadError}
              </div>
            )}
          </DataProvider>
        </div>
      </div>
    )}
  </DataProvider>
);

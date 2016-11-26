import React from 'react';

export default ({ assets, children, store }) => (
  <html lang="en">
    <head>

    </head>
    <body>

      <div id="root">
        {children}
      </div>
      <script
        dangerouslySetInnerHTML={{ __html: `window.__data=${JSON.stringify(store.getState())};` }}
        charSet="UTF-8"
      />
    <script src="/static/main.js"></script>
    </body>
  </html>
)

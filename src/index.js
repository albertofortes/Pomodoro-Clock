import React from 'react';
import ReactDOM from 'react-dom';
import GoogleFontLoader from 'react-google-font-loader';
import Pomodoro from './Pomodoro';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <GoogleFontLoader
      fonts={[
        {
          font: 'Oswald',
          weights: [300, 400, 700],
        },
        {
          font: 'Share Tech Mono'
        },
      ]}
      subsets={['cyrillic-ext', 'greek']}
    />
    <Pomodoro />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

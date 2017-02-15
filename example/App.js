import React, {Component} from 'react';
import HLSPlayer from '../dist/HLSPlayer';

import './style.css';

class App extends Component {

  render() {
    const source = 'http://www.streambox.fr/playlists/x36xhzz/x36xhzz.m3u8';
    const customControls = {
      panelBg: '#ff7256',
      buttonBg: 'none',
      buttonColor: '#fff',
      timePadding: '2px 5px',
      playBtnContent: '<span class="glyphicon glyphicon-play"></span>',
      pauseBtnContent: '<span class="glyphicon glyphicon-pause"></span>',
      volumeBtnContent: '<span class="glyphicon glyphicon-volume-up"></span>',
      muteBtnContent: '<span class="glyphicon glyphicon-volume-off"></span>',
      fullScreenBtnContent: '<span class="glyphicon glyphicon-fullscreen"></span>',
      playBackRateContent: '<span class="glyphicon glyphicon-forward"></span>'
    };

    return (
      <div>
        <img className="logo" src="http://foxford.ru/assets/logo-white-21110926a80c56997e1f164de0db94ed.svg" />
        <div className="player">
          <HLSPlayer source={source} customControls={customControls} />
        </div>
      </div>
    );
  }
}

export default App;
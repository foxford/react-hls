import React, {Component} from 'react';
import HLSPlayer from '../dist/HLSPlayer';

import './style.css';

class App extends Component {

  state = {
    styleType: 1
  };

  handleLogoClick(type) {
    this.setState({
      styleType: type
    });
  }

  onFragChanged(e, data) {
    console.log(e, data);
  }

  render() {
    const { styleType } = this.state;
    const playerClass = `player player_${styleType}`;
    const source = 'http://www.streambox.fr/playlists/x36xhzz/x36xhzz.m3u8';
    const customControls = {
      panelBg: '#07141e',
      buttonBg: 'none',
      buttonColor: '#ccc',
      timePadding: '3px 5px',
      timeSize: '12px',
      playBtnContent: '<span class="glyphicon glyphicon-play"></span>',
      pauseBtnContent: '<span class="glyphicon glyphicon-pause"></span>',
      volumeBtnContent: '<span class="glyphicon glyphicon-volume-up"></span>',
      muteBtnContent: '<span class="glyphicon glyphicon-volume-off"></span>',
      fullScreenBtnContent: '<span class="glyphicon glyphicon-fullscreen"></span>',
      playBackRateContent: '<span class="glyphicon glyphicon-forward"></span>',
      preloaderContent: '<span class="glyphicon glyphicon-refresh"></span>'
    };
    const hlsEvents = {
      onFragChanged: this.onFragChanged.bind(this),
      onMediaAttached: new Function(),
      onManifestParsed: new Function(),
      onError: new Function(),
      onFragParsingMetadata: new Function()
    };

    return (
      <div>
        <div className="logos">
          <img className="logo"
               src="https://netology-group.ru/assets/corpsite/logo/foxford-1f9bb97e5f7d3bab0d608c1f6d220d53.svg"
               onClick={ this.handleLogoClick.bind(this,1) }
          />
          <img className="logo"
               src="https://netology-group.ru/assets/corpsite/logo/netology-39abf60d361c76c80c577c311a5aa53f.svg"
               onClick={ this.handleLogoClick.bind(this,2) }
          />
        </div>
        <div className={playerClass}>
          <HLSPlayer
            ref={ (player) => { this.hls = player; } }
            source={source}
            customControls={customControls}
            hlsEvents={hlsEvents}
          />
        </div>
      </div>
    );
  }
}

export default App;
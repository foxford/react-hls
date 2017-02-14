# react-hls

HLS player for react applications

## Installation

    npm install --save react-hls

    cd node_modules/hls.js

    npm install

Add folder to babel-loader config as "include" argument in your webpack configuration. For more info see [babel-loader](https://github.com/babel/babel-loader)

    /node_modules\/hls\.js/

## Usage example
 ```````
    import React, { Component } from 'react';
    import HLSPlayer from 'react-hls';

    class HLSPage extends Component {
      render() {
        const source = 'http://www.streambox.fr/playlists/test_001/stream.m3u8';

        return (
          <div>
            <HLSPlayer source={source} />
          </div>
        );
      }
    }

    export default HLSPage;
 ```````

## Notes

Duration & volume controls made with rc-slider, see docs - https://github.com/react-component/slider
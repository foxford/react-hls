# react-hls

HLS player for react applications. Demo [here](http://pidginenemy.github.io/react_hls/).

## Installation

    npm install --save react-hls

    cd node_modules/hls.js

    npm install

Hls.js library imports from original sources (src folder), that's why you need to install hls.js dependencies and add folder to babel-loader config as "include" argument in your webpack configuration. For more info see [babel-loader](https://github.com/babel/babel-loader)

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

## Run example
 ```````
 
npm run example
 
 ```````

## Notes

Duration & volume controls made with rc-slider, see docs - https://github.com/react-component/slider
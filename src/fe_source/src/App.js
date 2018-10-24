import React, { Component } from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import 'moment/locale/zh-cn';
import moment from 'moment';

import Main from './components/Main.js';

moment.locale('zh-cn');

class App extends Component {
  render() {
    return (
      <Main/>
    );
  }
}

export default App;

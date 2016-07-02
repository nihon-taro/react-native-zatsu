'use strict';

import React, {
  Component,
} from 'react';

var ScrollableTabView = require('react-native-scrollable-tab-view');

import ClipsList from './ClipsList';

class ClipsPager extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollableTabView>
        <ClipsList tabLabel="Women" itemType="women" navigator={this.props.navigator}/>
        <ClipsList tabLabel="Men" itemType="men" navigator={this.props.navigator}/>
      </ScrollableTabView>
    );
  }
}

module.exports = ClipsPager;

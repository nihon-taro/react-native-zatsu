'use strict';

import React, {
  Component,
} from 'react';

import {
  Text,
  ListView,
  TouchableHighlight,
} from 'react-native';

import ClipsPager from '../clips/ClipsPager';
import Author from '../about/Author';

class MenuPane extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  componentDidMount() {
    this.setState({
      items: this.state.items.cloneWithRows([
        {title: 'ホーム', component: ClipsPager, payload: {query: 'page=1'}},
        {title: 'このアプリについて', component: Author},
      ]),
    })
  }

  render() {
    return (
      <ListView
        dataSource={this.state.items}
        renderRow={this.renderItem.bind(this)}/>
    )
  }

  renderItem(item, sectionId, rowId) {
    return (
      <TouchableHighlight onPress={() => this._navigatePage(item)}>
        <Text>{item.title}</Text>
      </TouchableHighlight>
    )
  }

  _navigatePage(item) {
    this.props.onTapMenu(item);
  }
}

module.exports = MenuPane;

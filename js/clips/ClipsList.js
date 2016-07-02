'use strict';

var Dimensions = require('Dimensions');

import ClipsDetail from './ClipsDetail';
import React, {
  Component,
} from 'react';

import {
  ListView,
  Image,
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';

var GiftedListView = require('react-native-gifted-listview');

var {width} = Dimensions.get('window');

class ClipsList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.root}>
        <GiftedListView
          rowView={this.renderItem.bind(this)}
          onFetch={this._onFetch.bind(this)}
          contentContainerStyle={styles.list}
          pagination={true}
          customStyles={{
            paginationView: {
              backgroundColor: '#FFF',
              width: width,
              borderWidth: 0.5,
              borderColor: '#CCC',
              marginTop: 4,
            },
          }}
          refreshableTintColor="blue"/>
      </View>
    );
  }

  renderItem(item) {
    return (
      <TouchableHighlight onPress={() => this._navigateDetail(item)}>
        <View style={styles.container}>
          <Image
            source={{uri: item.photo}}
            style={styles.image}/>
          <View style={styles.textContainer}>
            <Text
              numberOfLines={1}
              style={styles.text}
            >{item.brand === null ? 'unknown' : item.brand.name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _onFetch(page = 1, callback, options) {
    var query = 'page=' + page + '&item_type=' + this.props.itemType;

    fetch('https://huku.herokuapp.com/api/clips?' + query)
      .then((response) => response.json())
      .then((responseData) => {
        callback(responseData, {
          allLoaded: responseData.length === 0
        });
      })
      .done();
  }

  _navigateDetail(item) {
    this.props.navigator.push({
      component: ClipsDetail,
      passProps: {
        clip: item,
      }
    });
  }
}

var styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#EFEFEF',
    paddingTop: 4,
  },
  container: {
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: '#999',
    backgroundColor: '#FFF',
    margin: 4,
    width: 170,
  },
  image: {
    height: 160,
    resizeMode: 'cover',
    marginLeft: 2,
    marginRight: 2,
  },
  textContainer: {
    margin: 8,
    padding: 4
  },
  text: {
    fontSize: 12,
  },
  root: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  }
});

ClipsList.propTypes = { itemType: React.PropTypes.string.isRequired };
ClipsList.defaultProps = { itemType: 'men' };

module.exports = ClipsList;

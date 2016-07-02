'use strict';

import React, {
  Component
} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');

class ClipsDetail extends React.Component {

  render() {
    const { clip } = this.props;

    return (
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        <Image style={styles.image} source={{uri: clip.photo}}/>
        <Text style={styles.brand}>{clip.brand.name}</Text>
        <View style={styles.border} />
        <View style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 8, marginRight: 8, marginTop: 4}}>
          {clip.tags.map((tag) => {
            return <Text numberOfLines={3} style={{ flex: 0, marginRight: 8, marginBottom: 4, padding: 2, color: 'white', backgroundColor: '#333', textAlign: 'center'}}>{tag.name}</Text>
          })}
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  image: {
    width: width,
    height: 300,
    resizeMode: 'contain',
    backgroundColor: '#FFF',
    marginTop: 8,
  },
  brand: {
    margin: 8,
  },
  border: {
    borderWidth: 0.5,
    borderColor: '#CCC',
    marginTop: 4,
    marginBottom: 4,
  }
});

module.exports = ClipsDetail;

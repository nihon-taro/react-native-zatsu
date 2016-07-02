/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');

var ScrollableTabView = require('react-native-scrollable-tab-view');
var ClipsDetail = require('./js/clips/ClipsDetail');

import ClipsList from './js/clips/ClipsList';
import ClipsPager from './js/clips/ClipsPager';
import MenuPane from './js/menu/MenuPane';
import Toolbar from './js/Toolbar';

import React, {
  Component,
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  ListView,
  Image,
  Text,
  ViewPagerAndroid,
  Navigator,
  BackAndroid,
  DrawerLayoutAndroid,
} from 'react-native';

class ReactGiphy extends React.Component {

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._backButtonHandler.bind(this));
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress');
  }

  render() {
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <MenuPane navigator={this.refs.navigator} onTapMenu={this._onTapMenuItem.bind(this)}/>
      </View>
    );
    return (
      <DrawerLayoutAndroid
        ref="drawer"
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
        <Navigator
          ref="navigator"
          navigationBar={<Toolbar onIconPress={this._onIconPress.bind(this)}/>}
          initialRoute={{
            component: ClipsPager,
            passProps: {              
              itemType: 'women',
            }
          }}
          renderScene={this.renderScene.bind(this)}
        />
      </DrawerLayoutAndroid>
    );
  }

  renderScene(route, navigator) {
    let RouteComponent = route.component
    return (
      <View
        style={styles.root}
        showsVerticalScrollIndicator={false}>
        <RouteComponent navigator={navigator} {...route.passProps} />
      </View>
    )
  }

  _onTapMenuItem(menuItem) {
    var drawer = this.refs.drawer;
    drawer.closeDrawer();
    this.refs.navigator.resetTo({
       component: menuItem.component,
       passProps: menuItem.payload,
    });
  }

  _backButtonHandler() {
    var navigator = this.refs.navigator;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
         navigator.pop();
         return true;
    }
    return false;
  }

  _onIconPress() {
    var drawer = this.refs.drawer;
    drawer.openDrawer();
  }
}

// var ReactGiphy = React.createClass({
//   render: function() {
//     return (
//       <Navigator
//         initialRoute={{ name: 'List' }}
//         renderScene={this.renderScene}
//       />
//     );
//   },
//
//   renderScene: function(route, navigator) {
//     if (route.name === 'List') {
//       return <ClipsList navigator={navigator} query='page=1'/>
//     }
//     if (route.name == 'Detail') {
//       return <ClipsDetail navigator={navigator} clip={route.clip}/>
//     }
//   },
//
// });

// var GiphyList = React.createClass({
//
//   getDefaultProps: function() {
//     return {
//       query: 'funny+cat',
//     };
//   },
//
//   getInitialState: function() {
//       return {
//         items: new ListView.DataSource({
//           rowHasChanged: (row1, row2) => row1 !== row2,
//         }),
//       };
//   },
//
//   componentDidMount: function() {
//     this.fetchData(this.props.query);
//   },
//
//   render: function() {
//     return (
//       <ListView
//         dataSource={this.state.items}
//         renderRow={this.renderItem}/>
//     );
//   },
//
//   renderItem: function(item, sectionId, rowId) {
//     return (
//       <View style={styles.container}>
//         <Image
//           source={{uri: item.images.downsized.url}}
//           style={this.calculateImageStyle(item.images.downsized_still)}/>
//       </View>
//     );
//   },
//
//   fetchData: function(query) {
//     fetch('http://api.giphy.com/v1/gifs/search?q=' + query + '&api_key=dc6zaTOxFJmzC')
//       .then((response) => response.json())
//       .then((responseData) => {
//         this.setState({
//           items: this.state.items.cloneWithRows(responseData.data),
//         })
//       })
//       .done();
//   },
//
//   calculateImageStyle: function(item_still) {
//     return {
//       width: width,
//       height: this.calculateImageDimensions(item_still),
//     }
//   },
//
//   calculateImageDimensions: function(item_still) {
//     return (item_still.height * width) / item_still.width;
//   },
// });

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewPager: {
    flex: 1
  },
  toolbar: {
    backgroundColor: '#e9eaed',
    height: 56,
  },
  root: {
    flex: 1,
    marginTop: 56
  }
});

AppRegistry.registerComponent('ReactGiphy', () => ReactGiphy);

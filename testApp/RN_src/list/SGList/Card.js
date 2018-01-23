import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image'
export default class Card extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.deal.title}</Text>
        <FastImage
            source={{
              uri: this.props.deal.largeImageUrl,
                priority: FastImage.priority.normal,}}
            style={styles.image} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
    borderColor: '#CCC',
    marginTop: 20,
  },
  image: {
    height: 200,
    alignSelf: 'stretch',
  },
});


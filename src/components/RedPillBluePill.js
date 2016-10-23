import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'

export default ({ choose, result }) => (
  <View style={ styles.container }>
    <View style={ styles.buttons }>
      <TouchableOpacity style={ styles.red } onPress={ () => choose('red') } >
        <Text>Red</Text>
      </TouchableOpacity>

      <TouchableOpacity style={ styles.blue } onPress={ () => choose('blue') } >
        <Text>Blue</Text>
      </TouchableOpacity>
    </View>

    <Text>{ result }</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 20
  },
  red: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'red'
  },
  blue: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue'
  }
})


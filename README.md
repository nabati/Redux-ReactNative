Redux is a neat library that manages the store of a React or ReactNative application. 

It has a global store which is a "single source of truth", but also allows you to separate data logic with reducer composition. 

Redux really shine when your application get complicated with many fragmented state data. Redux keeps everything organized andhelps you stay sane to handle increasingly complicated front-end requirements in React and ReactNative. 

This post assumes that you have knowledge with ReactNative and Redux, and want to combine this two awesome libraries together for your cool project. 

We'll implement a simple app that gets user input and display the result of that action. 

Here is its animation: 

![alt text](https://raw.githubusercontent.com/CodeLinkIO/public-assets/master/blog/redux.gif "Redux ReactNative")


### Barebone ReactNative project
Run this command
```
react-native init ReactNativeRedux
```
This will create a project structure like this
```
.
├── android
├── index.android.js
├── index.ios.js
├── ios
├── node_modules
└── package.json
```
`index.ios.js` and `index.android.js` are the entry files for iOS and Android
accordingly.

```javascript
// index.ios.js

import React, { Component } from 'react'
import { AppRegistry } from 'react-native'

export default class ReactNativeRedux extends Component {
  render() {
    return (
      // ...
    )
  }
}

AppRegistry.registerComponent('ReactNativeRedux', () => ReactNativeRedux)
```

### Install redux

We need 2 separate libraries `redux` and `react-redux` to make it work. Run this command to install
```
yarn add redux react-redux
```

So we use `yarn` to add the `redux` library to the project. You are probably wondering what `react-redux` is doing here. 

`react-redux` is the library that enables react bindings in redux. It provides
`Provider` component and `connect` function:
- `Provider` makes the global `store` available to all of the children
  containers or components
- `connect` links the react component to the redux store, it makes utility functions like `dispatch` and  `getState()` available. It also do some sort of optimization to prevent unnecessary rendering.

In redux, we'll use two separate components: presentational and containers.
Basically the presentational component renders the UI, and the container
component works with the data and actions.

I'm going to group the files by functionalities using this folder structure:
```
src
├── actions
├── components
├── containers
├── reducers
└── store
```

### Glue React and Redux

**Store**

First we need to configure the store. It requires the root reducer, we'll implement it later. Right now this is all that we need to feed the `Provider`: 
```javascript
// src/stores/index.js

import { createStore } from 'redux'
import rootReducer from '../reducers'

export default createStore(rootReducer)
```

**Root component**

We need a root component that connects to redux's store. We need to wrap up the
main App component inside of the `Provider` to the store is availble.

```javascript
// src/Root.js

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './store'
import App from './containers/App'

const store = configureStore()

export default class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
```

**Presentational Component**

We use the "pure" component to handle the rendering, it takes whatever in the props and shows to the UI. This is where we design the app layout with View, Button, Text, StyleSheet... 
```javascript
// src/components/RedPillBluePill.js

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
```

**Container Component**

This connects the prentational component to the store. It prepares the data and defines action handler before passing to the presentational component as props. It has access to `state` and `dispatch` to connect with Redux's store. We'll pass the `choose` action handler and `result` message to the other component.
```javascript
// src/containers/App.js

import { connect } from 'react-redux'
import RedPillBluePill from '../components/RedPillBluePill'
import { choose } from '../actions'

export default connect(
  state => ({
    result: state.result
  }),
  dispatch => ({
    choose: pill => dispatch(choose(pill))
  })
)(RedPillBluePill)
```

**Handling actions**

Actions are triggered via `dispatch`, it returns the payload which in turn sent to the store. 
```javascript
// src/actions/index.js

export const choose = pill => {
  return {
    type: 'CHOOSE_PILL',
    pill: pill
  }
}
```
Actions don't change the data or anything. It just "forwards" the payload to the reducers. 

**Reducers**

Redux store is "single source of truth", meaning all of the app's data is there. You can however use reducer composition to separate the logic. In this app, we just need 1 reducer to handle the `CHOOSE_PILL` action and compute the result message. 
```javascript
// src/reducers/index.js

import { combineReducers } from 'redux'

const result = (state = 'Choose wisely', action) => {
  switch (action.type) {
    case 'CHOOSE_PILL':
      if (action.pill === 'red') {
        return 'Welcome to the real world'
      } else {
        return 'Stay in the Matrix'
      }
    default:
      return state
  }
}
const reducer = combineReducers({ result })
export default reducer
```

That's basically everything we need for this simple demo. It shows you the core concept of redux and how to make it work with ReactNative. Real ReactNative app however needs much more complicated reducer composition and sophisticated data transformation in the store.

### Conclusion
Redux is a really simple library to help you manage the app's store. I like the "single source of truth" principle, it makes thing more predictable. 

At first you may find following the unidirectional dataflow in redux is kind of strict, but after a while you will find it comfortable to work with, and coding and debugging will become more natural and even enjoyable. 

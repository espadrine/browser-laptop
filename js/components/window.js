/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

// Controller view which manages the top level immutable state for the app

const React = require('react')
const Immutable = require('immutable')
const WindowStore = require('../stores/windowStore')
const AppStore = require('../stores/AppStore')
const Main = require('./main')

class Window extends React.Component {
  constructor () {
    super()
    this.state = {
      immutableData: {
        windowState: WindowStore.getState(),
        appState: AppStore.getState()
      }
    }
    WindowStore.addChangeListener(this.onChange.bind(this))
    AppStore.addChangeListener(this.onChange.bind(this))
  }

  render () {
    return <div id='windowContainer'>
      <Main browser={this.state.immutableData.windowState} app={this.state.immutableData.appState} />
    </div>
  }

  componentWillUnmount () {
    WindowStore.removeChangeListener(this.onChange.bind(this))
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !Immutable.is(nextState.immutableData, this.state.immutableData)
  }

  onChange () {
    this.setState({
      immutableData: {
        windowState: WindowStore.getState(),
        appState: AppStore.getState()
      }
    })
  }

}

module.exports = Window
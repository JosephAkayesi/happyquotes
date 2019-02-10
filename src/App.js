import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store'
import Layout from "./components/Layout/Layout";
import Admin from './components/Admin/Admin'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route exact path='/' component={Layout} />
            <Route path='/admin' component={Admin} />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
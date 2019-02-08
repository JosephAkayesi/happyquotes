import React, { Component } from 'react';
import Layout from "./components/Layout/Layout";
import Admin from './components/Admin/Admin'
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Layout} />
          <Route path='/admin' exact component={Admin} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
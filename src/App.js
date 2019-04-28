import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import AppNavBar from "./components/layout/AppNavbar";

import Dashboard from "./components/layout/Dashboard";
import AddClient from "./components/clients/AddClient";
import ClientDetails from "./components/clients/ClientDetails";
import EditClient from "./components/clients/EditClient";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <AppNavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/client/add" component={AddClient} />
              <Route exact path="/client/edit/:id" component={EditClient} />
              <Route exact path="/client/:id" component={ClientDetails} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

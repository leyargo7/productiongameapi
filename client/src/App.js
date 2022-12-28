import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import VideogameCreate from "./components/VideogameCreate";
import Detail from "./components/Detail";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/home/:id" component={Detail} />
        <Route exact path="/create" component={VideogameCreate} />
        <Route exact path="/home/:id/edit" component={VideogameCreate} />
       
      </Switch>
    </BrowserRouter>
  );
}

export default App;

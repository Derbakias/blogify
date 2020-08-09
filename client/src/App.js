import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  route,
  Route,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import "./App.css";
import StateProvider from "./Context/StateProvider";
import Home from "./Pages/Home";
import About from "./Pages/About";
import MyPosts from "./Pages/MyPosts";
import FullView from "./Pages/FullView";

function App() {
  return (
    <StateProvider>
      <Router>
        <Fragment>
          <Navbar />
          <div className="page-wrapper container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/my-posts"
                component={MyPosts}
              />
              <Route
                exact
                path="/about"
                component={About}
              />
              <Route
                exact
                path="/full-view/:postID"
                component={FullView}
              />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </StateProvider>
  );
}

export default App;

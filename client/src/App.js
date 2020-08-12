import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {
  TransitionGroup,
  CSSTransition,
} from "react-transition-group";
import Navbar from "./Components/Navbar";
import "./App.css";
import StateProvider from "./Context/StateProvider";
import Home from "./Pages/Home";
import About from "./Pages/About";
import MyPosts from "./Pages/MyPosts";
import FullView from "./Pages/FullView";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Create from "./Pages/Create";

function App() {
  return (
    <StateProvider>
      <Router>
        <Route
          render={({ location }) => (
            <Switch>
              <Fragment>
                <Navbar />
                <TransitionGroup>
                  <CSSTransition
                    timeout={100}
                    classNames="fade"
                    key={location.key}
                  >
                    <div className="page-wrapper container">
                      <Switch location={location}>
                        <Route
                          exact
                          path="/"
                          component={Home}
                        />
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
                        <Route
                          exact
                          path="/create"
                          component={Create}
                        />
                        <Route
                          exact
                          path="/login"
                          component={Login}
                        />
                        <Route
                          exact
                          path="/register"
                          component={Register}
                        />
                      </Switch>
                    </div>
                  </CSSTransition>
                </TransitionGroup>
              </Fragment>
            </Switch>
          )}
        />
      </Router>
    </StateProvider>
  );
}

export default App;

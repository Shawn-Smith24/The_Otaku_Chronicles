import React, { useEffect, useState } from "react";
import { Switch, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Anime from "./components/Anime";



function App() {
  // Code goes here!

  return(
    <div className="app">
        <Switch>
          <Routes>
              <Route exact path= "/welcomepage" component = {<WelcomePage />} />
              <Route exact path= "/Blog" component = {<Blog />} />
              <Route exact path= "/login" component = {<Login />} />
              <Route exact path= "/signup" component = {<Signup />} />
              <Route exact path= "/anime" component = {<Anime />} />
          </Routes>
        </Switch>
           
    </div>
  )
}

export default App;

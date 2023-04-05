import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

function App() {
  // Code goes here!

  return(
    <div>
        <Router>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
        </Router>
    </div>
  )
}

export default App;

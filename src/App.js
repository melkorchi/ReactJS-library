import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/Dashboard.js";
import { Login } from "./components/Login/Login.js";
import { Signup } from "./components/Signup/Signup.js";
import { PrivateRoute } from "./components/PrivateRoute.js";
// import { Slidemenu }  from "./components/Slidemenu/Slidemenu.js";
import { Addbook } from "./components/Addbook/Addbook.js";
import './App.css';

// function App() {
//   return (
//     <div className="App">
//         <div className="App-content">
//           <BrowserRouter>
//             <Switch>
//               <Route exact path="/" component={Login} />
//               <Route exact path="/signup" component={Signup} />
//               <PrivateRoute path="/dashboard" component={Dashboard} />
//             </Switch>
//           </BrowserRouter>
//         </div>
//       </div>
//   );
// }

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-content">
          {/* <BrowserRouter> */}
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              {/* <PrivateRoute path="/add" component={Addbook} /> */}
            </Switch>
          {/* </BrowserRouter> */}
        </div>
      </div>
    );
  }
}

export default App;

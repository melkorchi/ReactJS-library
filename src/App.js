import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/Dashboard.js";
import { Login } from "./components/Login/Login.js";
import { Signup } from "./components/Signup/Signup.js";
import { Motdepasseoublie } from "./components/Motdepasseoublie/Motdepasseoublie.js";
import { PrivateRoute } from "./components/PrivateRoute.js";

// import { Slidemenu }  from "./components/Slidemenu/Slidemenu.js";
// import { Addbook } from "./components/Addbook/Addbook.js";
import './App.css';
import Nomatch from "./components/Nomatch/Nomatch.js";

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
              <Route exact path="/login" component={Login} />
              <Route exact path="/mdp-forgot" component={Motdepasseoublie} />
              <Route exact path="/mdp-reinit/:token" component={Motdepasseoublie} />
              <PrivateRoute path="/dashboard/admin/books" component={Dashboard} />
              <PrivateRoute path="/dashboard/admin/users" component={Dashboard} />
              <PrivateRoute path="/dashboard/admin/logs" component={Dashboard} />
              <Route component={Nomatch} />
              {/* <PrivateRoute path="/add" component={Addbook} /> */}
            </Switch>
          {/* </BrowserRouter> */}
        </div>
      </div>
    );
  }
}

export default App;

import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile.jsx";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";



function App() {

  const {user} = useContext(AuthContext)
  return( <Router>
            <Switch>
              <Route exact path="/"> {/*Without exact keyword it would go to login page instead of home */}
                {user ? <Home/>:<Register/>}{/** if loggied in you go to home page if not your redirect to login page */}
              </Route>
              <Route path="/login">
                {user ? <Redirect to="/"/>:<Login/>}
              </Route>
              <Route path="/register">
                {user ? <Redirect to="/"/>:<Register/>}              
              </Route>
              <Route path="/profile/:username">
                <Profile/>
              </Route>
              
            </Switch>
          </Router> 
        
        );
        
  
}

export default App;

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Screens
import Dashboard from "./components/screens/DashboardLayout/Dashboard";
// import PrivateScreen from "./components/screens/PrivateScreen";
import HomeScreen from "./components/screens/HomeScreen/HomeScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgetPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import TopBar from "./components/screens/DashboardLayout/TopBar";

const App = () => {
  return (
    <Router>
      <div className="app">
        <TopBar />
        <Switch>
          {/* <PrivateRoute exact path="/" component={PrivateScreen} /> */}
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
          <Route exact path="/passwordreset/:resetToken" component={ResetPasswordScreen} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
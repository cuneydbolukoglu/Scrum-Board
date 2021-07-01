import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/header';
import Footer from "./components/footer";
import Login from './pages/Login';
import Register from './pages/Register';
import Errorpage from './pages/404';
import Private from './pages/Private';
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Private} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/change-password" component={ChangePassword} />
          <Route component={Errorpage} />
        </Switch>
        <Footer />
      </Router>
  )
}

export default App;